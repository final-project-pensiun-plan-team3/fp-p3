import { RetirementPlan } from "@/db/models/retirementsPlan";
import { handleError} from "@/lib/errorhandler";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const UserId = "6744362e16f24b8ddf424622"
    const plan = await RetirementPlan.getData(UserId);
    return Response.json(plan);
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(request:NextRequest) {
  try {
    const data= await request.json()

    const insertedData = {
      ...data,
      UserId: new ObjectId("6744362e16f24b8ddf424622"),
      createdAt:new Date(),
      updatedAt:new Date()
    };

    await RetirementPlan.Create({insertedData});

     return Response.json({ message: "Added to wish list successfully" });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return handleError(error);
  }
}
