"use client";
import { useRouter } from "next/navigation";
import React from "react";
import MovieCard from "@/components/MovieCard";
import { useAppContext } from "@/context/AppContext";

const YouMayLike = () => {
  const router = useRouter();
  const { shows } = useAppContext();

  return (
    <div className="px-6 md:px-16 lg:px-40 pt-5 md:pt-10">
      <p className="text-lg font-medium mb-8 mt-10">You May Also Like</p>

      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {shows.slice(0, 6).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            router.push("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default YouMayLike;
