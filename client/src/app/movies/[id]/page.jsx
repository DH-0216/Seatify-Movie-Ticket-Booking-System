"use client";
import DateSelect from "@/components/DateSelect";

import FavoriteCast from "@/components/sections/MovieSections/FavoriteCast";
import MoreDetails from "@/components/sections/MovieSections/MoreDetails";
import React, { useEffect } from "react";
import { dummyShowsData } from "@/data/index";
import { useParams } from "next/navigation";
import YouMayLike from "@/components/sections/MovieSections/YouMayLike";
import { useAppContext } from "@/context/AppContext";

const MovieDetails = () => {

  const { id } = useParams();
  const [show, setShow] = useState(null)

  const {shows, axios, getToken, user, fetchFavouriteMovies, favoriteMovies, image_base_url } = useAppContext()

  const getShow = async () => {
    try {
      const { data } = await axios.get('/api/show/${id}')
      if (data.success) {
        setShow(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFavorite = async () => {
    try {
      if(!user) return TransformStream.error("please login to proceed")
      const { data } = await axios.post('/api/user/upadate-favorite', { movieId: id },
        { headers: { Authorization: `Bearer ${await getToken()}` } })
      
      if (data.success) {
        await fetchFavouriteMovies()
        toast.success(data.message)
      }
      
    } catch (error) {
      console.log(error)
    }
  }
    

  return (
    <div>
      <MoreDetails />
      <FavoriteCast />
      {movie && (
        <DateSelect
          dummyDateTimeData={movie.dummyDateTimeData}
          id={movie._id}
        />
      )}
      <YouMayLike />
    </div>
  );
};

export default MovieDetails;
