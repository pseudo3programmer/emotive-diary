
// This is a simple rule-based AI response generator
// In a production app, this would be replaced with a call to an actual AI API

interface EmotionResponse {
  [key: string]: string[];
}

const emotionResponses: EmotionResponse = {
  joy: [
    "I'm so glad to see you're feeling happy today! What sparked this joy for you?",
    "Your happiness shines through in your words. Those moments are worth treasuring, aren't they?",
    "It's lovely to see you in such good spirits! What's been bringing a smile to your face?"
  ],
  sadness: [
    "I hear you're feeling down today. Sometimes it helps just to acknowledge those feelings and be gentle with yourself.",
    "It sounds like today has been tough. Remember that all emotions, even the difficult ones, are temporary visitors.",
    "I'm really sorry you're feeling sad. Would talking to someone close to you help lighten the weight a bit?"
  ],
  anger: [
    "I can tell you're pretty frustrated right now. Take a deep breath - it's okay to feel this way.",
    "Sounds like something really pushed your buttons. Sometimes anger is telling us an important boundary has been crossed.",
    "When I'm as annoyed as you seem to be, I find it helps to channel that energy into something physical - even just a quick walk can help."
  ],
  fear: [
    "It's natural to feel anxious about this. Your concerns are valid, and acknowledging them is an important step.",
    "I can sense you're worried. Sometimes putting those fears into words like you've done helps take away some of their power.",
    "Those anxious feelings can be overwhelming, can't they? Remember that you've faced difficult situations before and made it through."
  ],
  surprise: [
    "Wow, that was unexpected! Life has a way of throwing curveballs when we least expect them, doesn't it?",
    "Sometimes the unexpected things lead to the best stories later. How are you processing this surprise?",
    "That must have caught you off guard! Are you seeing any silver linings in this unexpected turn of events?"
  ],
  neutral: [
    "Seems like today is flowing along at its own pace. Sometimes those ordinary days are worth appreciating too.",
    "I notice you're in a pretty balanced headspace today. Those moments of calm can be refreshing, right?",
    "Today feels like a steady day from your writing. Any small wins or moments worth celebrating that might have gone unnoticed?"
  ]
};

const generalResponses = [
  "I'm here anytime you want to work through your thoughts. What else is on your mind today?",
  "Thanks for sharing that with me. It takes courage to put your feelings into words sometimes.",
  "I've noticed you've been journaling regularly - that's a great habit for emotional well-being!",
  "Writing things down can help you spot patterns in how you're feeling. Have you noticed any recurring themes lately?"
];

export function generateAIResponse(text: string, primaryEmotion: string): Promise<string> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Get emotion-specific responses
      const emotionSpecificResponses = emotionResponses[primaryEmotion.toLowerCase()] || emotionResponses.neutral;
      
      // Create a personalized response based on entry content and emotion
      let personalizedResponse = '';
      
      // Pick a random response from the emotion-specific array
      const randomEmotionResponse = emotionSpecificResponses[Math.floor(Math.random() * emotionSpecificResponses.length)];
      
      // Pick a random general response
      const randomGeneralResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
      
      // Combine them into a multi-paragraph response
      personalizedResponse = `${randomEmotionResponse}\n\n${randomGeneralResponse}`;
      
      resolve(personalizedResponse);
    }, 1500); // Simulate processing time
  });
}
