import { DateFilter } from "@/type";
import { database } from "../config";
import { ObjectId } from "mongodb";

export class Saving {
  static db = database.collection("Savings");

  static async getDataFilter(
    userId: string,
    page: number = 1,
    limit: number = 5,
    dateFilter: DateFilter
  ) {
    if (!ObjectId.isValid(userId)) {
      throw new Error("Invalid User ID format");
    }
    const objectId = new ObjectId(userId);
    // console.log(objectId);
    const query = { UserId: objectId, ...dateFilter };
    const skip = (page - 1) * limit;

    const savings = await this.db
      .find(query)
      .sort("createdAt", -1)
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalCount = await this.db.countDocuments(query);

    return {
      savings,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
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

  static async getData(UserId:string){
    const data = await this.db.find({UserId:new ObjectId(UserId)}).toArray()
    // console.log("🚀 ~ Saving ~ getData ~ data:", data)

    return data
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
