import { Saving } from "@/db/models/savings";
import { handleError, HttpError } from "@/lib/errorhandler";
import { DateFilter } from "@/type";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const UserId = request.headers.get("x-UserId");
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    // console.log("🚀 ~ GET ~ UserId:", UserId);
    
    if (!UserId || typeof UserId !== "string") {
      throw new HttpError("User ID is required", 400);
    }

    // Example usage
    const dateFilter: DateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(
          new Date(endDate).setHours(23, 59, 59, 999)
        ),
      };
    }

    const savings = await Saving.getDataFilter(UserId, page, limit, dateFilter);

    return Response.json(savings);
  } catch (error) {
    return handleError(error);
  }
}
