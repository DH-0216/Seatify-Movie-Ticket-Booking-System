"use client";
import { dummyDateTimeData, dummyShowsData } from "@/data/index";
import { useParams } from "next/navigation";
import React, { useState, useEffect, use } from "react";
import BlurCircle from "@/components/shared/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

const MoreDetails = () => {
  const { id } = useParams();

  const movie = dummyShowsData.find((movie) => movie._id === id);

  return (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="absolute inset-0 -z-10">
        <Image
          src={movie.backdrop_path}
          alt={movie.title}
          fill
          className="object-cover rounded-2xl opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent rounded-2xl"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-15 maxw-6xl mx-auto">
        <Image
          src={movie.poster_path}
          alt={"Show Image"}
          width={250}
          height={112}
          className="max-md:mx-auto rounded-xl"
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary">ENGLISH</p>
          <h1 className="text-4xl font-semiold max-w-96 text-balance">
            {movie.title}
          </h1>
          <div className="flxe items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary mb-2.5" />
            {movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {movie.overview}
          </p>

          <p>
            {`${movie.runtime} min`} .{" "}
            {movie.genres.map((genre) => genre.name).join(", ")} .{" "}
            {movie.release_date.split("-")[0]}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-4">
            <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
              <PlayCircleIcon className={"w-5 h-5"} />
              Watch Trailer
            </button>
            <a
              href="#dateSelect"
              className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Buy Tickets
            </a>
            <button className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95">
              <Heart className={"w-5 h-5"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;
