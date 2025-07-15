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
  const [previewStartIndex, setPreviewStartIndex] = useState(0);

  const PREVIEWS_PER_VIEW = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextMovie();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentMovieIndex]);

  // Update preview window when current movie changes
  useEffect(() => {
    updatePreviewWindow();
  }, [currentMovieIndex]);

  const updatePreviewWindow = () => {
    const currentInView =
      currentMovieIndex >= previewStartIndex &&
      currentMovieIndex < previewStartIndex + PREVIEWS_PER_VIEW;

    if (!currentInView) {
      // Calculate the best starting index to show the current movie
      if (currentMovieIndex < previewStartIndex) {
        setPreviewStartIndex(Math.max(0, currentMovieIndex - 2));
      } else {
        setPreviewStartIndex(
          Math.min(moviesData.length - PREVIEWS_PER_VIEW, currentMovieIndex - 2)
        );
      }
    }
  };

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

  const handlePreviewNext = () => {
    if (previewStartIndex + PREVIEWS_PER_VIEW < moviesData.length) {
      setPreviewStartIndex(previewStartIndex + 1);
    }
  };

  const handlePreviewPrev = () => {
    if (previewStartIndex > 0) {
      setPreviewStartIndex(previewStartIndex - 1);
    }
  };

  const currentMovie = moviesData[currentMovieIndex];
  const visiblePreviews = moviesData.slice(
    previewStartIndex,
    previewStartIndex + PREVIEWS_PER_VIEW
  );

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background image layer with brightness */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${currentMovie.image.src})`,
          filter: "brightness(0.75)",
        }}
      ></div>

      {/* Main content layer */}
      <div className="relative z-10 flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 h-full ">
        {/* Navigation buttons */}
        <button
          onClick={handlePrevMovie}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-all duration-200"
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={handleNextMovie}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-all duration-200"
          disabled={isTransitioning}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Animated content */}
        <div
          className={`transition-all duration-300 mt-20 max-w-[75%] ${
            isTransitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <h1 className="text-5xl md:text-[70px] md:leading-[80px] font-semibold max-w-4xl text-white mt-5">
            {currentMovie.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-300 mt-5">
            <span>{currentMovie.genre}</span>
            <div className="flex items-center gap-1">
              <Calendar1Icon className="w-4 h-4" /> {currentMovie.year}
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" /> {currentMovie.duration}
            </div>
          </div>

          <p className="max-w-md text-gray-300 mt-5">
            {currentMovie.description}
          </p>

          <button
            onClick={() => router.push("/movies")}
            className="flex items-center gap-2 px-6 py-3 my-6 mt-10 text-sm bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition-colors rounded-full font-medium cursor-pointer text-white"
          >
            Explore Movies
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Circle indicators */}
        <div className="absolute bottom-[15px] left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {moviesData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleMovieSelect(index)}
              className={`w-[8px] h-[8px] rounded-full transition-all duration-200 ${
                index === currentMovieIndex
                  ? "bg-[var(--color-primary)]"
                  : "bg-white bg-opacity-50 hover:bg-opacity-80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Previews section (unchanged) */}
      <div className="absolute bottom-0 right-10 p-6 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePreviewPrev}
            disabled={previewStartIndex === 0}
            className={`p-1 rounded-full transition-all duration-200 ${
              previewStartIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "bg-black bg-opacity-50 hover:bg-opacity-70"
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>

          <div className="flex gap-3">
            {visiblePreviews.map((movie, index) => {
              const actualIndex = previewStartIndex + index;
              return (
                <button
                  key={actualIndex}
                  onClick={() => handleMovieSelect(actualIndex)}
                  className={`flex-shrink-0 relative group transition-all duration-300 ${
                    actualIndex === currentMovieIndex
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
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                  </div>

                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {movie.title}
                  </div>

                  {actualIndex === currentMovieIndex && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={handlePreviewNext}
            disabled={
              previewStartIndex + PREVIEWS_PER_VIEW >= moviesData.length
            }
            className={`p-1 rounded-full transition-all duration-200 ${
              previewStartIndex + PREVIEWS_PER_VIEW >= moviesData.length
                ? "opacity-30 cursor-not-allowed"
                : "bg-black bg-opacity-50 hover:bg-opacity-70"
            }`}
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
