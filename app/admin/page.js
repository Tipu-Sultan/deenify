// app/admin/page.js
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-4">
        <Link href="/admin/blogs">
          <Button>Manage Blogs</Button>
        </Link>
      </div>
    </div>
  );
}