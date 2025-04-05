
import React from 'react';

interface EmotionBackgroundImageProps {
  emotion: string;
  className?: string;
}

const EmotionBackgroundImage: React.FC<EmotionBackgroundImageProps> = ({ emotion, className = '' }) => {
  // Define image paths for each emotion with correct path
  const emotionImages: Record<string, string> = {
    joy: './emotions/joy.jpg',
    sadness: './emotions/sadness.jpg',
    anger: './emotions/anger.jpg',
    fear: './emotions/fear.jpg',
    surprise: './emotions/surprise.jpg',
    neutral: './emotions/neutral.jpg'
  };

  // Define artistic styles for each emotion
  const emotionStyles: Record<string, string> = {
    joy: 'after:bg-joy/20',
    sadness: 'after:bg-sadness/20',
    anger: 'after:bg-anger/20',
    fear: 'after:bg-fear/20',
    surprise: 'after:bg-surprise/20',
    neutral: 'after:bg-neutral/20'
  };

  // Default to neutral if emotion isn't found
  const imagePath = emotionImages[emotion.toLowerCase()] || emotionImages.neutral;
  const emotionStyle = emotionStyles[emotion.toLowerCase()] || emotionStyles.neutral;

  return (
    <div 
      className={`absolute inset-0 overflow-hidden rounded-lg ${className}`}
    >
      <div className={`absolute inset-0 -z-10 ${emotionStyle} after:absolute after:inset-0 after:opacity-30`}></div>
      <img 
        src={imagePath} 
        alt={`${emotion} mood background`} 
        className="w-full h-full object-cover opacity-15 -z-20"
        onError={(e) => {
          console.error(`Failed to load image: ${imagePath}`);
          e.currentTarget.src = './emotions/neutral.jpg';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent dark:from-black/40 -z-10"></div>
    </div>
  );
};

export default EmotionBackgroundImage;
