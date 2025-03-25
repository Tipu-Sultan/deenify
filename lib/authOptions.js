import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/db";
import DeenifyUser from "@/models/DeenifyUser";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import DeenifyBlog from "@/models/DeenifyBlog";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      await connectToDatabase();

      let existingUser = await DeenifyUser.findOne({
        googleId: account.providerAccountId,
      });

      if (!existingUser) {
        // Create a new user if they don't exist
        existingUser = await DeenifyUser.create({
          _id: new mongoose.Types.ObjectId(),
          googleId: account.providerAccountId,
          name: user.name,
          email: user.email,
          picture: user.image,
          isAdmin: false,
          isSuperAdmin: false,
        });

        // Update existing blogs with this googleId to reference the new user _id
        await DeenifyBlog.updateMany(
          { authorGoogleId: account.providerAccountId }, // Match blogs by googleId
          { $set: { author: existingUser._id } } // Set the new _id as author
        );
      }

      return true;
    },
    async jwt({ token, account }) {
      // Always fetch the latest user data, not just on initial login
      await connectToDatabase();
      const dbUser = await DeenifyUser.findOne({ googleId: token.googleId });

      if (dbUser) {
        token.id = dbUser._id;
        token.googleId = dbUser.googleId;
        token.isAdmin = dbUser.isAdmin; // Always update isAdmin
        token.isSuperAdmin = dbUser.isSuperAdmin; // Always update isSuperAdmin
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.picture = dbUser.picture;
      }

      return token;
    },
    async session({ session, token }) {
      // Always fetch the latest user data from MongoDB to ensure isAdmin is updated
      await connectToDatabase();
      const dbUser = await DeenifyUser.findOne({ googleId: token.googleId });

      if (dbUser) {
        session.user.id = dbUser._id;
        session.user.googleId = dbUser.googleId;
        session.user.name = dbUser.name;
        session.user.email = dbUser.email;
        session.user.picture = dbUser.picture;
        session.user.isAdmin = dbUser.isAdmin;
        session.user.isSuperAdmin = dbUser.isSuperAdmin;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
