"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DesktopNavbar() {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Quran", href: "/quran" },
    { name: "Hadith", href: "/hadith" },
    { name: "Prayer Times", href: "/prayer-times" },
    { name: "Duas", href: "/duas" },
    { name: "Blogs", href: "/blog" },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Branding (Visible on all screens) */}
          <Link href="/" className="text-xl font-bold flex flex-col items-start">
            Deenify.com
            <span className="text-xs text-muted-foreground">Developed by: Tipu Sultan</span>
          </Link>

          {/* Navigation, Theme Toggle, and Profile (Hidden on mobile/tablet, visible on desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-md hover:bg-accent transition-all"
                aria-label="Toggle theme"
              >
                <span className="relative">
                  <Sun
                    className={`h-5 w-5 transition-transform ${
                      theme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100"
                    }`}
                  />
                  <Moon
                    className={`h-5 w-5 absolute top-0 left-0 transition-transform ${
                      theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
                    }`}
                  />
                </span>
              </button>
            )}

            {/* Profile Dropdown */}
            {status === "authenticated" && session?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-accent"
                  >
                    <Image
                      src={session.user.image || "/default-avatar.png"}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-foreground/80">{session.user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex flex-col">
                    <span>{session.user.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {session.user.email}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}