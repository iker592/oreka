import React, { useState } from 'react';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import Layout from '../components/Layout';
import CenteredContent from '../components/CenteredContent';

const client = generateClient<Schema>();

const MonthlyCheckup = () => {
  const [formData, setFormData] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await client.models.MonthlyCheckup.create({
        overallMood: formData.question1,
        significantStressors: formData.question2,
        progressTowardsGoals: formData.question3,
        sleepAppetiteChanges: formData.question4,
        improvementFocus: formData.question5,
      });
      console.log('Monthly checkup submitted successfully');
      // Reset form or navigate to another page
      setFormData({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
      });
    } catch (error) {
      console.error('Error submitting monthly checkup:', error);
    }
  };

  return (
    <Layout>
      <CenteredContent>
        <h1 className="text-3xl font-bold mb-6 text-center">Monthly Checkup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question1" className="block mb-2">How would you rate your overall mood this month?</label>
            <input type="text" id="question1" name="question1" value={formData.question1} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="question2" className="block mb-2">Have you experienced any significant stressors this month?</label>
            <input type="text" id="question2" name="question2" value={formData.question2} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="question3" className="block mb-2">How satisfied are you with your progress towards your goals?</label>
            <input type="text" id="question3" name="question3" value={formData.question3} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="question4" className="block mb-2">Have you noticed any changes in your sleep or appetite?</label>
            <input type="text" id="question4" name="question4" value={formData.question4} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="question5" className="block mb-2">Is there anything you'd like to focus on improving next month?</label>
            <input type="text" id="question5" name="question5" value={formData.question5} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
        </form>
      </CenteredContent>
    </Layout>
  );
};

export default MonthlyCheckup;