import { Saving } from "@/db/models/savings";
import { handleError, HttpError } from "@/lib/errorhandler";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const UserId = request.headers.get("x-UserId");
    if (!UserId || typeof UserId !== "string") {
      throw new HttpError("User ID is required", 400);
    }

    const latestSaving = await Saving.getlatest();
    // console.log("🚀 ~ GET ~ latestSaving:", latestSaving);

    if (!latestSaving) {
      throw new HttpError("No savings found for this user", 404);
    }

    return Response.json(latestSaving);
  } catch (error) {
    return handleError(error);
  }
}
