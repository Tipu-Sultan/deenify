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
    async jwt({ token, account, trigger, session }) {
      // Initial sign in
      if (account?.provider === "google") {
        try {
          await connectToDatabase();
          const dbUser = await DeenifyUser.findOne({ googleId: account.providerAccountId });
          
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.googleId = dbUser.googleId;
            token.isAdmin = dbUser.isAdmin;
            token.isSuperAdmin = dbUser.isSuperAdmin;
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }
      
      // Update token from client (e.g., when roles change)
      if (trigger === "update" && session?.user) {
        token.isAdmin = session.user.isAdmin;
        token.isSuperAdmin = session.user.isSuperAdmin;
      }
      
      return token;
    },
    async session({ session, token }) {
      // Only include what's needed in the session
      if (token.id) {
        session.user.id = token.id;
        session.user.googleId = token.googleId;
        session.user.isAdmin = token.isAdmin;
        session.user.isSuperAdmin = token.isSuperAdmin;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
