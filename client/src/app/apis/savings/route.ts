import { Saving } from "@/db/models/savings";
import { indonesianDate } from "@/helpers/IndonesianDate";
import { handleError, HttpError } from "@/lib/errorhandler";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
  try {
    const UserId = request.headers.get("x-UserId");
    console.log("🚀 ~ GET ~ UserId:", UserId)
    if (!UserId || typeof UserId !== "string") {
      throw new HttpError("User ID is required", 400);
    }

    const savings = await Saving.getData(UserId);

    return Response.json(savings);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const {amountSaved } = await request.json();
    const UserId = request.headers.get("x-UserId");
    

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
