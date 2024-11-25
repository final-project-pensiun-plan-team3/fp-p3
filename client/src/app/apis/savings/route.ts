import { Saving } from "@/db/models/savings";
import { handleError, HttpError } from "@/lib/errorhandler";

export async function GET() {
	try {
		const UserId = "6744362e16f24b8ddf424622";
		if (!UserId || typeof UserId !== "string") {
			throw new HttpError("User ID is required", 400);
		}

		const savings = await Saving.getData(UserId);
		return Response.json(savings);
	} catch (error) {
		return handleError(error);
	}
}

export async function POST(req: Request) {
	try {
		const { UserId, amountSaved } = await req.json();

		if (!UserId || !amountSaved) {
			throw new HttpError("User ID and amountSaved are required", 400);
		}

		const newSaving = await Saving.create({
			UserId,
			amountSaved,
			createdAt: new Date(),
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
