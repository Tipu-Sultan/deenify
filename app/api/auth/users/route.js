import { NextResponse } from "next/server";
import DeenifyUser from "@/models/DeenifyUser";
import connectToDatabase from "@/lib/db";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function GET(req) {
    try {
      // Connect to the database
      await connectToDatabase();
  
      // Get the session
      const session = await getServerSession(authOptions);
  
      if (!session || !session.user?.isSuperAdmin) {
        return NextResponse.json(
          { error: "Forbidden: Super Admin access required" },
          { status: 403 }
        );
      }
  
      // Fetch all users
      const users = await DeenifyUser.find(
        {},
        "googleId name email isAdmin isSuperAdmin" // Select only necessary fields
      ).lean();
  
      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }