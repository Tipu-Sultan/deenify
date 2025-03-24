'use server';

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Clock, Activity } from "lucide-react";
import DeenifyUser from "@/models/DeenifyUser";
import { authOptions } from "@/lib/authOptions";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await DeenifyUser.findOne({ _id: session?.user?.id })

  if (!user) {
    return <p className="text-center text-red-500">User not found</p>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <form action="/api/auth/signout" method="POST">
            <Button variant="outline" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </form>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback className="text-2xl">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl font-semibold">
                {user.name || "Anonymous"}
              </CardTitle>
              <p className="text-sm">{user.email || "No email provided"}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>
                  <strong>ID:</strong> {user.id}
                </span>
              </div>
              <p className="text-sm">Joined on {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Last login: {new Date(user.createdAt).toLocaleDateString()}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5" /> Additional Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                <strong>Preferences:</strong> {user.preferences || "Not set yet"}
              </p>
              <p>
                <strong>Favorite Surah:</strong> {user.favoriteSurah || "Not set yet"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
