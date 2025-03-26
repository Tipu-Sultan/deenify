"use client"; // Mark as client component due to interactivity and Link usage

import {
  BookOpenCheck,
  Clock,
  BookHeart,
  Star,
  ArrowRight,
  Menu,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

  const features = [
    {
      icon: <BookOpenCheck className="h-8 w-8" />,
      title: "Quran",
      description:
        "Read, listen, and understand the Holy Quran with multiple translations.",
      href: "/quran",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Hadith",
      description: "Find possible hadiths and search option",
      href: "/hadith",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Prayer Times",
      description: "Get accurate prayer times based on your location.",
      href: "/prayer-times",
    },
    {
      icon: <BookHeart className="h-8 w-8" />,
      title: "Duas",
      description: "Collection of authentic duas categorized by occasions.",
      href: "/duas",
    },
  ];

  const testimonials = [
    {
      name: "Aisha M.",
      text: "This app has transformed my daily Quran reading. The translations are so helpful!",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Yusuf K.",
      text: "Accurate prayer times and a beautiful interface. Highly recommend!",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ];

  const galleryItems = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1723629646038-edef7785e080?q=80&w=1968&auto=format&fit=crop",
      title: "Life of Umar ibn al-Khattab",
      description:
        "Discover the legacy of the second Caliph, known for his justice and leadership.",
      href: "/blog/islamic-history-and-biographies/life-of-umar-ibn-al-khattab",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1698238183569-fa3c44b39b95?q=80&w=2070&auto=format&fit=crop",
      title: "Battle of Badr",
      description:
        "Explore the first major victory in Islamic history against overwhelming odds.",
      href: "/blog/islamic-history-and-biographies/battle-of-badr",
    },

    {
      image:
        "https://plus.unsplash.com/premium_photo-1677966720030-399f7d415410?q=80&w=1974&auto=format&fit=crop",
      title: "Aisha bint Abi Bakr",
      description:
        "Learn about the Mother of the Believers and her contributions to Islam.",
      href: "/blog/islamic-history-and-biographies/aisha-bint-abi-bakr",
    },
    {
      image:
        "https://images.unsplash.com/photo-1580418827543-11b2fbbe6c94?q=80&w=2070&auto=format&fit=crop",
      title: "The Kaaba",
      description:
        "A look into the history and significance of the sacred House of Allah.",
      href: "/blog/islamic-spirituality-and-self-improvement/the-kaaba",
    },
    {
      image:
        "https://images.unsplash.com/photo-1726031004139-dfe5afddf6b9?q=80&w=2111&auto=format&fit=crop",
      title: "Ali ibn Abi Talib",
      description:
        "The story of the fourth Caliph and his valor in early Islam.",
      href: "/blog/islamic-history-and-biographies/ali-ibn-abi-talib",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center relative overflow-hidden">
        {/* Sticker 1 - Top Left */}
        <div className="absolute left-4 top-10 transform -rotate-6 hidden md:block">
          <div className="bg-yellow-200 text-yellow-900 px-4 py-2 rounded-lg shadow-md text-lg font-semibold whitespace-nowrap">
            "Bismillah"
          </div>
        </div>

        {/* Sticker 2 - Left Middle */}
        <div className="absolute left-2 top-1/3 transform -translate-y-1/2 -rotate-12 hidden md:block">
          <div className="bg-orange-200 text-orange-900 px-4 py-2 rounded-lg shadow-md text-lg font-semibold whitespace-nowrap">
            "As-Salamu Alaikum"
          </div>
        </div>

        {/* Sticker 3 - Right Middle */}
        <div className="absolute right-2 top-2/3 transform -translate-y-1/2 rotate-12 hidden md:block">
          <div className="bg-red-200 text-red-900 px-4 py-2 rounded-lg shadow-md text-lg font-semibold whitespace-nowrap">
            "Allahu Akbar"
          </div>
        </div>

        {/* Sticker 4 - Top Right */}
        <div className="absolute right-4 top-16 transform rotate-6 hidden md:block">
          <div className="bg-yellow-300 text-yellow-800 px-4 py-2 rounded-lg shadow-md text-lg font-semibold whitespace-nowrap">
            "SubhanAllah"
          </div>
        </div>

        {/* Sticker 5 - Bottom Left */}
        <div className="absolute left-6 bottom-12 transform -rotate-8 hidden md:block">
          <div className="bg-orange-300 text-orange-800 px-4 py-2 rounded-lg shadow-md text-lg font-semibold whitespace-nowrap">
            "InshaAllah"
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
            Welcome to Deenify
          </h1>
          <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Your Islamic Companion
          </h4>
          <p className="text-lg md:text-xl mb-8">
            A comprehensive app for Quran, Prayer Times, Duas, and spiritual
            growth.
          </p>
          <Button
            asChild
            size="lg"
            className="group bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow-lg shadow-yellow-500/50 hover:shadow-xl hover:shadow-orange-500/60 transition-all duration-300"
          >
            <Link href="/quran">
              Explore Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Image */}
        <div className="mt-12 max-w-6xl mx-auto shadow-lg shadow-yellow-500/50 relative z-10">
          <img
            src="https://plus.unsplash.com/premium_photo-1661955588369-b0d28de38b45?q=80&w=2071&auto=format&fit=crop"
            alt="Mosque at sunset"
            className="rounded-lg mx-auto max-w-full w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover shadow-lg"
          />
        </div>

        {/* Mobile Sticker Text */}
        <div className="mt-8 flex flex-col items-center gap-4 md:hidden">
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg shadow-md text-base font-semibold">
            "Peace be upon you"
          </div>
          <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg shadow-md text-base font-semibold">
            "Allahu Akbar"
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py- md:py-24 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Discover Our Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="group relative p-6 rounded-xl bg-white shadow-lg shadow-yellow-500/50 hover:shadow-xl hover:shadow-orange-500/60 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="relative flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 group-hover:scale-110 transition-all duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-800 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Explore Islamic Heritage
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="rounded-xl shadow-lg shadow-yellow-500/50 hover:shadow-xl hover:shadow-orange-500/60 transition-all duration-300 bg-white overflow-hidden"
              style={{
                height: index % 4 === 0 || index % 3 === 2 ? "450px" : "350px", // Controlled zigzag heights
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-2/3 object-cover"
              />
              <div className="p-4 flex flex-col h-1/3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-1 line-clamp-2">
                  {item.description}
                </p>
                <Button
                  variant="link"
                  asChild
                  className="mt-auto p-0 text-indigo-600 hover:text-indigo-800"
                >
                  <Link href={item.href}>Learn More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
