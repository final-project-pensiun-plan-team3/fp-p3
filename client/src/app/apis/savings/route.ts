import { Saving } from "@/db/models/savings";
import { indonesianDate } from "@/helpers/IndonesianDate";
import { handleError, HttpError } from "@/lib/errorhandler";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const UserId = request.headers.get("x-UserId");
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    console.log("🚀 ~ GET ~ UserId:", UserId);

    if (!UserId || typeof UserId !== "string") {
      throw new HttpError("User ID is required", 400);
    }

    const dateFilter: any = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const savings = await Saving.getData(UserId, page, limit, dateFilter);

    return Response.json(savings);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    let { amountSaved } = await request.json();
    const UserId = request.headers.get("x-UserId");
    amountSaved = Number(amountSaved);

    if (!UserId || !amountSaved) {
      throw new HttpError("User ID and amountSaved are required", 400);
    }

    const newSaving = await Saving.create({
      UserId,
      amountSaved,
      createdAt: indonesianDate(),
    });

    return new Response(JSON.stringify(newSaving), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

// export async function PUT(req: Request) {
// 	try {
// 		const { UserId, updatedData } = await req.json();

// 		if (!UserId || !updatedData) {
// 			throw new HttpError("User ID and updated data are required", 400);
// 		}

// 		const updatedSaving = await Saving.update(UserId, updatedData);
// 		return new Response(JSON.stringify(updatedSaving), { status: 200 });
// 	} catch (error) {
// 		return handleError(error);
// 	}
// }
