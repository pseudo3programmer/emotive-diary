
import React from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EmotionAnalysisProps {
  primaryEmotion: string;
  scores: Array<{
    emotion: string;
    score: number;
  }>;
  summary: string;
}

const EmotionAnalysis: React.FC<EmotionAnalysisProps> = ({ primaryEmotion, scores, summary }) => {
  // Map emotion names to colors
  const emotionColors: Record<string, string> = {
    joy: '#FFD166',
    sadness: '#118AB2',
    anger: '#EF476F',
    fear: '#073B4C',
    surprise: '#06D6A0',
    neutral: '#8A8A8A'
  };

  // Prepare data for chart
  const chartData = scores.map(item => ({
    emotion: item.emotion.charAt(0).toUpperCase() + item.emotion.slice(1),
    value: item.score * 100,
    fill: emotionColors[item.emotion]
  }));

  // Map emotions to illustration images
  const emotionIllustrations: Record<string, string> = {
    joy: '/illustrations/joy.svg',
    sadness: '/illustrations/sadness.svg',
    anger: '/illustrations/anger.svg',
    fear: '/illustrations/fear.svg',
    surprise: '/illustrations/surprise.svg',
    neutral: '/illustrations/neutral.svg'
  };

  const illustrationSrc = emotionIllustrations[primaryEmotion.toLowerCase()] || emotionIllustrations.neutral;

  return (
    <Card className="animate-scale-in glass-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-medium">Emotion Analysis</CardTitle>
            <CardDescription>{summary}</CardDescription>
          </div>
          <img 
            src={illustrationSrc}
            alt={`${primaryEmotion} illustration`}
            className="h-16 w-16 opacity-80"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-secondary/50 p-4 mb-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Dominant Emotion</p>
            <div className="flex items-center">
              <span 
                className={`emotion-dot emotion-dot-${primaryEmotion.toLowerCase()}`} 
                aria-hidden="true"
              />
              <span className="text-lg font-semibold capitalize">{primaryEmotion}</span>
            </div>
          </div>
        </div>
        
        <div className="h-48 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="emotion" />
              <YAxis hide />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionAnalysis;
