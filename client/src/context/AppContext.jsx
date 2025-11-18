"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]); // Add this state
  const { user } = useUser();
  const { getToken } = useAuth();

  const image_base_url = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

  const fetchNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get("/api/show/now-playing");
      if (data.success) {
        setNowPlayingMovies(data.movies);
      }
    } catch (error) {
      console.log("Error fetching now playing movies:", error);
    }
  };

  const fetchFavoriteMovies = async () => {
    try {
      const { data } = await axios.get("/api/user/favorite", {
        headers: { Authorization: `Bearer ${await getToken()} ` },
      });
      if (data.success) {
        setFavoriteMovies(data.movies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShows();
    fetchNowPlayingMovies();
  }, []);

  useEffect(() => {
    if (user) {
      fetchFavoriteMovies();
    }
  }, [user]);

  const value = {
    axios,
    user,
    shows,
    getToken,
    favoriteMovies,
    fetchFavoriteMovies,
    image_base_url,
    nowPlayingMovies,
    heroMovies,
    setHeroMovies, // Expose setter
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
