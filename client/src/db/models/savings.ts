import { database } from "../config";
import { ObjectId } from "mongodb";

export class Saving {
	static db = database.collection("Savings");

	static async getData(userId: string) {
		if (!ObjectId.isValid(userId)) {
			throw new Error("Invalid User ID format");
		}
		const objectId = new ObjectId(userId);
        // console.log(objectId);
		return await this.db.find({ UserId: objectId }).toArray();
	}

	static async create(data: {
		UserId: string;
		amountSaved: number;
		createdAt: Date;
	}) {
		if (!ObjectId.isValid(data.UserId)) {
			throw new Error("Invalid User ID format");
		}
		const objectId = new ObjectId(data.UserId);
		return await this.db.insertOne({ ...data, UserId: objectId });
	}

	// static async update(
	// 	UserId: string,
	// 	updatedData: Partial<{ amountSaved: number }>
	// ) {
	// 	if (!ObjectId.isValid(UserId)) {
	// 		throw new Error("Invalid User ID format");
	// 	}
	// 	const objectId = new ObjectId(UserId);
	// 	return await this.db.updateOne({ UserId: objectId }, { $set: updatedData });
	// }
}
