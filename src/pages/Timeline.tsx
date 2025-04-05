import React, { useState, useEffect } from 'react';
import EntryCard from '@/components/EntryCard';
import NavigationBar from '@/components/NavigationBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Search, Calendar, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface DiaryEntry {
  id: string;
  text: string;
  date: string | Date;
  analysis: {
    primaryEmotion: string;
    scores: Array<{
      emotion: string;
      score: number;
    }>;
    summary: string;
  };
}

// Update the API URL to use a relative path instead of localhost
const API_BASE_URL = '/api';

const Timeline = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState<DiaryEntry[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load entries from backend (or localStorage as a fallback)
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      // In a real application, we would fetch from the backend
      // For now, let's use a mock list of entries from localStorage if available
      
      // Check if we have any mock entries in localStorage
      const storedEntries = localStorage.getItem('mockJournalEntries');
      let entriesList: DiaryEntry[] = [];
      
      if (storedEntries) {
        // Parse entries and ensure dates are proper Date objects
        const parsedEntries = JSON.parse(storedEntries);
        
        // We don't modify the entries here to avoid date conversion issues
        // The EntryCard component will handle string or Date objects
        entriesList = parsedEntries;
      } else {
        // Initialize with some sample entries if nothing exists
        entriesList = [
          {
            id: "1",
            text: "Today was a wonderful day. I felt really happy about my progress on the project.",
            date: new Date(Date.now() - 86400000), // yesterday
            analysis: {
              primaryEmotion: "joy",
              scores: [
                { emotion: "joy", score: 0.8 },
                { emotion: "surprise", score: 0.1 },
                { emotion: "neutral", score: 0.1 },
                { emotion: "sadness", score: 0 },
                { emotion: "anger", score: 0 },
                { emotion: "fear", score: 0 }
              ],
              summary: "Your entry reflects happiness and positive emotions."
            }
          },
          {
            id: "2",
            text: "I'm feeling a bit anxious about the upcoming deadline. Not sure if I'll be able to finish everything on time.",
            date: new Date(Date.now() - 172800000), // 2 days ago
            analysis: {
              primaryEmotion: "fear",
              scores: [
                { emotion: "fear", score: 0.7 },
                { emotion: "neutral", score: 0.2 },
                { emotion: "sadness", score: 0.1 },
                { emotion: "joy", score: 0 },
                { emotion: "surprise", score: 0 },
                { emotion: "anger", score: 0 }
              ],
              summary: "Your entry shows signs of anxiety or concern."
            }
          }
        ];
        
        // Store the sample entries
        localStorage.setItem('mockJournalEntries', JSON.stringify(entriesList));
      }
      
      // Sort entries by date (newest first)
      entriesList.sort((a, b) => {
        const dateA = a.date instanceof Date ? a.date : new Date(a.date);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
      
      setEntries(entriesList);
      setFilteredEntries(entriesList);
    } catch (error) {
      console.error('Error fetching entries:', error);
      toast({
        title: "Error loading entries",
        description: "There was a problem loading your journal entries.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Search entries (local search instead of backend)
  const searchEntries = (query: string) => {
    if (!query.trim()) {
      setFilteredEntries(entries);
      return;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    const results = entries.filter(entry => 
      entry.text.toLowerCase().includes(lowerCaseQuery) ||
      entry.analysis.primaryEmotion.toLowerCase().includes(lowerCaseQuery)
    );
    
    setFilteredEntries(results);
  };

  // Filter entries by emotion (local filter instead of backend)
  const filterByEmotion = (emotion: string | null) => {
    if (!emotion) {
      setFilteredEntries(entries);
      return;
    }
    
    const results = entries.filter(entry => 
      entry.analysis.primaryEmotion.toLowerCase() === emotion.toLowerCase()
    );
    
    setFilteredEntries(results);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchEntries(query);
  };

  // Handle emotion filter
  const handleFilterClick = (emotion: string) => {
    const newFilter = activeFilter === emotion ? null : emotion;
    setActiveFilter(newFilter);
    filterByEmotion(newFilter);
  };

  // Available emotions for filtering
  const emotions = ['joy', 'sadness', 'anger', 'fear', 'surprise', 'neutral'];

  // Update local storage when entries change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('mockJournalEntries', JSON.stringify(entries));
    }
  }, [entries]);
  
  return (
    <div className="min-h-screen w-full pb-24 flex flex-col bg-gradient-to-b from-background to-background/95">
      <header className="w-full py-6 px-4 text-center animate-slide-down">
        <h1 className="text-3xl font-light tracking-tight">Timeline</h1>
        <p className="text-muted-foreground mt-1">Your emotional journey</p>
      </header>
      
      <div className="w-full max-w-lg mx-auto px-4 relative animate-fade-in">
        <div className="glass-card mb-6 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
            <Filter className="h-4 w-4 text-muted-foreground mr-1" />
            
            {emotions.map(emotion => (
              <Button
                key={emotion}
                size="sm"
                variant={activeFilter === emotion ? "default" : "outline"}
                className={`rounded-full text-xs py-1 px-3 ${
                  activeFilter === emotion 
                    ? `bg-${emotion} text-white` 
                    : ""
                }`}
                onClick={() => handleFilterClick(emotion)}
              >
                <span 
                  className={`emotion-dot emotion-dot-${emotion}`} 
                  aria-hidden="true"
                />
                {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <main className="flex-1 w-full max-w-lg mx-auto px-4">
        {filteredEntries.length > 0 ? (
          <div className="space-y-4 animate-fade-in">
            {filteredEntries.map(entry => (
              <EntryCard
                key={entry.id}
                id={entry.id}
                text={entry.text}
                date={entry.date as Date}
                analysis={entry.analysis}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <h3 className="text-lg font-medium mb-2">No entries found</h3>
            <p className="text-muted-foreground">
              {entries.length === 0 
                ? "Start by adding your first journal entry"
                : "Try adjusting your search or filters"}
            </p>
          </div>
        )}
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Timeline;
