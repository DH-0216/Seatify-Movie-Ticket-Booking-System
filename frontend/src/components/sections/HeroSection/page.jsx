"use client";
import Image from "next/image";
import { assets } from "@/assets/assets";
import {
  ArrowRight,
  Calendar1Icon,
  ClockIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { moviesData } from "@/data/index";

const Hero = () => {
  const router = useRouter();
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextMovie();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentMovieIndex]);

  const handleNextMovie = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMovieIndex((prev) => (prev + 1) % moviesData.length);
      setIsTransitioning(false);
    }, 150);
  };

  const handlePrevMovie = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMovieIndex(
        (prev) => (prev - 1 + moviesData.length) % moviesData.length
      );
      setIsTransitioning(false);
    }, 150);
  };

  const handleMovieSelect = (index) => {
    if (isTransitioning || index === currentMovieIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMovieIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  const currentMovie = moviesData[currentMovieIndex];

  return (
    <div className="relative">
      <div
        className="flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen relative overflow-hidden"
        style={{
          backgroundImage: `url(${currentMovie.heroImage.src})`,
        }}
      >
        <button
          onClick={handlePrevMovie}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-all duration-200"
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={handleNextMovie}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-all duration-200"
          disabled={isTransitioning}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div
          className={`relative z-10 transition-all duration-300 ${
            isTransitioning
              ? "opacity-0 transform translate-y-4"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          <Image
            src={currentMovie.logo}
            alt="Marvel Logo"
            className="max-h-11 lg:h-11 mt-20"
          />

          <h1 className="text-5xl md:text-[70px] md:leading-[80px] font-semibold max-w-4xl text-white mt-4">
            {currentMovie.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-300 mt-4">
            <span>{currentMovie.genre}</span>
            <div className="flex items-center gap-1">
              <Calendar1Icon className="w-4 h-4" /> {currentMovie.year}
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" /> {currentMovie.duration}
            </div>
          </div>

          <p className="max-w-md text-gray-300 mt-4">
            {currentMovie.description}
          </p>

          <button
            onClick={() => router.push("/movies")}
            className="flex items-center gap-2 px-6 py-3 my-6 text-sm bg-red-600 hover:bg-red-700 transition-colors rounded-full font-medium cursor-pointer text-white"
          >
            Explore Movies
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Selection circles moved further down */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {moviesData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleMovieSelect(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentMovieIndex
                  ? "bg-red-600"
                  : "bg-white bg-opacity-50 hover:bg-opacity-80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Preview section moved to bottom right */}
      <div className="absolute bottom-0 right-10 p-6">
        <div className="flex gap-5">
          {moviesData.map((movie, index) => (
            <button
              key={index}
              onClick={() => handleMovieSelect(index)}
              className={`flex-shrink-0 relative group transition-all duration-300 ${
                index === currentMovieIndex
                  ? "scale-110"
                  : "scale-100 hover:scale-105"
              }`}
            >
              <div className="w-20 h-28 md:w-24 md:h-32 rounded-lg overflow-hidden">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  width={96}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {movie.title}
              </div>

              {index === currentMovieIndex && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
