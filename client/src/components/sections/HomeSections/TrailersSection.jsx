"use client";

import BlurCircle from "@/components/shared/BlurCircle";
import { PlayCircleIcon } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/AppContext";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const SkeletonLoader = ({ children }) => (
  <div className="rounded-lg bg-gray-700 animate-pulse w-full max-md:h-28 md:max-h-28 h-28 flex items-center justify-center text-white text-center p-2">
    {children}
  </div>
);

const TrailersSection = () => {
  const [trailers, setTrailers] = useState([]);
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  const { heroMovies, image_base_url, axios } = useAppContext();

  useEffect(() => {
    if (!heroMovies || heroMovies.length === 0) return;

    const fetchTrailers = async () => {
      try {
        const fetched = await Promise.all(
          heroMovies.map(async (movie) => {
            try {
              const { data } = await axios.get(`/api/show/${movie.id}`);
              if (data.success && data.movie?.trailerUrl) {
                return {
                  id: movie.id,
                  title: data.movie.title || movie.title,
                  image: `${image_base_url}${
                    data.movie.backdrop_path || movie.backdrop_path
                  }`,
                  videoUrl: data.movie.trailerUrl,
                  posterImage: `${image_base_url}${
                    data.movie.poster_path || movie.poster_path
                  }`,
                };
              }
              return null;
            } catch (err) {
              console.log(`Error fetching trailer for ${movie.title}`, err);
              return null;
            }
          })
        );

        const validTrailers = fetched.filter((t) => t !== null);
        setTrailers(validTrailers);
        setCurrentTrailer(validTrailers[0] || null);
      } catch (err) {
        console.log("Error fetching trailers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailers();
  }, [heroMovies, axios, image_base_url]);

  // Determine 4 preview slots
  const previewSlots = [0, 1, 2, 3].map((i) => trailers[i] || null);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20">
      <h2 className="text-gray-300 font-medium text-lg mb-6">Trailers</h2>

      <div className="relative mb-10">
        <BlurCircle top="-100px" right="-100px" />

        <div className="mx-auto w-full max-w-[960px] h-[540px] rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center text-white text-xl">
          {loading ? (
            <span className="animate-pulse">Loading trailer...</span>
          ) : currentTrailer ? (
            <ReactPlayer
              src={currentTrailer.videoUrl}
              controls
              width="100%"
              height="100%"
              className="!rounded-lg"
            />
          ) : (
            <span>No trailers available</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-[960px] mx-auto">
        {previewSlots.map((trailer, idx) =>
          trailer ? (
            <div
              key={trailer.id}
              className="relative cursor-pointer group rounded-lg overflow-hidden w-full max-md:h-28 md:max-h-28 h-28"
              onClick={() => setCurrentTrailer(trailer)}
            >
              <Image
                src={trailer.posterImage}
                alt={trailer.title}
                className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition"
                width={960}
                height={540}
              />
              <PlayCircleIcon className="absolute top-1/2 left-1/2 w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-80" />
            </div>
          ) : (
            <SkeletonLoader key={idx}>No trailer available</SkeletonLoader>
          )
        )}
      </div>
    </div>
  );
};

export default TrailersSection;
