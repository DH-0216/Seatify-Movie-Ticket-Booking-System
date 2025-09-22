"use client";
import { dummyTrailers } from "@/data/index";
import { useParams } from "next/navigation";
import BlurCircle from "@/components/shared/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon, X } from "lucide-react";
import Image from "next/image";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import React from "react";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-hot-toast";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const MoreDetails = () => {
  const { id } = useParams();
  const [watchTrailer, setWatchTrailer] = useState(false);
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [show, setShow] = useState(null);
  const {
    shows,
    axios,
    getToken,
    user,
    fetchFavoriteMovies,
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

  const handleFavourite = async (movieId) => {
    try {
      if (!user) return TransformStream.error("please login to proceed");
      const { data } = await axios.post(
        "/api/user/update-favorite",
        { movieId: id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        await fetchFavoriteMovies();
        toast.success(data.message);
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

  useEffect(() => {
    if (show?.movie?.trailerUrl) {
      setTrailer(show.movie.trailerUrl);
    }
  }, [show]);

  console.log("trailer url", trailer)

  if (!movie) {
    return <Loading />;
  }
  return (
    <>
      <div className="relative py-50">
        <div className="px-6 md:px-16 lg:px-40 pt-8 md:pt-10">
          <div className="absolute inset-0 -z-10">
            <Image
              src={image_base_url + movie.backdrop_path}
              alt={movie.title}
              fill
              className="object-cover rounded-2xl opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent rounded-2xl"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-15 maxw-6xl mx-auto">
            {show && show.movie ? (
              <Image
                src={image_base_url + show.movie.poster_path}
                alt={"Show Image"}
                width={250}
                height={112}
                className="max-md:mx-auto rounded-xl"
              />
            ) : (
              <div className="w-[250px] h-[112px] bg-gray-800 rounded-xl max-md:mx-auto" />
            )}
            <div className="relative flex flex-col gap-3">
              <BlurCircle top="-100px" left="-100px" />
              <p className="text-primary">ENGLISH</p>
              <h1 className="text-4xl font-semiold max-w-96 text-balance">
                {movie.title}
              </h1>
              <div className="flxe items-center gap-2 text-gray-300">
                <StarIcon className="w-5 h-5 text-primary fill-primary mb-2.5" />
                {movie.vote_average.toFixed(1)} User Rating
              </div>
              <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
                {movie.overview}
              </p>
              <p>
                {`${movie.runtime} min`} .{" "}
                {movie.genres.map((genre) => genre.name).join(", ")} .{" "}
                {movie.release_date.split("-")[0]}
              </p>
              <div className="flex items-center flex-wrap gap-4 mt-4">
                <button
                  onClick={() => setWatchTrailer(true)}
                  className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95"
                >
                  <PlayCircleIcon className={"w-5 h-5"} />
                  Watch Trailer
                </button>
                <a
                  href="#dateSelect"
                  className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
                >
                  Buy Tickets
                </a>
                <button
                  onClick={() => handleFavourite(id)}
                  className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favoriteMovies.find((movie) => movie._id === id)
                        ? "fill-primary text-primary"
                        : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        {watchTrailer && (
          <div className="absolute top-0 left-0 w-full min-h-full z-50 flex items-center justify-center bg-black/80">
            <div className="relative w-full max-w-4xl px-4">
              <button
                onClick={() => setWatchTrailer(false)}
                className="absolute -top-15 -right-15 text-white hover:text-gray-300 hover:cursor-pointer"
              >
                <X className="w-7 h-7" />
              </button>
              <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden bg-black">
                <ReactPlayer
                  src={trailer}
                  controls
                  className="absolute top-0 left-0 rounded-lg"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MoreDetails;
