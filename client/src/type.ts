import { ObjectId } from "mongodb";

export type RetirementPlanType = {
  UserId: ObjectId;
  currentAge: number;
  monthlySaving: number;
  monthlySpending: number;
  inflationRate: number;
  investationRate: number;
  totalSavings: number;
  createdAt: Date;
  updatedAt: Date;
};

export type SavingType = {
  _id: ObjectId;
  UserId: ObjectId;
  amountSaved: number;
  createdAt: Date;
  updatedAt: Date;
};
