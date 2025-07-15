import { assets } from "@/assets/assets";

export const moviesData = [
  {
    id: 1,
    logo: assets.marvelLogo,
    title: "Guardians of the Galaxy",
    genre: "Action | Adventure | Sci-Fi",
    year: "2018",
    duration: "2h 8m",
    description:
      "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.",
    image: assets.bg1,
    heroImage: assets.bg1,
    rating: 8.1,
  },
  {
    id: 2,
    logo: assets.marvelLogo,
    title: "Avengers: Endgame",
    genre: "Action | Adventure | Drama",
    year: "2019",
    duration: "3h 1m",
    description:
      "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    image: assets.bg1,
    heroImage: assets.bg1,
    rating: 8.4,
  },
  {
    id: 3,
    title: "Spider-Man: No Way Home",
    logo: assets.marvelLogo,
    genre: "Action | Adventure | Fantasy",
    year: "2021",
    duration: "2h 28m",
    description:
      "Peter Parker's secret identity is revealed to the world. Desperately seeking help from Doctor Strange, the spell goes horribly wrong.",
    image: assets.bg1,
    heroImage: assets.bg1,
    rating: 8.2,
  },
  {
    id: 4,
    title: "Doctor Strange",
    logo: assets.marvelLogo,
    genre: "Action | Adventure | Fantasy",
    year: "2016",
    duration: "1h 55m",
    description:
      "A former neurosurgeon embarks on a journey of healing only to be drawn into the world of the mystic arts.",
    image: assets.bg1,
    heroImage: assets.bg1,
    rating: 7.5,
  },
  {
    id: 5,
    title: "Black Panther",
    logo: assets.marvelLogo,
    genre: "Action | Adventure | Drama",
    year: "2018",
    duration: "2h 14m",
    description:
      "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future.",
    image: assets.bg5,
    heroImage: assets.bg5,
    rating: 7.3,
  },
];

export const featuredMovies = moviesData.slice(0, 3);
export const latestMovies = moviesData.slice(2, 5);
