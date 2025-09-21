"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";


const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [show, setShow] = useState(null);
  const {
    shows,
    axios,
    getToken,
    user,
    fetchFavouriteMovies,
    favoriteMovies,
    image_base_url,
  } = useAppContext();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setShow(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  useEffect(() => {
    const foundMovie = shows?.find((show) => show._id === id);
    setMovie(foundMovie);
  }, [id]);
  

  return (
    <div className="px-6 md:px-16 lg:px-40 pt-10 md:pt-32">

      <p className="text-lg font-medium mt-5">Your Favorite Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {show?.movie?.casts?.slice(0, 12)?.map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Image
                src={image_base_url + cast.profile_path}
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
