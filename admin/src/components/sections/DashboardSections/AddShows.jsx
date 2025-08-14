import Title from "@/components/Shared/Title";
import { dummyShowsData } from "@/utils";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import Image from "next/image";
import { CheckIcon, StarIcon } from "lucide-react";
import { Kconverter } from "@/components/Shared/Kconverter";
import { format } from "date-fns";

const dateFormat = (date) => {
  if (!date) return "Unknown date"; // handle null/undefined
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) return "Invalid date"; // handle invalid formats
  return format(parsedDate, "dd MMMM yyyy");
};
  

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 ml-15">
          {NowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className="group relative w-[240px] h-[300px] overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
              onClick={() => setSelectedMovie(movie.id)}
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
                {/* Movie details with fade and scale animation */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-gray-900/90 to-gray-800/90 text-sm flex flex-col gap-2 p-4 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-1 text-yellow-300 font-semibold">
                      <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                      {movie.vote_average.toFixed(1)}
                    </p>
                    <p className="text-gray-200 font-medium">
                      {Kconverter(movie.vote_count)} votes
                    </p>
                  </div>
                </div>
                {selectedMovie === movie.id && (
                  <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                    <CheckIcon
                      className="w-4 h-4 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                )}
              </div>

              <p className="font-medium truncate ">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>
      {/* show price input*/}
      <div className="mt-8">
        <label className=" block text-sm font-medium mb-2">Show Pricw</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm ">{currency}</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="outline-4"
          />
        </div>
      </div>
      {/* date and time selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Select Date and Time{" "}
        </label>
        <div className=" inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md "
          />
          <button
            onClick={dateFormat}
            className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
          >
            Add Time
          </button>
        </div>
      </div>

      {/*display selected time*/}
    </>
  ) : (
    <Loading />
  );
};

export default AddShows;
