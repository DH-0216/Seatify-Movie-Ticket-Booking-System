"use client";
import { dummyBookingData } from "@/data";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import BlurCircle from "@/components/shared/BlurCircle";
import { format } from "date-fns";
import isoTimeFormat from "@/lib/isoTimeFormat";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

const MyBookingsSection = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const dateFormat = (date) => format(new Date(date), "dd MMMM yyyy");

  const { axios, getToken, user, image_base_url } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/user/bookings", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      getMyBookings();
      // Briefly poll for updates so webhook changes reflect without manual refresh
      const interval = setInterval(() => {
        getMyBookings();
      }, 3000);
      const stopAfter = setTimeout(() => clearInterval(interval), 20000);
      return () => {
        clearInterval(interval);
        clearTimeout(stopAfter);
      };
    }
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="-100px" />
      <BlurCircle bottom="0" left="600px" />

      <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

      {(bookings || []).map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl"
        >
          <div className="flex flex-col md:flex-row">
            <img
              src={
                item?.show?.movie?.poster_path
                  ? image_base_url + item.show.movie.poster_path
                  : "/favicon.ico"
              }
              alt={item?.show?.movie?.title || "Movie"}
              className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
            />
            <div className="flex flex-col p-4">
              <p className="text-lg font-semibold">{item?.show?.movie?.title || "Unknown Movie"}</p>
              {item?.show?.movie?.runtime ? (
                <p className="text-gray-400 text-sm">{item.show.movie.runtime} min</p>
              ) : null}
              <p className="text-gray-400 text-sm mt-auto">
                {item?.show?.showDateTime ? dateFormat(item.show.showDateTime) : ""}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:items-end md:text-right justify-between p-4">
            <div className="flex items-center gap-4">
              <p className="text-2xl font-semibold mb-3">
                {currency}
                {item.amount}
              </p>
              {!item?.isPaid && item?.paymentLink ? (
                <Link
                  href={item.paymentLink}
                  className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer"
                >
                  Pay Now
                </Link>
              ) : !item?.isPaid ? (
                <span className="text-sm mb-3 text-gray-400">Pending...</span>
              ) : null}
            </div>
            <div className="text-sm">
              <p>
                <span className="text-gray-400">Total Tickets:</span>{" "}
                {item?.bookedSeats?.length || 0}
              </p>
              <p>
                <span className="text-gray-400">Seat Number:</span>{" "}
                {item?.bookedSeats?.length ? item.bookedSeats.join(", ") : "-"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookingsSection;
