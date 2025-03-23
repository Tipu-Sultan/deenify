import { BookOpenCheck, Clock, BookHeart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    icon: <BookOpenCheck className="h-8 w-8" />,
    title: "Quran",
    description: "Read, listen, and understand the Holy Quran with multiple translations",
    href: "/quran",
    image: "/assets/quran.webp",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Prayer Times",
    description: "Get accurate prayer times based on your location",
    href: "/prayer-times",
    image: "/assets/prayer.webp",
  },
  {
    icon: <BookHeart className="h-8 w-8" />,
    title: "Duas",
    description: "Collection of authentic duas categorized by occasions",
    href: "/duas",
    image: "/assets/dua.webp",
  },
];

export default function FeaturesSection() {
  return (
    <section className="grid md:grid-cols-3 gap-8 py-16 px-4 w-full max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center space-y-6"
        >
          <Link
            href={feature.href}
            className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex-grow flex flex-col justify-center"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 rounded-full">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="max-w-xs">{feature.description}</p>
            </div>
          </Link>
          <Image
            src={feature.image}
            alt={feature.title}
            width={400}
            height={250}
            className="rounded-lg mx-auto w-full max-w-[400px] h-[250px] object-cover"
          />
        </div>
      ))}
    </section>
  );
}