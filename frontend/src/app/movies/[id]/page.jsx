import DateSelect from '@/components/DateSelect';
import FavoriteCast from '@/components/sections/MovieSections/FavoriteCast';
import MoreDetails from '@/components/sections/MovieSections/MoreDetails';
import React from 'react'

const MovieDetails = () => {
  return (
    <div>
      <MoreDetails />
      <FavoriteCast />
      <DateSelect />
    </div>
  ) 
};

export default MovieDetails
