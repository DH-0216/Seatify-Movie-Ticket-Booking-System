"use client";
import { useEffect, useState } from "react";
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
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

const dateFormat = (date) => {
  if (!date) return "Unknown";
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) return "Invalid date";
  return format(parsedDate, "dd MMMM yyyy, h:mm a");
};

const Dashboard = () => {
  const { axios, getToken, user, image_base_url } = useAppContext();
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCard = [
    {
      title: "Total Booking",
      value: dashboardData.totalBookings || 0,
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: dashboardData.totalRevenue || 0,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || 0,
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || 0,
      icon: UserIcon,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching dashboard data");
      console.error("Error fetching dashboard data:", error);
      setLoading(false); // Make sure to stop loading on error
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

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
                  {card.title === "Total Revenue" ? currency + " " : ""}
                  {card.value}
                  {card.title === "Total Revenue" ? ".00" : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <p className="text-2xl font-bold text-white mb-6">Active Shows</p>
        <div className="flex justify-center">
          <div className="flex flex-wrap max-sm:justify-center gap-12 px-8 py-8">
            {dashboardData.activeShows.map((show) => (
              <div
                key={show._id}
                className="group relative w-[220px] h-[300px] overflow-hidden rounded-lg shadow-md cursor-pointer gap-x-6"
              >
                {/* Movie Poster */}
                <div className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 gap-x-6">
                  <Image
                    src={image_base_url + show.movie.poster_path}
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
                      {currency}{" "}
                      {show.showprice}
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
    </div>
  );
};

export default Dashboard;
