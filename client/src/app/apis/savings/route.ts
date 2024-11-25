import { Saving } from "@/db/models/savings";
import { handleError, HttpError } from "@/lib/errorhandler";

export async function GET() {
	try {
		const UserId = "6744362e16f24b8ddf424622";
		if (!UserId || typeof UserId !== "string") {
			throw new HttpError("User ID is required", 400);
		}

		const savings = await Saving.getData(UserId);
		return new Response(JSON.stringify(savings), { status: 200 });
	} catch (error) {
		return handleError(error);
	}
}

export async function PUT(req: Request) {
	try {
		const { userId, updatedData } = await req.json();

		if (!userId || !updatedData) {
			throw new HttpError("User ID and updated data are required", 400);
		}

		const updatedSaving = await Saving.update(userId, updatedData);
		return new Response(JSON.stringify(updatedSaving), { status: 200 });
	} catch (error) {
		return handleError(error);
	}
}
