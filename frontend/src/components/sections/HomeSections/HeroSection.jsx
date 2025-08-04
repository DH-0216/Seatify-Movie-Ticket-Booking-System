"use client";
import Image from "next/image";
import {
  ArrowRight,
  Calendar1Icon,
  ClockIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { dummyShowsData } from "@/data/index";
import { motion, AnimatePresence } from "framer-motion";
import {
  backgroundVariants,
  contentVariants,
  itemVariants,
  buttonVariants,
} from "@/lib/motion";
import timeFormat from "@/lib/timeFormat";

const HeroSection = () => {
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
          Math.min(
            dummyShowsData.length - PREVIEWS_PER_VIEW,
            currentMovieIndex - 2
          )
        );
      }
    }
  };

  const handleNextMovie = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMovieIndex((prev) => (prev + 1) % dummyShowsData.length);
      setIsTransitioning(false);
    }, 100);
  };

  const handlePrevMovie = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMovieIndex(
        (prev) => (prev - 1 + dummyShowsData.length) % dummyShowsData.length
      );
      setIsTransitioning(false);
    }, 100);
  };

  const handleMovieSelect = (index) => {
    if (isTransitioning || index === currentMovieIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMovieIndex(index);
      setIsTransitioning(false);
    }, 100);
  };

  const handlePreviewNext = () => {
    if (previewStartIndex + PREVIEWS_PER_VIEW < dummyShowsData.length) {
      setPreviewStartIndex(previewStartIndex + 1);
    }
  };

  const handlePreviewPrev = () => {
    if (previewStartIndex > 0) {
      setPreviewStartIndex(previewStartIndex - 1);
    }
  };

  const currentMovie = dummyShowsData[currentMovieIndex];
  const visiblePreviews = dummyShowsData.slice(
    previewStartIndex,
    previewStartIndex + PREVIEWS_PER_VIEW
  );
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background image layer with smooth transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovieIndex}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${
              typeof currentMovie.backdrop_path === "string"
                ? currentMovie.backdrop_path
                : currentMovie.backdrop_path?.src
            })`,
            transformOrigin: "bottom right",
          }}
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      </AnimatePresence>

      {/* Overlay for brightness control */}
      <motion.div
        className="absolute inset-0 bg-black z-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      {/* Main content layer */}
      <div className="relative z-10 flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 h-full">
        {/* Navigation buttons with hover animations */}
        <motion.button
          onClick={handlePrevMovie}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 rounded-full p-2 transition-all duration-200"
          disabled={isTransitioning}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>

        <motion.button
          onClick={handleNextMovie}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 rounded-full p-2 transition-all duration-200"
          disabled={isTransitioning}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>

        {/* Animated content with stagger effect */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovieIndex}
            className="mt-20 max-w-[75%]"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.h1
              className="text-5xl md:text-[70px] md:leading-[80px] font-semibold max-w-4xl text-white mt-5"
              variants={itemVariants}
            >
              {currentMovie.title}
            </motion.h1>

            {currentMovie.subtitle && (
              <motion.h2
                className="text-2xl md:text-4xl lg:text-5xl font-medium leading-snug max-w-3xl text-white/70 mt-3"
                variants={itemVariants}
              >
                {currentMovie.subtitle}
              </motion.h2>
            )}

            <motion.div
              className="flex items-center gap-4 text-gray-300 mt-5"
              variants={itemVariants}
            >
              <span>
                {currentMovie.genres
                  .slice(0, 3)
                  .map((genre) => genre.name)
                  .join(" | ")}{" "}
              </span>
              <div className="flex items-center gap-1">
                <Calendar1Icon className="w-4 h-4" />{" "}
                {new Date(currentMovie.release_date).getFullYear()}
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                {timeFormat(currentMovie.runtime)}
              </div>
            </motion.div>

            <motion.p
              className="max-w-md text-gray-300 mt-5"
              variants={itemVariants}
            >
              {currentMovie.overview}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <motion.button
          onClick={() => router.push("/Movies")}
          className="flex items-center gap-2 px-6 py-3 my-6 mt-10 text-sm bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition-colors rounded-full font-medium cursor-pointer text-white"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
        >
          Explore Movies
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* Circle indicators with smooth animations */}
        <div className="absolute bottom-[15px] left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {dummyShowsData.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleMovieSelect(index)}
              className={`w-[8px] h-[8px] rounded-full transition-all duration-200 ${
                index === currentMovieIndex
                  ? "bg-[var(--color-primary)]"
                  : "bg-white bg-opacity-50 hover:bg-opacity-80"
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              animate={{
                scale: index === currentMovieIndex ? 1.2 : 1,
                opacity: index === currentMovieIndex ? 1 : 0.7,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          ))}
        </div>
      </div>

      {/* Previews section with enhanced animations */}
      <motion.div
        className="absolute bottom-0 right-10 p-6 z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            onClick={handlePreviewPrev}
            disabled={previewStartIndex === 0}
            className={`p-1 rounded-full transition-all duration-200 ${
              previewStartIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "bg-black bg-opacity-50 hover:bg-opacity-70"
            }`}
            whileHover={previewStartIndex !== 0 ? { scale: 1.1 } : {}}
            whileTap={previewStartIndex !== 0 ? { scale: 0.9 } : {}}
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </motion.button>

          <div className="flex gap-3">
            {visiblePreviews.map((dummyShowsData, index) => {
              const actualIndex = previewStartIndex + index;
              return (
                <motion.button
                  key={actualIndex}
                  onClick={() => handleMovieSelect(actualIndex)}
                  className="flex-shrink-0 relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: actualIndex === currentMovieIndex ? 1.15 : 1,
                    y: actualIndex === currentMovieIndex ? -5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="w-20 h-28 md:w-24 md:h-32 rounded-lg overflow-hidden">
                    <Image
                      src={dummyShowsData.poster_path}
                      alt={dummyShowsData.title || "Show Image"}
                      width={80}
                      height={112}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                  </div>

                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {dummyShowsData.title}
                  </motion.div>

                  {actualIndex === currentMovieIndex && (
                    <motion.div
                      className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[var(--color-primary)] rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          <motion.button
            onClick={handlePreviewNext}
            disabled={
              previewStartIndex + PREVIEWS_PER_VIEW >= dummyShowsData.length
            }
            className={`p-1 rounded-full transition-all duration-200 ${
              previewStartIndex + PREVIEWS_PER_VIEW >= dummyShowsData.length
                ? "opacity-30 cursor-not-allowed"
                : "bg-black bg-opacity-50 hover:bg-opacity-70"
            }`}
            whileHover={
              previewStartIndex + PREVIEWS_PER_VIEW < dummyShowsData.length
                ? { scale: 1.1 }
                : {}
            }
            whileTap={
              previewStartIndex + PREVIEWS_PER_VIEW < dummyShowsData.length
                ? { scale: 0.9 }
                : {}
            }
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
