"use client"
import { dummyDateTimeData, dummyShowsData } from '@/data/index'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from "react"
import BlurCircle from '@/components/shared/BlurCircle'
import { StarIcon } from 'lucide-react'
import timeFormat from "@/lib/timeFormat";
import Image from 'next/image'

const MovieDetails = () => {
  const {id} = useParams ()
  const [show, setShow] = useState(null)
  
  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id === id)
    setShow({
      movie: show,
      dateTime: dummyDateTimeData

    })
  }

  useEffect(() => {
    getShow()
  }, [id])
  
  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 maxw-6xl mx-auto'>
        <Image
          src={show.movie.poster_path}
          alt={"Show Image"}
          width={150}
          height={112}
          className="max-md:mx-auto rounded-xl"/>

        <div className='relative flex flex-col gap-3'>
          <BlurCircle top="-100px" left="-100px"/>
          <p className='text-primary'>ENGLISH</p>
          <h1 className='text-4xl font-semiold max-w-96 text-balance'>{show.movie.title}</h1>
          <div className='flxe items-center gap-2 text-gray-300'>
            <StarIcon className='w-5 h-5 text-primary fill-primary'/>
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overiew}</p>

          <p>
            {timeFormat(show.movie.runtime)} . {show.movie.genres.map(genre => genre.name).join(", ")} . {show.movie.release_date.split("-")[0]}
          </p>
        </div>
      </div>

    </div>
  ) : <div>Loading...</div>
}

export default MovieDetails
