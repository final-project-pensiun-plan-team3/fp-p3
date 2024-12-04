"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { calculateRetirementPlan } from "@/helpers/Calculate";
import { Rp } from "@/helpers/currency";
import axios from "axios";
import { useEffect, useState } from "react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const {
      currentAge,
      monthlySaving,
      monthlySpending,
      inflationRate,
      investationRate,
    } = formData;
    const result = calculateRetirementPlan(
      parseInt(currentAge),
      parseInt(monthlySaving),
      parseInt(monthlySpending),
      parseInt(inflationRate),
      parseInt(investationRate)
    );
    setRetirementAge(result.retirementAge);
  }, [formData]);

  // console.log(retirementAge, )

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (retirementAge !== null && retirementAge <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Retirement is not possible because your monthly spending is greater than your monthly saving.",
      });
    } else {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/apis/retirement`,
          formData
        );
        Swal.fire("Success", "Data Successfully Updated", "success");
      } catch {
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  return (
    <div>
      <FloatingNav />
      <div className="min-h-screen bg-[#263140] flex items-center justify-center p-4">
        <div className="flex flex-col sm:flex-row w-full max-w-screen-xl p-8 space-y-8 sm:space-y-0 sm:space-x-8">
          {/* Form Section (Left) */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-1/2">
            <h2 className="text-3xl font-bold text-[#8b643b] text-center mb-6">
              Retirement Plan Form
            </h2>
  
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="currentAge"
                  className="block text-sm font-medium text-[#263140]"
                >
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
                  className="w-full px-4 py-2 mt-2 border border-[#64788d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b643b]"
                />
              </div>
  
              <div>
                <label
                  htmlFor="monthlySaving"
                  className="block text-sm font-medium text-[#263140]"
                >
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
                  className="w-full px-4 py-2 mt-2 border border-[#64788d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b643b]"
                />
              </div>
  
              <div>
                <label
                  htmlFor="monthlySpending"
                  className="block text-sm font-medium text-[#263140]"
                >
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
                  className="w-full px-4 py-2 mt-2 border border-[#64788d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b643b]"
                />
              </div>
  
              <div>
                <label
                  htmlFor="inflationRate"
                  className="block text-sm font-medium text-[#263140]"
                >
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
                  className="w-full px-4 py-2 mt-2 border border-[#64788d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b643b]"
                />
              </div>
  
              <div>
                <label
                  htmlFor="investationRate"
                  className="block text-sm font-medium text-[#263140]"
                >
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
                  className="w-full px-4 py-2 mt-2 border border-[#64788d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b643b]"
                />
              </div>
  
              <div>
                <label
                  htmlFor="retirementAge"
                  className="block text-sm font-medium text-[#263140]"
                >
                  Retirement Age
                </label>
                <input
                  type="number"
                  id="retirementAge"
                  name="retirementAge"
                  value={retirementAge || ""}
                  readOnly
                  className="w-full px-4 py-2 mt-2 border border-[#64788d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b643b] bg-[#f1e3a8]"
                />
              </div>
  
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#8b643b] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#6f4a2e]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
  
          {/* Explanation Section (Right) */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-1/2">
            <h2 className="text-3xl font-bold text-[#8b643b] text-center mb-6">
              What is the 4% Rule?
            </h2>
            <p className="text-lg text-[#263140]">
              The <strong>4% rule</strong> is a retirement planning guideline
              suggesting that you can withdraw 4% of your retirement savings
              each year, adjusted for inflation, without running out of money
              for at least 30 years. For example, if you have saved{" "}
              {Rp(1000000)} for retirement, you could withdraw {Rp(40000)} per
              year (4% of {Rp(1000000)}). This strategy assumes a well-balanced
              portfolio with both stocks and bonds, and is designed to provide
              sustainable income over the long term.
            </p>
            <br />
            <h3 className="text-xl font-semibold text-[#263140]">
              Why the 4% Rule?
            </h3>
            <p className="text-lg text-[#263140]">
              The 4% rule is based on historical market performance and the idea
              that you should be able to maintain a steady income throughout
              retirement without the risk of depleting your savings too soon.
              While it’s a useful guideline, it’s important to consider your
              individual financial situation, inflation rates, and investment
              returns when making retirement plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}
