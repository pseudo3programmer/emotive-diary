
type Emotion = 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'neutral';

interface EmotionScore {
  emotion: Emotion;
  score: number;
}

interface EmotionAnalysisResult {
  primaryEmotion: Emotion;
  scores: EmotionScore[];
  summary: string;
}

// This is a mock analyzer that would be replaced with a real API 
// or a machine learning model in a production app
export const analyzeEmotion = (text: string): EmotionAnalysisResult => {
  // Sample keywords for each emotion - in a real app, this would be more sophisticated
  const emotionKeywords: Record<Emotion, string[]> = {
    joy: ['happy', 'glad', 'excited', 'delighted', 'pleased', 'joy', 'enjoy', 'love', 'wonderful', 'great'],
    sadness: ['sad', 'unhappy', 'disappointed', 'depressed', 'gloomy', 'miserable', 'upset', 'lonely', 'heartbroken', 'grief'],
    anger: ['angry', 'mad', 'furious', 'irritated', 'annoyed', 'frustrated', 'rage', 'hate', 'resent', 'outraged'],
    fear: ['afraid', 'scared', 'terrified', 'anxious', 'worried', 'nervous', 'panic', 'dread', 'frightened', 'concerned'],
    surprise: ['surprised', 'shocked', 'amazed', 'astonished', 'stunned', 'unexpected', 'wow', 'incredible', 'startled', 'speechless'],
    neutral: ['normal', 'fine', 'okay', 'neutral', 'average', 'common', 'typical', 'regular', 'standard', 'usual']
  };

  // Normalize and clean the text
  const normalizedText = text.toLowerCase();
  
  // Count occurrences of emotion keywords
  const counts: Record<Emotion, number> = {
    joy: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    surprise: 0,
    neutral: 0
  };
  
  // Calculate raw scores based on keyword frequency
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = normalizedText.match(regex);
      if (matches) {
        counts[emotion as Emotion] += matches.length;
      }
    });
  });
  
  // If no emotions are detected, default to neutral
  const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);
  if (totalCount === 0) {
    counts.neutral = 1;
  }
  
  // Calculate percentage scores
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const scores: EmotionScore[] = Object.entries(counts).map(([emotion, count]) => ({
    emotion: emotion as Emotion,
    score: Math.round((count / total) * 100) / 100
  })).sort((a, b) => b.score - a.score);
  
  // Determine primary emotion
  const primaryEmotion = scores[0].emotion;
  
  // Generate a summary based on the primary emotion
  const summaries: Record<Emotion, string> = {
    joy: "Your entry reflects happiness and positive emotions.",
    sadness: "Your entry suggests feelings of sadness or melancholy.",
    anger: "Your entry indicates frustration or anger.",
    fear: "Your entry shows signs of anxiety or concern.",
    surprise: "Your entry expresses surprise or amazement.",
    neutral: "Your entry appears to be relatively neutral in emotional tone."
  };
  
  return {
    primaryEmotion,
    scores,
    summary: summaries[primaryEmotion]
  };
};
