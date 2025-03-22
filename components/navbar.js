"use client";

import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Quran", href: "/quran" },
    { name: "Hadith (Soon)", href: "/#" },
    { name: "Prayer Times", href: "/prayer-times" },
    { name: "Duas", href: "/duas" },
    { name: "blogs", href: "/blog" },
  ];

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
                      theme === "dark"
                        ? "-rotate-90 scale-0"
                        : "rotate-0 scale-100"
                    }`}
                  />
                  <Moon
                    className={`h-5 w-5 absolute top-0 left-0 transition-transform ${
                      theme === "dark"
                        ? "rotate-0 scale-100"
                        : "rotate-90 scale-0"
                    }`}
                  />
                </span>
              </button>
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
                      theme === "dark"
                        ? "-rotate-90 scale-0"
                        : "rotate-0 scale-100"
                    }`}
                  />
                  <Moon
                    className={`h-5 w-5 absolute top-0 left-0 transition-transform ${
                      theme === "dark"
                        ? "rotate-0 scale-100"
                        : "rotate-90 scale-0"
                    }`}
                  />
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
