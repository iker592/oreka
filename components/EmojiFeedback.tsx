import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const emojis = [
  { emoji: '😢', level: 5, label: 'Very Sad' },
  { emoji: '😕', level: 4, label: 'Sad' },
  { emoji: '😐', level: 3, label: 'Neutral' },
  { emoji: '🙂', level: 2, label: 'Happy' },
  { emoji: '😄', level: 1, label: 'Very Happy' },
];

const EmojiButton = ({ emoji, onClick, label }: { emoji: string, onClick: () => void, label: string }) => (
  <button
    onClick={onClick}
    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl hover:scale-110 transition-transform duration-200 focus:outline-none"
    title={label}
    aria-label={label}
  >
    {emoji}
  </button>
);

const EmojiFeedback = () => {
  const [response, setResponse] = useState<string | null>(null);
  
  const handleEmojiClick = (level: number) => {
    // This is where you would typically make an API call
    // For demonstration, we'll use placeholder responses
    let placeholderResponse: string;
    switch (level) {
      case 5:
        placeholderResponse = "We recommend contacting a psychologist. Here's a contact: [Psychologist details]";
        break;
      case 1:
        placeholderResponse = "Congratulations on feeling great!";
        break;
      default:
        placeholderResponse = `Here are some resources for happiness level ${level}: [Resource list]`;
    }
    setResponse(placeholderResponse);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">How are you feeling today?</h2>
      <div className="flex justify-between mb-8 flex-wrap">
        {emojis.map((emoji) => (
          <EmojiButton
            key={emoji.level}
            emoji={emoji.emoji}
            onClick={() => handleEmojiClick(emoji.level)}
            label={emoji.label}
          />
        ))}
      </div>
      {response && (
        <Alert>
          <AlertTitle>Response</AlertTitle>
          <AlertDescription>{response}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EmojiFeedback;