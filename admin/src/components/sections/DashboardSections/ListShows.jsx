"use client";
import { dummyShowsData } from "@/utils";
import React, { useEffect, useState } from "react";

import Title from "@/components/Shared/Title";
import { format } from "date-fns";
import Loading from "@/app/loading";

const ListShows = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "USD"; // fallback to USD
  const dateFormat = (date) => format(new Date(date), "dd MMMM yyyy");
  const [shows, setshows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setshows(
        dummyShowsData.map((movie, idx) => ({
          movie,
          showDataTime: "2025-06-30T02:30:00.000Z", // You can customize this per movie if needed
          showPrice: 59,
          occupiedSeats: {
            A1: `user_${idx + 1}`,
            B1: `user_${idx + 2}`,
            C1: `user_${idx + 3}`,
          },
        }))
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

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
                <td className="p-2">{dateFormat(show.showDataTime)}</td>
                <td className="p-2">
                  {Object.keys(show.occupiedSeats).length}
                </td>
                <td className="p-2">
                  {currency}{" "}
                  {Object.keys(show.occupiedSeats).length * show.showPrice}
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