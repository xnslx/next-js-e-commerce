import mongoose from "mongoose";
import { MongoClient } from "mongodb";
require("dotenv").config();

const dbUrl = process.env.MONGODB_ATLAS;

console.log(dbUrl);

export async function connectToDatabase() {
    // try {
    //     const client = await mongoose.connect(dbUrl, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     });
    //     console.log("connect to the database");
    // } catch (err) {
    //     console.log(err);
    // }
    const client = await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return;
}