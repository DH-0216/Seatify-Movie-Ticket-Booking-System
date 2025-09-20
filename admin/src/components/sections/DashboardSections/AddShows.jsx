"use client";

import Title from "@/components/Shared/Title";
import { dummyShowsData } from "@/utils";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import Image from "next/image";
import { CheckIcon, DeleteIcon, StarIcon } from "lucide-react";
import { Kconverter } from "@/components/Shared/Kconverter";
import { format } from "date-fns";

const dateFormat = (date) => {
  if (!date) return "Unknown date";
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) return "Invalid date";
  return format(parsedDate, "dd MMMM yyyy");
};

const AddShows = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }

      return prev;
    });
  };

  const handleRemoveDateTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: filteredTimes };
    });
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows" />
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>

      <div className="mt-10 overflow-x-auto pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 ml-15">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className="group relative w-[240px] h-[300px] overflow-hidden rounded-xl shadow-lg cursor-pointer"
              onClick={() => setSelectedMovie(movie.id)}
            >
              <div className="w-full h-full relative">
                <Image
                  src={movie.poster_path}
                  alt={movie.title || "movie poster"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="flex absolute bottom-0 left-0 w-full bg-gradient-to-r from-gray-900/90 to-gray-800/90 text-sm gap-4 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 justify-between">
                 
                  <div className="flex flex-col">
                    <p className="font-medium truncate text-white">
                      {movie.title}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {dateFormat(movie.release_date)}
                    </p>
                  </div>

                  
                  <div className="text-right">
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
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm">{currency}</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="outline-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Select Date and Time
        </label>
        <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
          >
            Add Time
          </button>
        </div>
      </div>

      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2">Selected Show Times</h2>
          <ul className="space-y-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date}>
                <div className="font-medium">{dateFormat(date)}</div>
                <div className="flex flex-wrap gap-2 mt-1 text-sm">
                  {times.map((time) => (
                    <div key={time} className="border border-primary px-2 py-1 flex items-center rounded">
                      <span>{time}</span>
                      <DeleteIcon onClick={() => handleRemoveDateTime(date, time)} width={15} className="ml-2 text-red-500 hover:text-red-700 cursor-pointer" />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer">
        Add Show
      </button>
    </>
  ) : (
    <Loading />
  );
};

export default AddShows;
