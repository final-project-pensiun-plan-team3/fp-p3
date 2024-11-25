import { ObjectId } from "mongodb";
import { database } from "../config";
import { RetirementPlanType } from "@/type";
import { HttpError } from "@/lib/errorhandler";
export class RetirementPlan {
  static db = database.collection("RetirementPlans");

  static async Create({ insertedData }: { insertedData: RetirementPlanType }) {
    await this.db.insertOne(insertedData);
  }

  static async getData() {
    const UserId = new ObjectId("6744362e16f24b8ddf424622");
    if (!UserId) {
      throw new HttpError("User Id is required", 401);
    }

    const data = await this.db.find(UserId);
    return data;
  }
}
