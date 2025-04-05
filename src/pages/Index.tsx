
import React, { useEffect } from 'react';
import EntryForm from '@/components/EntryForm';
import NavigationBar from '@/components/NavigationBar';
import { useToast } from '@/components/ui/use-toast';
import { Paintbrush } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();

  // Handle saving entries (also save to localStorage for persistence)
  const handleSaveEntry = (entry: any) => {
    console.log('Entry saved successfully:', entry);
    
    // Save to localStorage for persistence
    const existingEntries = localStorage.getItem('mockJournalEntries');
    let entries = [];
    
    if (existingEntries) {
      entries = JSON.parse(existingEntries);
    }
    
    // Ensure date is stored properly
    const entryWithProperDate = {
      ...entry,
      // This will ensure the date is stored as a string that can be parsed back
      date: entry.date instanceof Date ? entry.date.toISOString() : entry.date
    };
    
    // Add the new entry to the array
    entries.push(entryWithProperDate);
    
    // Save back to localStorage
    localStorage.setItem('mockJournalEntries', JSON.stringify(entries));
    
    // Show success toast
    toast({
      title: "Entry saved successfully",
      description: "Your journal entry has been saved to the database.",
    });
  };

  // Welcome toast on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedEmotivoJournal');
    
    if (!hasVisited) {
      setTimeout(() => {
        toast({
          title: "Welcome to Emotivo Journal",
          description: "Express yourself, understand your emotions, and get AI-powered reflections on your entries.",
        });
        localStorage.setItem('hasVisitedEmotivoJournal', 'true');
      }, 1000);
    }
  }, [toast]);

  return (
    <div className="min-h-screen w-full pb-24 flex flex-col items-center bg-gradient-to-b from-background via-background to-background/90">
      {/* Hero image section with artistic overlay */}
      <div className="w-full h-60 md:h-72 relative overflow-hidden animate-fade-in">
        <img 
          src="./journal-hero.jpg" 
          alt="Peaceful journal writing scene" 
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            console.error('Failed to load hero image');
            e.currentTarget.style.backgroundColor = 'hsl(var(--background))';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        
        {/* Artistic overlay pattern */}
        <div className="absolute inset-0 bg-artistic-pattern opacity-30 mix-blend-overlay"></div>
      </div>

      <header className="w-full py-8 text-center animate-slide-down relative z-10 -mt-20">
        <div className="inline-flex items-center justify-center space-x-2 mb-2">
          <Paintbrush className="h-6 w-6 text-artistic-primary" />
          <div className="h-px w-12 bg-artistic-primary/50"></div>
        </div>
        <h1 className="text-4xl font-serif font-medium tracking-wide">Emotivo Journal</h1>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto italic">
          Capture moments, understand emotions, receive AI insights
        </p>
        <div className="mt-4 flex justify-center">
          <div className="h-px w-24 bg-artistic-primary/30"></div>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-8 relative z-10">
        <EntryForm onSave={handleSaveEntry} />
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Index;
