import { ObjectId } from "mongodb";
import { database } from "../config";
import { RetirementPlanType } from "@/type";
import { HttpError } from "@/lib/errorhandler";
import { indonesianDate } from "@/helpers/IndonesianDate";
export class RetirementPlan {
  static db = database.collection("RetirementPlans");

  static async Create({ insertedData }: { insertedData: RetirementPlanType }) {
    // console.log("🚀 ~ RetirementPlan ~ Create ~ insertedData:", insertedData)
    await this.db.insertOne(insertedData);
    console.log(indonesianDate());
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
