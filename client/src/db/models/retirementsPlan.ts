import { database } from "../config";

export class RetirementPlan {
  static db = database.collection("RetirementPlans");
}