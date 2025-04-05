
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import NavigationBar from '@/components/NavigationBar';
import { Settings as SettingsIcon, Trash2, Download, Upload, Moon, Sun, Bell } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

const Settings = () => {
  const { toast } = useToast();
  
  const handleClearData = async () => {
    if (confirm("Are you sure you want to delete all your journal entries? This action cannot be undone.")) {
      try {
        // Get all entries
        const response = await fetch(`${API_BASE_URL}/journal`);
        const entries = await response.json();
        
        // Delete each entry individually
        for (const entry of entries) {
          await fetch(`${API_BASE_URL}/journal/${entry.id}`, {
            method: 'DELETE'
          });
        }
        
        toast({
          title: "Data cleared",
          description: "All journal entries have been deleted.",
        });
      } catch (error) {
        console.error('Error clearing data:', error);
        toast({
          title: "Error clearing data",
          description: "There was a problem deleting your journal entries.",
          variant: "destructive",
        });
      }
    }
  };

  const handleExportData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/journal`);
      const entries = await response.json();
      
      const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `emotivo-journal-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Data exported",
        description: "Your journal data has been exported.",
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Error exporting data",
        description: "There was a problem exporting your journal entries.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen w-full pb-24 flex flex-col bg-gradient-to-b from-background to-background/95">
      <header className="w-full py-6 text-center animate-slide-down">
        <div className="flex items-center justify-center mb-2">
          <SettingsIcon className="h-6 w-6 mr-2" />
          <h1 className="text-3xl font-light tracking-tight">Settings</h1>
        </div>
        <p className="text-muted-foreground">Customize your experience</p>
      </header>
      
      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-4 space-y-6 animate-fade-in">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how Emotivo Journal looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sun className="h-5 w-5 text-muted-foreground" />
                <span>Light Mode</span>
              </div>
              <Switch />
              <div className="flex items-center space-x-2">
                <span>Dark Mode</span>
                <Moon className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span>Journal reminders</span>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Manage your journal data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={handleExportData}
            >
              <Download className="mr-2 h-5 w-5" />
              Export all journal entries
            </Button>
            
            <Button variant="outline" className="w-full justify-start" disabled>
              <Upload className="mr-2 h-5 w-5" />
              Import journal entries
            </Button>
            
            <Separator />
            
            <Button 
              variant="destructive" 
              className="w-full justify-start" 
              onClick={handleClearData}
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Clear all data
            </Button>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>Information about Emotivo Journal</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Version 1.0.0
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Emotivo Journal is a privacy-focused emotion sensing diary that helps you track and understand your emotions over time.
            </p>
          </CardContent>
        </Card>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Settings;
