import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/router';

const emojis = [
  { emoji: '😢', level: 5, label: 'Very Sad' },
  { emoji: '😕', level: 4, label: 'Sad' },
  { emoji: '😐', level: 3, label: 'Neutral' },
  { emoji: '🙂', level: 2, label: 'Happy' },
  { emoji: '😄', level: 1, label: 'Very Happy' },
];

const EmojiButton = ({ emoji, onClick, label, isSelected }: { emoji: string, onClick: () => void, label: string, isSelected: boolean }) => (
  <div className="flex flex-col items-center">
    <button
      onClick={onClick}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl transition-transform duration-200 focus:outline-none hover:scale-110"
      title={label}
      aria-label={label}
    >
      {emoji}
    </button>
    {isSelected && <div className="w-2 h-2 bg-white rounded-full mt-2"></div>}
  </div>
);

const mockResources = {
  5: [
    { name: "Crisis Helpline", description: "24/7 support for urgent mental health concerns", contact: "1-800-123-4567" },
    { name: "Dr. Emily Johnson", specialty: "Depression and Anxiety Specialist", contact: "emily.johnson@example.com" },
    { name: "Mindfulness for Tough Times", description: "Online workshop series", contact: "mindfulness@example.com" },
  ],
  4: [
    { name: "Stress Management Group", description: "Weekly support group sessions", contact: "stress.group@example.com" },
    { name: "Dr. Michael Lee", specialty: "Cognitive Behavioral Therapy", contact: "michael.lee@example.com" },
    { name: "Mood Boost App", description: "Daily activities to improve mood", contact: "support@moodboost.com" },
  ],
  3: [
    { name: "Work-Life Balance Workshop", description: "Monthly online sessions", contact: "workshops@balancedlife.com" },
    { name: "Mindfulness Meditation Center", description: "Group sessions for stress relief", contact: "info@mindfulnesscenter.com" },
    { name: "Dr. Sarah Adams", specialty: "General Mental Wellness", contact: "sarah.adams@example.com" },
  ],
  2: [
    { name: "Positive Psychology Course", description: "Learn techniques to maintain happiness", contact: "courses@positivepsych.com" },
    { name: "Gratitude Journaling Workshop", description: "Cultivate appreciation in daily life", contact: "gratitude@workshops.com" },
    { name: "Dr. David Wilson", specialty: "Happiness and Well-being Coach", contact: "david.wilson@example.com" },
  ],
  1: [
    { name: "Mood Maintenance Tips", description: "Daily newsletter with positivity boosters", contact: "subscribe@moodmaintenance.com" },
    { name: "Community Volunteering Opportunities", description: "Give back and stay happy", contact: "volunteer@community.org" },
    { name: "Dr. Lisa Chen", specialty: "Positive Psychology Practitioner", contact: "lisa.chen@example.com" },
  ],
};

const EmojiFeedback = ({ onSave }: { onSave: (level: number, comment: string) => void }) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [response, setResponse] = useState('');
  const [submittedEmoji, setSubmittedEmoji] = useState('');

  const handleEmojiClick = (level: number) => {
    setSelectedLevel(level);
  };

  const handleSave = () => {
    if (selectedLevel !== null) {
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      onSave(selectedLevel, comment);
      const selectedEmoji = emojis.find(emoji => emoji.level === selectedLevel)?.label || '';
      setSubmittedEmoji(selectedEmoji);
      let responseMessage = '';
      switch (selectedLevel) {
        case 5:
          responseMessage = "We're sorry you're feeling down. Remember, it's okay to seek help when needed.";
          break;
        case 4:
          responseMessage = "It seems like you're having a tough day. Consider talking to someone you trust.";
          break;
        case 3:
          responseMessage = "Your mood is neutral. This can be a good time for self-reflection.";
          break;
        case 2:
          responseMessage = "You're feeling good! Keep up the positive momentum.";
          break;
        case 1:
          responseMessage = "Fantastic! You're feeling great. Enjoy this positive state of mind.";
          break;
      }
      setResponse(responseMessage);
      setIsDialogOpen(true);
    }
  };

  const handleShowResources = () => {
    setShowResources(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setShowResources(false);
    setComment('');
    setSelectedLevel(null);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">How are you feeling today?</h2>
      <div className="flex justify-between mb-8 flex-wrap">
        {emojis.map((emoji) => (
          <EmojiButton
            key={emoji.level}
            emoji={emoji.emoji}
            onClick={() => handleEmojiClick(emoji.level)}
            label={emoji.label}
            isSelected={selectedLevel === emoji.level}
          />
        ))}
      </div>
      {selectedLevel !== null && (
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Add a comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-gray-700 text-gray-100 border-gray-600"
          />
        </div>
      )}
      {selectedLevel !== null && (
        <Button onClick={handleSave} className="w-full bg-blue-600 text-white">
          Save Feedback
        </Button>
      )}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-[90vw] w-full sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw] max-h-[90vh] overflow-y-auto bg-gray-800 text-gray-100 border-gray-700">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-gray-100">
              {showResources ? (
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <span>Recommended Resources</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600"
                      onClick={() => window.location.href = '/search'}
                    >
                      All Resources
                    </Button>
                  </div>
                </div>
              ) : "Feedback Saved"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {!showResources ? (
              <>
                <p className="text-gray-300">Your daily checkup has been saved.</p>
                <p className="text-gray-300 mt-2">Submitted checkup: <strong>{submittedEmoji}</strong> - <strong>{comment}</strong></p>
                <p className="text-gray-300 mt-2">{response}</p>
                {selectedLevel && selectedLevel >= 3 ? (
                  <div className="flex space-x-4 mt-4">
                    <Button onClick={handleCloseDialog} className="flex-1 bg-gray-600 text-white hover:bg-gray-700">
                      OK
                    </Button>
                    <Button onClick={handleShowResources} className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
                      See recommended resources
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleCloseDialog} className="w-full bg-blue-600 text-white mt-4">
                    OK
                  </Button>
                )}
              </>
            ) : (
              <>
                {mockResources[selectedLevel as keyof typeof mockResources].map((resource, index) => (
                  <Card key={index} className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-gray-100">{resource.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{resource.specialty || resource.description}</p>
                      <p className="text-gray-300">Contact: {resource.contact}</p>
                    </CardContent>
                  </Card>
                ))}
                <Button onClick={handleCloseDialog} className="w-full bg-blue-600 text-white mt-4">
                  OK
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmojiFeedback;