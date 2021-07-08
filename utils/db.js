import mongoose from "mongoose";
import { MongoClient } from "mongodb";
require("dotenv").config();

const dbUrl = process.env.MONGODB_ATLAS;

console.log(dbUrl);

export async function connectToDatabase() {
    const client = await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return;
}