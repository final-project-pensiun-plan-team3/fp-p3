import { database } from "../config";

import { indonesianDate } from "@/helpers/IndonesianDate";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export class Auth {
  static db = database.collection("Users");

  static async create(email: string, name: string) {
    const data = {
      email,
      username: name,
      createdAt: indonesianDate(),
      updatedAt: indonesianDate(),
    };
    const emailExist = await this.db.findOne({ email });
    if (!emailExist) {
      await this.db.insertOne(data);
    }
    const user = await this.db.findOne({ email });
    const UserId = { UserId: user?._id };
    const accessToken = jwt.sign(UserId, process.env.JWT_SECRET as string);
    cookies().set("Authorization", accessToken);
    return accessToken
  }
}
