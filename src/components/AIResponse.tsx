
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';

interface AIResponseProps {
  response: string;
  isLoading: boolean;
}

const AIResponse: React.FC<AIResponseProps> = ({ response, isLoading }) => {
  return (
    <Card className="animate-scale-in glass-card mt-4">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Bot className="mr-2 h-5 w-5 text-primary" />
          <CardTitle className="text-xl font-medium">Your Journal Companion</CardTitle>
        </div>
        <CardDescription>Reflecting on your thoughts with you</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col space-y-2">
            <div className="h-4 w-3/4 bg-secondary/40 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-secondary/40 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-secondary/40 rounded animate-pulse"></div>
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert">
            <p className="whitespace-pre-line">{response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIResponse;
