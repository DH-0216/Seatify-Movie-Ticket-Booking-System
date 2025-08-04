import FeaturedSection from "@/components/sections/HomeSections/FeaturedSection";
import HeroSection from "@/components/sections/HomeSections/HeroSection";
import TrailersSection from "@/components/sections/HomeSections/TrailersSection";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <TrailersSection />
    </div>
  );
};

export default HomePage;
