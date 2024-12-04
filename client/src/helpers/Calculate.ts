interface RetirementPlanOutput {
  totalSaving: number;
  progress: number;
  targetSaving: number;
  futureMonthlySpending: number;
  inflationRate: number;
  investmentRate: number;
  monthlySaving: number;
  monthlySpending: number;
  retirementAge: number;
}

export function calculateRetirementPlan(
  currentAge: number,
  monthlySaving: number,
  monthlySpending: number,
  inflationRate: number,
  investmentRate: number
): RetirementPlanOutput {
  // Convert monthly to annual
  // console.log(currentAge, monthlySaving, monthlySpending, inflationRate, investmentRate, 'disini');
  if (
    !currentAge ||
    !monthlySaving ||
    !monthlySpending ||
    !inflationRate ||
    !investmentRate
  ) {
    return {
      totalSaving: 0,
      progress: 0,
      targetSaving: 0,
      futureMonthlySpending: 0, // Convert back to monthly
      inflationRate: 0,
      investmentRate: 0,
      monthlySaving:0,
      monthlySpending: 0,
      retirementAge: 0,
    };
  }
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
    savings *= 1 + investmentRate / 100;

    // Apply inflation to the future spending
    futureSpending *= 1 + inflationRate / 100;

    // Increase age by one year
    retirementAge++;
  }

  // Return result as an object
  const output: RetirementPlanOutput = {
    totalSaving: 0,
    progress: parseFloat(((savings / targetRetirementFund) * 100).toFixed(2)),
    targetSaving: targetRetirementFund,
    futureMonthlySpending: futureSpending / 12, // Convert back to monthly
    inflationRate: parseFloat((inflationRate * 1).toFixed(2)),
    investmentRate: parseFloat((investmentRate * 1).toFixed(2)),
    monthlySaving: monthlySaving,
    monthlySpending: monthlySpending,
    retirementAge: retirementAge,
  };

  return output;
}

// console.log(calculateRetirementPlan(20, 500000, 300000, 4, 6));
