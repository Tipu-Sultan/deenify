// app/admin/layout.js
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Card className="w-64 p-4">
        <nav className="space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full">Dashboard</Button>
          </Link>
          <Link href="/admin/blogs">
            <Button variant="ghost" className="w-full">Blogs</Button>
          </Link>
        </nav>
      </Card>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}