"use client";
import DateSelect from "@/components/DateSelect";
import FavoriteCast from "@/components/sections/MovieSections/FavoriteCast";
import MoreDetails from "@/components/sections/MovieSections/MoreDetails";
import React, { useEffect, useState } from "react";
import YouMayLike from "@/components/sections/MovieSections/YouMayLike";
import { useParams } from "next/navigation";
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
    <div>
      <MoreDetails />
      <FavoriteCast />
      {movie && (
        <DateSelect
          show={show}
          id={movie._id}
        />
      )}
      <YouMayLike />
    </div>
  );
};

export default MovieDetails;
