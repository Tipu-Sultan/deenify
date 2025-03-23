"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Home, Book, Clock, Heart, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export default function MobileNavbar() {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Quran", href: "/quran", icon: <Book className="h-5 w-5" /> },
    { name: "Hadith (soon)", href: "/#" },
    { name: "Prayer Times", href: "/prayer-times", icon: <Clock className="h-5 w-5" /> },
    { name: "Duas", href: "/duas", icon: <Heart className="h-5 w-5" /> },
    { name: "Blogs", href: "/blog" },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* Bottom Navbar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden z-50">
        <div className="flex justify-around items-center h-16">
          <Link href="/" className="p-2">
            <Home className="h-6 w-6 text-foreground/80 hover:text-foreground" />
          </Link>
          <Link href="/quran" className="p-2">
            <Book className="h-6 w-6 text-foreground/80 hover:text-foreground" />
          </Link>
          <Link href="/prayer-times" className="p-2">
            <Clock className="h-6 w-6 text-foreground/80 hover:text-foreground" />
          </Link>
          <Link href="/duas" className="p-2">
            <Heart className="h-6 w-6 text-foreground/80 hover:text-foreground" />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-2">
                <Menu className="h-6 w-6 text-foreground/80 hover:text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Theme Toggle */}
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="block w-full text-left px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {theme === "dark" ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                      Toggle Theme
                    </span>
                  </button>
                )}

                {/* Profile and Sign Out */}
                {status === "authenticated" && session?.user && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-4 py-2">
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
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
}