import { Saving } from "@/db/models/savings";
import { handleError, HttpError } from "@/lib/errorhandler";

export async function GET() {
	try {
		const UserId = "6744362e16f24b8ddf424622";
		if (!UserId || typeof UserId !== "string") {
			throw new HttpError("User ID is required", 400);
		}

		const latestSaving = await Saving.getlatest(UserId);

        if (!latestSaving) {
			throw new HttpError("No savings found for this user", 404);
		}

		return Response.json(latestSaving);
	} catch (error) {
		return handleError(error);
	}
}
