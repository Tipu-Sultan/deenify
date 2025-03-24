import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Manage Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Create, edit, or delete blog posts.</p>
            <Link href="/admin/blogs">
              <Button className="w-full">Go to Blogs</Button>
            </Link>
          </CardContent>
        </Card>
        {/* Add more cards here for future features */}
      </div>
    </div>
  );
}