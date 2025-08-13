import Title from "@/components/Shared/Title";
import { dummyShowsData } from "@/utils";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import Image from "next/image";
import { StarIcon } from "lucide-react";

const AddShows = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const [NowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return NowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows" />
      <p className="mt-8 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
        Now Playing Movies
      </p>
      <div className="overflow-x-auto pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 ml-[15px]">
          {NowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className="group relative w-[240px] h-[300px] overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
            >
              <div className="w-full h-full relative">
                <Image
                  src={movie.poster_path}
                  alt={movie.title || "movie poster"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Gradient overlay for visual depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
               
               
                  
                    \
                  
               
                {/* Movie details with fade and scale animation */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-gray-900/90 to-gray-800/90 text-sm flex flex-col gap-2 p-4 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-1 text-yellow-300 font-semibold">
                      <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                      {movie.vote_average.toFixed(1)}
                    </p>
                    <p className="text-gray-200 font-medium">
                      {movie.vote_count} votes
                    </p>
                  </div>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default AddShows;
