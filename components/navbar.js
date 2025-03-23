"use client";

import { Moon, Sun, Menu } from "lucide-react";
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

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          <Link href="/" className="text-xl font-bold flex flex-col items-start">
            Deenify.com
            <span className="text-xs text-muted-foreground">Developed by: Tipu Sultan</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop menu */}
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

            {/* Theme Toggle Button (Only Render After Mounting) */}
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

            {/* Profile Dropdown (Only if Authenticated) */}
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
                    <span className="hidden md:inline text-foreground/80">
                      {session.user.name}
                    </span>
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Theme Toggle Button (Mobile) */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="block px-4 py-2 rounded-md hover:bg-accent transition-all"
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

            {/* Profile Options (Mobile) */}
            {status === "authenticated" && session?.user && (
              <div className="space-y-2 px-4">
                <div className="flex items-center gap-2 py-2">
                  <Image
                    src={session.user.image || "/default-avatar.png"}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-foreground/80">{session.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}