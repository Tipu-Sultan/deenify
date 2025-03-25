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
        existingUser = await DeenifyUser.create({
          _id: new mongoose.Types.ObjectId(),
          googleId: account.providerAccountId,
          name: user.name,
          email: user.email,
          picture: user.image,
          isAdmin: false,
          isSuperAdmin: false,
        });

        await DeenifyBlog.updateMany(
          { authorGoogleId: account.providerAccountId },
          { $set: { author: existingUser._id } }
        );
      }

      return true;
    },
    async jwt({ token, user, account }) {
      
      if (account?.provider === "google") {
        let dbUser = await DeenifyUser.findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser._id;
          token.googleId = token.sub;
          token.isAdmin = dbUser.isAdmin;
          token.isSuperAdmin = dbUser.isSuperAdmin;
        }
      }
      return token;
    },
    async session({ session, token }) {
      await connectToDatabase();
      
      // Fetch the latest user data from the database
      const dbUser = await DeenifyUser.findById(token.id);
      if (dbUser) {
        session.user.id = dbUser._id;
        session.user.googleId = dbUser.googleId;
        session.user.isAdmin = dbUser.isAdmin;
        session.user.isSuperAdmin = dbUser.isSuperAdmin;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
