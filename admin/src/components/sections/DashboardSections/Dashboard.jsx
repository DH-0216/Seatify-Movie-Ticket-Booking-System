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
      title: "totalBooking",
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

  if (loading) return <Loading />;

  return (
    <div className="py-6 px-6 bg-[#0a0a0a] min-h-screen">
      <Title text1="Admin" text2="Dashboard" />
      <div className="relative flex flex-wrap gap-4 z-10">
        <BlurCircle top="-100px" right="100px" />
        <div className="flex justify-between gap-4 w-full px-6 lg:px-12 py-12">
          {dashboardCard.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border border-[color:var(--color-primary)]/20 shadow rounded-md max-w-60 w-full transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="text-sm text-white">{card.title}</h1>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-semibold mt-1 text-white">
                  {card.title === "totalRevenue" ? currency : ""}
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <p className="text-2xl font-bold text-white mb-6">Active Shows</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-12 gap-y-10 lg:gap-y-14 px-6 md:px-12 py-8">
          {dashboardData.activeShows.map((show) => (
            <div
              key={show._id}
              className="group relative w-[240px] h-[300px] overflow-hidden rounded-lg shadow-md cursor-pointer gap-x-6"
            >
              {/* Movie Poster */}
              <div className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 gap-x-6">
                <Image
                  src={show.movie.poster_path}
                  alt={show.movie.title || "Movie Poster"}
                  fill
                />
              </div>
              {/* Card Details */}
              <div className="absolute bottom-0 left-0 right-0 bg-gray-950 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
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
      </div>
    </div>
  );
};

export default Dashboard;
