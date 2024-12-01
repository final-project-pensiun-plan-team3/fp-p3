import { RetirementPlan } from "@/db/models/retirementsPlan";
import { indonesianDate } from "@/helpers/IndonesianDate";
import { handleError, HttpError } from "@/lib/errorhandler";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const UserId = request.headers.get("x-UserId");
    if (UserId) {
      const plan = await RetirementPlan.getData(UserId);
      return Response.json(plan);
    }
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const UserId = request.headers.get("x-UserId");
    if (UserId) {
      const alreadyExist = await RetirementPlan.getData(UserId);
      if (alreadyExist) {
        throw new HttpError("You already have a Retirement Plan", 400);
      }
      const insertedData = {
        ...data,
        UserId: new ObjectId(UserId),
        totalSavings:0,
        createdAt: indonesianDate(),
        updatedAt: indonesianDate(),
      };

      await RetirementPlan.Create({ insertedData });

      return Response.json({ message: "Added to RetirementPlan succesfully" });
    }
  } catch (error) {
    // console.log("🚀 ~ POST ~ error:", error)
    return handleError(error);
  }
}
