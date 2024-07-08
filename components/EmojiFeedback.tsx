import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const emojis = [
  { emoji: '😢', level: 5, label: 'Very Sad' },
  { emoji: '😕', level: 4, label: 'Sad' },
  { emoji: '😐', level: 3, label: 'Neutral' },
  { emoji: '🙂', level: 2, label: 'Happy' },
  { emoji: '😄', level: 1, label: 'Very Happy' },
];

const EmojiButton = ({ emoji, onClick, label }) => (
  <button
    onClick={onClick}
    className="text-6xl hover:scale-110 transition-transform duration-200 focus:outline-none"
    title={label}
    aria-label={label}
  >
    {emoji}
  </button>
);

const EmojiFeedback = () => {
  const [response, setResponse] = useState(null);

  const handleEmojiClick = (level) => {
    // This is where you would typically make an API call
    // For demonstration, we'll use placeholder responses
    let placeholderResponse;
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">How are you feeling today?</h2>
      <div className="flex justify-between mb-8">
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