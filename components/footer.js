"use client";

import Link from "next/link";

export default function Footer() {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Quran", href: "/quran" },
    { name: "Prayer Times", href: "/prayer-times" },
    { name: "Duas", href: "/duas" },
  ];

  return (
    <footer className="bg-background border-t mt-10 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Branding */}
          <Link href="/" className="text-xl font-bold flex flex-col items-start">
            Deenify.com
            <span className="text-xs text-muted-foreground">Developed by: Tipu Sultan</span>
          </Link>



          {/* Navigation Links */}
          <div className="flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Deenify.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
