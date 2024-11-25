import { ObjectId } from "mongodb";

export type RetirementPlanType = {
  UserId: ObjectId;
  currentAge: number;
  targetAge: number;
  targetSavings: number;
  monthlySaving: number;
  monthlySpending: number;
  inflationRate: number;
  createdAt: Date;
  updatedAt: Date;
};
