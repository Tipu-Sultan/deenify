import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/db";
import DeenifyUser from "@/models/DeenifyUser";
import mongoose from "mongoose";

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
        });
      }

      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        await connectToDatabase();
        const dbUser = await DeenifyUser.findOne({ googleId: account.providerAccountId });

        if (dbUser) {
          token.id = dbUser._id;
          token.googleId = dbUser.googleId;
          token.isAdmin = dbUser.isAdmin;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.picture = dbUser.picture;
        }
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
      }

      return session;
    },
  },
};
