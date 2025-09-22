import Loading from "@/app/loading";
import Title from "@/components/Shared/Title";
import { useAppContext } from "@/context/AppContext";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

const BookingLists = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const { axios, getToken, user } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [isloading, setisLoading] = useState(true);
  const dateFormat = (date) => format(new Date(date), "dd MMMM yyyy");

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-bookings", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      setBookings(data.bookings);
    } catch (error) {
      console.error(error);
    }
    setisLoading(false);
  };
  useEffect(() => {
    if (user) {
      getAllBookings();
    }
  }, [user]);
  return !isloading ? (
    <>
      <Title text1="List" text2="Bookings" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full boarder-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium pl-5">User Name</th>
              <th className="p-2 font-medium">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Seats</th>
              <th className="p-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {bookings.map((item, index) => (
              <tr
                key={index}
                className="border-b border-primary/20 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 min-w-45 pl-5">{item?.user?.name ?? "Unknown"}</td>
                <td className="p-2">{item?.show?.movie?.title ?? "Unknown"}</td>
                <td className="p-2">{item?.show?.showDateTime ? dateFormat(item.show.showDateTime) : "N/A"}</td>
                <td className="p-2">
                  {Array.isArray(item?.bookedSeats)
                    ? item.bookedSeats.join(", ")
                    : item?.bookedseats
                      ? Object.keys(item.bookedseats)
                        .map((seat) => item.bookedseats[seat])
                        .join(", ")
                      : "N/A"}
                </td>
                <td className="p-2">
                  {(currency || "$")} {item?.amount ?? 0}
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

export default BookingLists;
