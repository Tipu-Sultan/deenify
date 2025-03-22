import { BookOpenCheck, Clock, BookHeart } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <BookOpenCheck className="h-8 w-8" />, 
    title: 'Quran',
    description: 'Read, listen, and understand the Holy Quran with multiple translations',
    href: '/quran',
    image: '/assets/quran.webp'
  },
  {
    icon: <Clock className="h-8 w-8" />, 
    title: 'Prayer Times',
    description: 'Get accurate prayer times based on your location',
    href: '/prayer-times',
    image: '/assets/prayer.webp'
  },
  {
    icon: <BookHeart className="h-8 w-8" />, 
    title: 'Duas',
    description: 'Collection of authentic duas categorized by occasions',
    href: '/duas',
    image: '/assets/dua.webp'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Deenify App</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive companion for Quran, Prayer Times, and Duas and soon Hadith.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="text-center space-y-6">
            <Link 
              href={feature.href} 
              className="group p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-all block"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Link>
            <img 
              src={feature.image} 
              alt={feature.title} 
              className="rounded-lg mx-auto max-w-full w-full object-cover h-[250px]"
            />
          </div>
        ))}
      </section>
    </div>
  );
}