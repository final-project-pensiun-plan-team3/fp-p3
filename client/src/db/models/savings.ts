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
    return await this.db
      .find({ UserId: objectId })
      .sort("createdAt", -1)
      .toArray();
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

  static async getlatest() {
    // if (!ObjectId.isValid(userId)) {
    //   throw new Error("Invalid User ID format");
    // }
    // const objectId = new ObjectId(userId);
    return await this.db

      .aggregate([
        {
          $sort: { createdAt: -1 }, 
        },
        {
          $group: {
            _id: "$UserId", 
            latest: { $first: "$$ROOT" },
          },
        },
        {
          $lookup: {
            from: "Users", 
            localField: "_id",
            foreignField: "_id", 
            as: "user", 
          },
        },
        {
          $unwind: "$user", 
        },
        {
          $project: {
            _id: 0,
            user: 1, 
            latest: 1, 
          },
        },
      ])
      .toArray();
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
