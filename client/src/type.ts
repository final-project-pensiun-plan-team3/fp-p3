import { ObjectId } from "mongodb";

export type RetirementPlanType = {
  UserId: ObjectId;
  targetAge: number;
  targetSavings: number;
  monthlySaving: number;
  monthlySpending: number;
  inflationRate: number;
  createdAt: Date;
  updatedAt: Date;
};

export type SavingType = {
  UserId: ObjectId;
  amountSaved: number;
  createdAt: Date;
  updatedAt: Date;
};