"use client"; // Client component for interactivity

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"; // To detect active route
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/blogs", label: "Blogs" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <Card
        className={cn(
          "hidden md:block w-64 p-6 shadow-md",
          "fixed h-full border-r border-gray-200 z-10"
        )}
      >
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href
                    ? ""
                    : "hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </Card>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50 shadow-sm"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-6">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64">
        <div className="max-w-7xl mx-auto rounded-lg shadow-md p-6">
          {children}
        </div>
      </main>
    </div>
  );
}