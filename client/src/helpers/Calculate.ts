interface RetirementPlanOutput {
  totalSaving: number;
  progress: string;
  targetSaving: number;
  futureMonthlySpending: number;
  inflationRate: string;
  investmentRate: string;
  monthlySaving: number;
  monthlySpending: number;
  retirementAge: string;
}

export function calculateRetirementPlan(
  currentAge: number,
  monthlySaving: number,
  monthlySpending: number,
  inflationRate: number,
  investmentRate: number
): RetirementPlanOutput {
  // Convert monthly to annual
  const annualSpending = monthlySpending * 12;

  // Calculate the target retirement fund based on the 4% rule (multiplied by 25)
  const targetRetirementFund = annualSpending * 25;

  // Initialize savings
  let savings = 0;
  let futureSpending = annualSpending;

  // Calculate retirement age
  let retirementAge = currentAge;

  while (savings < targetRetirementFund) {
    // Add monthly savings to yearly savings
    savings += monthlySaving * 12;

    // Apply investment return
    savings *= (1 + investmentRate / 100);

    // Apply inflation to the future spending
    futureSpending *= (1 + inflationRate / 100);

    // Increase age by one year
    retirementAge++;
  }

  // Return result as an object
  const output: RetirementPlanOutput = {
    totalSaving: savings,
    progress: ((savings / targetRetirementFund) * 100).toFixed(2),
    targetSaving: targetRetirementFund,
    futureMonthlySpending: futureSpending / 12, // Convert back to monthly
    inflationRate: (inflationRate * 100).toFixed(2),
    investmentRate: (investmentRate * 100).toFixed(2),
    monthlySaving: monthlySaving,
    monthlySpending: monthlySpending,
    retirementAge: retirementAge.toString(),
  };

  return output;
}

console.log(calculateRetirementPlan(20, 500000, 300000, 0.04, 0.06));