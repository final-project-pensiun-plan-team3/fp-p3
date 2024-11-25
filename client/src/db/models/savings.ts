import { HttpError } from "@/lib/errorhandler";
import { database } from "../config";
import { ObjectId } from "mongodb";

export class Saving {
	static db = database.collection("Savings");

	static async getData() {
		const UserId = new ObjectId("6744362e16f24b8ddf424622");
		if (!UserId) {
			throw new HttpError("User Id is required", 401);
		}
		return await this.db.find({ UserId }).toArray();
	}
}
