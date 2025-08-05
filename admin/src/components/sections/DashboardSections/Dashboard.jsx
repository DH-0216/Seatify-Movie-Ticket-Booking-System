"use client";

import { useEffect, useState } from "react";

import { dummyDashboardData } from "@/utils";
import Title from "@/components/Shared/Title";

import BlurCircle from "@/components/Shared/BlurCircle";
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import Loading from "@/app/loading";

const dateFormat = (date) => format(new Date(date), "dd MMMM yyyy");

const Dashboard = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const [dashboardData, setDashboardData] = useState({
    totalBooking: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCard = [
    {
      title: "totalBooking ",
      value: dashboardData.totalBooking || 0,
      icon: ChartLineIcon,
    },
    {
      title: "totalRevenue",
      value: dashboardData.totalRevenue || 0,
      icon: CircleDollarSignIcon,
    },
    {
      title: "activeshows",
      value: dashboardData.activeShows.length || 0,
      icon: PlayCircleIcon,
    },
    {
      title: "totalUser",
      value: dashboardData.totalUser || 0,
      icon: UserIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />
      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" right="100px" />
        <div className="flex justify-between gap-4 w-full px-6">
          {dashboardCard.map((card, index) => (
            <div
              key={index}
              className="flex items-center center justify-between px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[color:var(--color-primary)]/20 shadow rounded-md  max-w-60 w-full transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="text-sm text-white">{card.title}</h1>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-semibold mt-1 text-white">
                  {card.title == "totalRevenue" ? currency : " "}
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-lg font-medium text-white">Active Shows</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        <BlurCircle top="-100px" left="10" />
        {dashboardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:translate-y-1 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group"
          >
            <div className="rounded-t-2xl max-h-40 overflow-hidden">
              <Image
                src={show.movie.poster_path}
                width={400}
                height={200}
                alt={show.movie.title || "Movie Poster"}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <p className="text-white text-lg font-semibold truncate group-hover:text-primary transition-colors duration-300">
                {show.movie.title}
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-lg font-medium text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  {currency}
                  {show.showPrice}
                </p>
                <p className="flex items-center gap-1 text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  <StarIcon className="w-4 h-4 text-primary fill-primary drop-shadow-sm" />
                  {show.movie.vote_average.toFixed(1)}
                </p>
              </div>
              <p className="pt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {dateFormat(show.showDateTime)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
