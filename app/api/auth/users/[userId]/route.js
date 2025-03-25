import { NextResponse } from "next/server";
import DeenifyUser from "@/models/DeenifyUser";
import connectToDatabase from "@/lib/db";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function PATCH(req,{ params }) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.isSuperAdmin) {
      return NextResponse.json(
        { error: "Forbidden: Super Admin access required" },
        { status: 403 }
      );
    }

    const { userId } = await params;
    const { isAdmin, isSuperAdmin } = await req.json();

    // Validate input (at least one field must be provided)
    if (isAdmin === undefined && isSuperAdmin === undefined) {
      return NextResponse.json(
        { error: "Invalid input: Provide isAdmin or isSuperAdmin" },
        { status: 400 }
      );
    }

    const user = await DeenifyUser.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update fields if provided
    if (typeof isAdmin === "boolean") user.isAdmin = isAdmin;
    if (typeof isSuperAdmin === "boolean") user.isSuperAdmin = isSuperAdmin;

    await user.save();

    return NextResponse.json(
      { message: "User updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req,{params}) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.isSuperAdmin) {
      return NextResponse.json(
        { error: "Forbidden: Super Admin access required" },
        { status: 403 }
      );
    }

    const { userId } = await params;

    const user = await DeenifyUser.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.isSuperAdmin) {
      return NextResponse.json(
        { error: "Cannot delete a super admin" },
        { status: 403 }
      );
    }

    await DeenifyUser.deleteOne({ _id: userId });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
