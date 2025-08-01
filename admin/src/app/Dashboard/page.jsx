"use client";

import { useEffect, useState } from "react";

import { dummyDashboardData } from "@/utils";
import Title from "@/components/Title";
import Loading from "../loading";
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
        <BlurCircle top="-100px" right="0" />
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
            className="rounded-lg overflow-hidden bg-[rgba(255,255,255,0.05)]/10 border border-[color:var(--color-primary)]/20 hover:translate-y-1 transition duration-300 flex flex-col w-full max-w-[220px]"
          >
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={show.movie.poster_path}
                fill
                alt=""
                className="object-cover object-center w-full h-full cursor-pointer"
              />
            </div>
            <p className="font-medium p-2 truncate">{show.movie.title}</p>
            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">
                {currency}
                {show.showprice}
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                <StarIcon className="w-4 h-4 text---color-primary fill---color-primary" />
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className="px-2 pt-2 text-sm text-gray-500">
              {dateFormat(show.showDateTime)}
            </p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
