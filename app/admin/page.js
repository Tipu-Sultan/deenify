import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-semibold">Manage Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base">
              Create, edit, or delete blog posts.
            </p>
            <Link href="/admin/blogs">
              <Button className="w-full text-sm sm:text-base py-2">Go to Blogs</Button>
            </Link>
          </CardContent>
        </Card>
        {/* Add more cards here for future features */}
      </div>
    </div>
  );
}