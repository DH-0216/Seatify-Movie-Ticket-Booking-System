"use client";
import DateSelect from "@/components/DateSelect";
import FavoriteCast from "@/components/sections/MovieSections/FavoriteCast";
import MoreDetails from "@/components/sections/MovieSections/MoreDetails";
import React from "react";
import { dummyShowsData } from "@/data/index";
import { useParams } from "next/navigation";
import YouMayLike from "@/components/sections/MovieSections/YouMayLike";

const MovieDetails = () => {
  const { id } = useParams();
  const movie = dummyShowsData.find((movie) => movie._id.toString() === id?.toString());


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
