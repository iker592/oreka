import React, { useState } from 'react';
import Layout from '../components/Layout';
import CenteredContent from '../components/CenteredContent';

const Search = () => {
  const [selectedIssue, setSelectedIssue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIssue(e.target.value);
  };

  const resources = {
    'sleeping issues': [
      'Practice good sleep hygiene: maintain a consistent sleep schedule',
      'Create a relaxing bedtime routine',
      'Limit screen time before bed',
      'Consider cognitive behavioral therapy for insomnia (CBT-I)',
    ],
    'performance issues': [
      'Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)',
      'Practice time management techniques like the Pomodoro Technique',
      'Seek feedback and act on it',
      'Invest in continuous learning and skill development',
    ],
    'diet issues': [
      'Keep a food diary to track eating habits',
      'Consult with a registered dietitian',
      'Learn about balanced nutrition and portion control',
      'Plan meals in advance to avoid impulsive eating',
    ],
    'mood issues': [
      'Practice mindfulness and meditation',
      'Engage in regular physical exercise',
      'Maintain a strong social support network',
      'Consider talking to a mental health professional',
    ],
  };

  return (
    <Layout>
      <CenteredContent>
        <h1 className="text-3xl font-bold mb-6 text-center">Search Personalized Resources</h1>
        <div className="mb-4">
          <label htmlFor="issueSelect" className="block mb-2">Select an issue:</label>
          <select
            id="issueSelect"
            value={selectedIssue}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select an issue</option>
            <option value="sleeping issues">Sleeping Issues</option>
            <option value="performance issues">Performance Issues</option>
            <option value="diet issues">Diet Issues</option>
            <option value="mood issues">Mood Issues</option>
          </select>
        </div>
        {selectedIssue && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Resources for {selectedIssue}:</h2>
            <ul className="list-disc pl-5">
              {resources[selectedIssue as keyof typeof resources].map((resource, index) => (
                <li key={index} className="mb-2">{resource}</li>
              ))}
            </ul>
          </div>
        )}
      </CenteredContent>
    </Layout>
  );
};

export default Search;