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
  UserIcon,
} from "lucide-react";

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
        <BlurCircle top="-100px" left="0" />
        <div className="flex flex-wrap gap-4 w-full">
          {dashboardCard.map((card, index) => (
            <div
              key={index}
              className="flex items-center center justify-between px-4 py-3 bg-[rgba(255,255,255,0.05)]

 border border-[color:var(--color-primary)]/20 shadow rounded-md  max-w-50 w-full transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <div>
                <h1 className="text-sm text-white">{card.title}</h1>
                <p className="text-2xl font-semibold mt-1 text-white">
                  {" "}
                  {card.title == "totalRevenue" ? currency : " "}
                  {card.value}
                </p>
              </div>
              <card.icon className="w-6 h-6 text-white" />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-lg font-medium">Active Shows</p>
      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <BlurCircle top="-100px" left="10" />
        {dashboardData.activeShows.map((show) => (
          <div key={show._id} className=""></div>
          }

      </div>

    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
