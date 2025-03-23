'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Clock, Activity } from 'lucide-react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to sign-in if unauthenticated
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const user = session?.user;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Profile
          </h1>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="mb-8 bg-white dark:bg-gray-900 shadow-lg">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.image} alt={user?.name} />
              <AvatarFallback className="text-2xl">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                {user?.name || 'Anonymous'}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user?.email || 'No email provided'}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <User className="w-5 h-5" />
                <span>
                  <strong>ID:</strong> {user?.id || 'N/A'}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Joined via Google authentication
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Activity Section */}
        <Card className="mb-8 bg-white dark:bg-gray-900 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span>Logged in on {new Date().toLocaleDateString()}</span>
              </li>
              {/* Placeholder for more activity */}
              <li className="text-gray-500 dark:text-gray-400 italic">
                More activity tracking coming soon...
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Additional Info Section */}
        <Card className="bg-white dark:bg-gray-900 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
              <User className="w-5 h-5" />
              Additional Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Preferences:</strong> Not set yet
              </p>
              <p>
                <strong>Favorite Surah:</strong> Not set yet
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Customize your profile by adding more details in the future!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}