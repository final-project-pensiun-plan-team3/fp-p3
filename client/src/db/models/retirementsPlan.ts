import { ObjectId } from "mongodb";
import { database } from "../config";
import { RetirementPlanType } from "@/type";
import { HttpError } from "@/lib/errorhandler";
// import { indonesianDate } from "@/helpers/IndonesianDate";
export class RetirementPlan {
  static db = database.collection("RetirementPlans");

  static async Create({ insertedData }: { insertedData: RetirementPlanType }) {
    const transformedData: RetirementPlanType = {
      ...insertedData,
      currentAge: Number(insertedData.currentAge),
      monthlySaving: Number(insertedData.monthlySaving),
      monthlySpending: Number(insertedData.monthlySpending),
      inflationRate: Number(insertedData.inflationRate),
      investationRate: Number(insertedData.investationRate),
    };

    await this.db.insertOne(transformedData);
  }

  static async getData(UserId: string) {
    if (!UserId) {
      throw new HttpError("User Id is required", 401);
    }

    const data = await this.db.findOne({ UserId: new ObjectId(UserId) });
    // console.log("🚀 ~ RetirementPlan ~ getData ~ data:", data)

    return data;
  }
}
