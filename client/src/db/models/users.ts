import { database } from "../config";

export class Auth{
    static db = database.collection("Users")
}