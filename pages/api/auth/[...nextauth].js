import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../utils/db";
import { verifyPassword } from "../../../utils/auth";
import User from "../../../models/User";
import jwt from "next-auth/jwt";

require("dotenv").config();

const secret = "veryveryverysecret";

const options = {
  seesion: {
    jwt: true,
  },
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Credentials({
      async authorize(credentials) {
        console.log("credentials", credentials);
        const client = connectToDatabase();
        const user = await User.findOne({ email: credentials.email });
        console.log("user", user);
        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Could not log you in.");
        }

        return { email: user.email };
      },
    }),
  ],
};

export default NextAuth(options);
