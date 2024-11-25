import { database } from "../config";

export class Saving{
    static db = database.collection("Savings")
}