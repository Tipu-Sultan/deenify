"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"; // Import Avatar components

export default function DesktopNavbar() {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Quran", href: "/quran" },
    { name: "Hadith (soon)", href: "/#" },
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

          {/* Desktop Navigation, Theme Toggle, and Auth Section */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links (Visible only on desktop) */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-foreground/80 hover:text-foreground transition-colors ${
                  pathname === item.href ? "underline underline-offset-4" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}

        
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-3 rounded-md hover:bg-accent transition-all"
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
            

            {/* Authentication Section (Desktop) */}
            {status === "authenticated" && session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-accent"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user.image || "/default-avatar.png"}
                        alt="Profile"
                      />
                      <AvatarFallback>
                        {session.user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
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
            ) : (
              status === "unauthenticated" && (
                <Button variant="outline" className="flex items-center gap-2">
                  <Link href="/login">Login</Link>
                </Button>
              )
            )}
            {session?.user?.isAdmin && (
                <Button variant="outline" className="flex items-center gap-2">
                  <Link href="/admin">Admin</Link>
                </Button>
              )}
          </div>

          {/* Mobile/Tablet Authentication Section (Visible only on mobile/tablet) */}
          <div className="flex md:hidden items-center">
            {status === "authenticated" && session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="p-1 rounded-full hover:bg-accent"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user.image || "/default-avatar.png"}
                        alt="Profile"
                      />
                      <AvatarFallback>
                        {session.user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
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
            ) : (
              status === "unauthenticated" && (
                <Button variant="outline" className="flex items-center gap-2">
                  <Link href="/login">Login</Link>
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}