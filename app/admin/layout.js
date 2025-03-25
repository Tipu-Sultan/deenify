"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const baseNavItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/blogs", label: "Blogs" },
  ];

  const navItems = session?.user?.isSuperAdmin
    ? [...baseNavItems, { href: "/admin/users", label: "Users" }]
    : baseNavItems;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar (Desktop) */}
      <Card
        className={cn(
          "hidden md:block w-full md:w-64 lg:w-72 p-4 md:p-6 shadow-md",
          "fixed top-16 h-[calc(100vh-4rem)] border-r border-gray-200 z-10" // Adjust for fixed navbar
        )}
      >
        <div className="flex items-center mb-6">
          <h2 className="text-lg md:text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-sm md:text-base py-2 px-3",
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
            className="md:hidden fixed top-20 left-4 z-50 shadow-sm rounded-full w-10 h-10"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4 pt-16">
          <div className="flex items-center mb-6">
            <h2 className="text-lg font-bold">Admin Panel</h2>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-sm py-2 px-3",
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
      <main className="flex-1 p-4 sm:p-6 md:ml-64 lg:ml-72 mt-16 md:mt-0">
        <div className="max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto rounded-lg shadow-md p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}