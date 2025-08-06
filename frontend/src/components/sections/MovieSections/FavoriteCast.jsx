"use client";
import { dummyDateTimeData, dummyShowsData } from "@/data/index";
import { useParams } from "next/navigation";
import React, { useState, useEffect, use } from "react";
import BlurCircle from "@/components/shared/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

const MovieDetails = () => {
  const { id } = useParams();
  
  const movie = dummyShowsData.find((movie) => movie._id === id);

  return (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">

      <p className="text-lg font-medium mt-20">Your Favorite Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {movie.casts.slice(0, 12).map((cast,index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Image
                src={cast.profile_path}
                alt={"Profile Image"}
                width={90}
                height={10}
                className="rounded-full aspect-square object-cover"
              />
              <p className="font-medium text-xs mt-3">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default MovieDetails;
