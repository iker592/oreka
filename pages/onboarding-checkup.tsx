import React, { useState } from 'react';
import Layout from '../components/Layout';

const OnboardingCheckup = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Onboarding Checkup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="question1" className="block mb-2">How would you rate your overall mental health?</label>
          <input type="text" id="question1" name="question1" value={formData.question1} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="question2" className="block mb-2">How often do you feel stressed or anxious?</label>
          <input type="text" id="question2" name="question2" value={formData.question2} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="question3" className="block mb-2">How would you describe your sleep quality?</label>
          <input type="text" id="question3" name="question3" value={formData.question3} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="question4" className="block mb-2">How satisfied are you with your current work-life balance?</label>
          <input type="text" id="question4" name="question4" value={formData.question4} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="question5" className="block mb-2">Do you have any specific mental health concerns you&apos;d like to address?</label>
          <input type="text" id="question5" name="question5" value={formData.question5} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
      </form>
    </Layout>
  );
};

export default OnboardingCheckup;