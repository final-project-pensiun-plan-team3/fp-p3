"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { RetirementAge } from "@/helpers/RetirementAge";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";


export default function Onboarding() {
  const [formData, setFormData] = useState({
    currentAge: "",
    monthlySaving: "",
    monthlySpending: "",
    inflationRate: "",
    investationRate: "",
  });

  const [retirementAge, setRetirementAge] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: +value,
    });

    const { currentAge, monthlySaving, monthlySpending, inflationRate, investationRate } = formData;

    if (currentAge && monthlySaving && monthlySpending && inflationRate) {
      const result = RetirementAge(
        parseInt(currentAge),
        parseInt(monthlySaving),
        parseInt(monthlySpending),
        parseInt(inflationRate),
        parseInt(investationRate)
      );
      setRetirementAge(result);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (retirementAge !== null && retirementAge < 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Retirement is not possible because your monthly spending is greater than your monthly saving.",
      });
    } else {
      try {
        const data = await axios.post("/apis/retirement", formData);

        // const data = await response.json();
        console.log(data, 'data');

          Swal.fire("Success", "Data Successfully Updated", "success");
          setIsSubmitted(true);
      } catch {
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div id="retirement-form" className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Retirement Plan Form
          </h2>

          {isSubmitted && retirementAge !== null && (
            <div className="text-center text-green-500 mb-6">
              <p>Your retirement age will be: {retirementAge}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form Field for Current Age */}
            <div>
              <label htmlFor="currentAge" className="block text-sm font-medium text-gray-600">
                Current Age
              </label>
              <input
                type="number"
                id="currentAge"
                name="currentAge"
                value={formData.currentAge}
                onChange={handleChange}
                required
                placeholder="Enter your current age"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Form Field for Monthly Saving */}
            <div>
              <label htmlFor="monthlySaving" className="block text-sm font-medium text-gray-600">
                Monthly Saving (Rp)
              </label>
              <input
                type="number"
                id="monthlySaving"
                name="monthlySaving"
                value={formData.monthlySaving}
                onChange={handleChange}
                required
                placeholder="Enter your monthly saving"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Form Field for Monthly Spending */}
            <div>
              <label htmlFor="monthlySpending" className="block text-sm font-medium text-gray-600">
                Monthly Spending (Rp)
              </label>
              <input
                type="number"
                id="monthlySpending"
                name="monthlySpending"
                value={formData.monthlySpending}
                onChange={handleChange}
                required
                placeholder="Enter your monthly spending"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Form Field for Inflation Rate */}
            <div>
              <label htmlFor="inflationRate" className="block text-sm font-medium text-gray-600">
                Inflation Rate (%)
              </label>
              <input
                type="number"
                id="inflationRate"
                name="inflationRate"
                value={formData.inflationRate}
                onChange={handleChange}
                required
                placeholder="Enter annual inflation rate"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Form Field for Investment Rate */}
            <div>
              <label htmlFor="investationRate" className="block text-sm font-medium text-gray-600">
                Investment Rate (%)
              </label>
              <input
                type="number"
                id="investationRate"
                name="investationRate"
                value={formData.investationRate}
                onChange={handleChange}
                required
                placeholder="Enter annual investment return rate"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Form Field for Retirement Age */}
            <div>
              <label htmlFor="retirementAge" className="block text-sm font-medium text-gray-600">
                Retirement Age
              </label>
              <input
                type="number"
                id="retirementAge"
                name="retirementAge"
                value={retirementAge || ""}
                readOnly
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
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
      <Footer />
    </div>
  );
}
