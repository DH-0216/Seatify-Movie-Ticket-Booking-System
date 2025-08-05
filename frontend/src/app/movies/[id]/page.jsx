"use client";
import DateSelect from "@/components/DateSelect";
import FavoriteCast from "@/components/sections/MovieSections/FavoriteCast";
import MoreDetails from "@/components/sections/MovieSections/MoreDetails";
import React from "react";
import { dummyDateTimeData, dummyShowsData } from "@/data/index";
import { useParams } from "next/navigation";

const MovieDetails = () => {
  const { id } = useParams();
  const movie = dummyShowsData.find((movie) => movie._id === id);

  return (
    <div>
      <MoreDetails />
      <FavoriteCast />
      <DateSelect dateTime={movie?.dateTime || {}} id={movie?._id} />
    </div>
  );
};

export default MovieDetails;
