"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sliderImages = [
  {
    src: "/assets/kaba.jpg",
    alt: "Reading Quran",
    caption: "Deepen Your Connection with the Quran",
  },
  {
    src: "/assets/women-in-desert.jpg",
    alt: "Prayer Time",
    caption: "Stay Connected with Accurate Prayer Times",
  },
  {
    src: "/assets/quraan1.jpg",
    alt: "Making Dua",
    caption: "Find Peace with Authentic Duas",
  },
];

export default function SliderSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  return (
    <section className=" h-[80vh] flex items-center justify-center overflow-hidden w-full">
      {/* Slider Images */}
      <div className="absolute inset-0 -z-10">
        {sliderImages.map((slide, index) => (
          <Image
            key={index}
            src={slide.src}
            alt={slide.alt}
            fill
            className={cn(
              "object-cover transition-opacity duration-1000",
              index === currentSlide ? "" : "hidden"
            )}
            priority={index === 0}
          />
        ))}
      </div>

      {/* Slider Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl text-white md:text-6xl font-bold mb-4 drop-shadow-lg">
          Welcome to Deenify
        </h1>
        <p className="text-lg text-white md:text-2xl mb-6 drop-shadow-lg max-w-2xl mx-auto">
          {sliderImages[currentSlide].caption}
        </p>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 w-2 rounded-full",
              currentSlide === index ? "scale-125" : ""
            )}
          />
        ))}
      </div>
    </section>
  );
}