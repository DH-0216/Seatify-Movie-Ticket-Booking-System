"use client"
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useAppContext } from "@/context/AppContext";

const MovieCard = ({ movie }) => {

  const dateFormat = (date) => format(new Date(date), "dd MMMM yyyy");

  const router = useRouter();
  const { image_base_url } = useAppContext();
  return (
    <div className="flex flex-col justify-between p-3 bg-gradient-to-br from-gray-900/80 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:translate-y-1 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 w-66 group">
      <Image
        onClick={() => {
          router.push(`/movies/${movie._id}`);
          scrollTo(0, 0);
        }}
        src={image_base_url + movie.backdrop_path}
        width={400}
        height={208}
        alt=""
        className="rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer group-hover:scale-105 transition-transform duration-300"
      />
      <p className="font-semibold mt-2 truncate text-white group-hover:text-primary transition-colors duration-300">
        {movie.title}
      </p>

      <p className="text-sm text-gray-300 mt-2 group-hover:text-gray-200 transition-colors duration-300">
        {new Date(movie.release_date).getFullYear()} •{" "}
        {movie.genres
          .slice(0, 2)
          .map((genre) => genre.name)
          .join(" | ")}{" "}
        • {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
      </p>

      <div className="flex items-center justify-between mt-4 pb-3">
        <button
          onClick={() => {
            router.push(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          className="px-4 py-2 text-xs bg-gradient-to-r from-primary to-primary-dull hover:from-primary-dull hover:to-primary shadow-lg hover:shadow-primary/30 transition-all duration-300 rounded-full font-medium cursor-pointer transform hover:scale-105"
        >
          Buy Tickets
        </button>
        <p className="flex items-center gap-1 text-sm text-gray-300 mt-1 pr-1 group-hover:text-gray-200 transition-colors duration-300">
          <StarIcon className="w-4 h-4 text-primary fill-primary drop-shadow-sm" />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
