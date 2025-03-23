import SliderSection from "@/components/home/SliderSection"; // Client component
import FeaturesSection from "@/components/home/FeaturesSection"; // Server component

export default function Home() {
  return (
    <div className="min-h-screen">
      <SliderSection />
      <FeaturesSection />
    </div>
  );
}