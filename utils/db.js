import mongoose from "mongoose";
require("dotenv").config();

const dbUrl = process.env.MONGODB_ATLAS;

console.log(dbUrl);

export async function connectToDatabase() {
    try {
        const client = await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connect to the database");
    } catch (err) {
        console.log(err);
    }
}