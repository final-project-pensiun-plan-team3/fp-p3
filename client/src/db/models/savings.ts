import { database } from "../config";
import { ObjectId } from "mongodb";

export class Saving {
	static db = database.collection("Savings");

	static async getData(userId: string) {
		if (!ObjectId.isValid(userId)) {
			throw new Error("Invalid User ID format");
		}
		const objectId = new ObjectId(userId);
		return await this.db.find({ userId: objectId }).toArray();
	}

	static async create(data: {
		userId: string;
		amountSaved: number;
		createdAt: Date;
	}) {
		if (!ObjectId.isValid(data.userId)) {
			throw new Error("Invalid User ID format");
		}
		const objectId = new ObjectId(data.userId);
		return await this.db.insertOne({ ...data, userId: objectId });
	}

	static async update(
		userId: string,
		updatedData: Partial<{ amountSaved: number }>
	) {
		if (!ObjectId.isValid(userId)) {
			throw new Error("Invalid User ID format");
		}
		const objectId = new ObjectId(userId);
		return await this.db.updateOne({ userId: objectId }, { $set: updatedData });
	}
}
