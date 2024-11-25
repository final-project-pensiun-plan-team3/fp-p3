"use client"

import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    income: '',
    percentage: '',
    age: '',
    retirementAge: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <div>
      <Navbar/>
      {/* Main 1 */}
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('https://placehold.co/1920x1080')" }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-6">HELLO THERE</h1>
            <p className="text-lg mb-6">
              Plan for your future with our PensiunPlan. Fill in your income, percentage of savings, and age to get started.
            </p>
            <button
              onClick={() => document.getElementById('retirement-form').scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Main 2 (Form) */}
      <div id="retirement-form" className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Retirement Plan Form</h2>

          {isSubmitted && (
            <div className="text-center text-green-500 mb-6">
              <p>Thank you for submitting your retirement plan details!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="income" className="block text-sm font-medium text-gray-600">Annual Income</label>
              <input
                type="number"
                id="income"
                name="income"
                value={formData.income}
                onChange={handleChange}
                required
                placeholder="Enter your annual income"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="percentage" className="block text-sm font-medium text-gray-600">Percentage of Income to Save (%)</label>
              <input
                type="number"
                id="percentage"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                required
                placeholder="Enter the percentage of income to save"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-600">Current Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                placeholder="Enter your current age"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="retirementAge" className="block text-sm font-medium text-gray-600">Retirement Age</label>
              <input
                type="number"
                id="retirementAge"
                name="retirementAge"
                value={formData.retirementAge}
                onChange={handleChange}
                required
                placeholder="Enter your expected retirement age"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
