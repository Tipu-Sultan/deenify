"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, User, Clock, Activity } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Loading state with Skeleton UI
  if (status === "loading") {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-9 w-1/4" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Card className="mb-8 shadow-lg">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
              <Skeleton className="w-24 h-24 rounded-full" />
              <div className="space-y-2 text-center sm:text-left w-full sm:w-auto">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mt-3" />
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mt-3" />
              <Skeleton className="h-4 w-2/3 mt-3" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Redirect to sign-in if unauthenticated
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const user = session?.user;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.image} alt={user?.name} />
              <AvatarFallback className="text-2xl">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl font-semibold">
                {user?.name || "Anonymous"}
              </CardTitle>
              <p className="text-sm">{user?.email || "No email provided"}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>
                  <strong>ID:</strong> {user?.id || "N/A"}
                </span>
              </div>
              <p className="text-sm">
                Joined via Google authentication
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Activity Section */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Logged in on {new Date().toLocaleDateString()}</span>
              </li>
              <li className="italic">
                More activity tracking coming soon...
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Additional Info Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5" />
              Additional Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                <strong>Preferences:</strong> Not set yet
              </p>
              <p>
                <strong>Favorite Surah:</strong> Not set yet
              </p>
              <p className="text-sm">
                Customize your profile by adding more details in the future!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}