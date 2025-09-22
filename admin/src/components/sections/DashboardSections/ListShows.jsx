"use client";
import React, { useEffect, useState } from "react";
import Title from "@/components/Shared/Title";
import { format } from "date-fns";
import Loading from "@/app/loading";
import { useAppContext } from "@/context/AppContext";


const ListShows = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "LKR";
  const { axios, getToken, user } = useAppContext()
  const dateFormat = (date) => {
    if (!date) return "Unknown";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return "Invalid date";
    return parsedDate.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  const [shows, setshows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-shows", {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      setshows(data.shows)
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      getAllShows();
    }

  }, [user]);

  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium pl-5">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Total Booking ({currency})</th>
              <th className="p-2 font-medium">Earnings</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light ">
            {shows.map((show, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 min-w-[180px] pl-5">{show.movie.title}</td>
                <td className="p-2">{dateFormat(show.showDateTime)}</td>
                <td className="p-2">
                  {Object.keys(show.occupiedSeats).length}
                </td>
                <td className="p-2">
                  {currency}{" "}
                  {Object.keys(show.occupiedSeats).length * show.showprice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListShows;