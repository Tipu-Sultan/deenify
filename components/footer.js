"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Optional: for active link highlighting

export default function Footer() {
  const pathname = usePathname(); // Optional: for active link highlighting

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Quran", href: "/quran" },
    { name: "Prayer Times", href: "/prayer-times" },
    { name: "Duas", href: "/duas" },
  ];

  return (
    <footer className="border-t mt-10 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Branding */}
          <Link href="/" className="text-xl font-bold flex flex-col items-start">
            Deenify.com
            <span className="text-xs">Developed by: Tipu Sultan</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:underline transition-colors ${
                  pathname === item.href ? "underline underline-offset-4" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm">
            © {new Date().getFullYear()} Deenify.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}