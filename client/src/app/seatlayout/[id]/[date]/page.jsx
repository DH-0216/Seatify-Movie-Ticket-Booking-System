"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { assets } from "@/assets/assets";
import Loading from "@/app/loading";
import BlurCircle from "@/components/shared/BlurCircle";
import toast from "react-hot-toast";
import { ClockIcon, ArrowRightIcon, Loader2 } from "lucide-react";
import isoTimeFormat from "@/lib/isoTimeFormat";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

export default function SeatLayoutPage() {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];
  const { id, date } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [isProceeding, setIsProceeding] = useState(false);

  const { axios, getToken, user } = useAppContext();
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "LKR ";

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setShow(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error("Please select time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast.error("You can only select 5 seats");
    }

    if (occupiedSeats.includes(seatId)) {
      return toast.error("This seat is already book");
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row} ${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer 
                ${selectedSeats.includes(seatId) && "bg-primary text-white"}
                ${occupiedSeats.includes(seatId) && "opacity-50"}`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(
        `/api/booking/seats/${selectedTime.showId}`
      );
      if (data.success) {
        setOccupiedSeats(data.occupiedSeats);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookTickets = async () => {
    try {
      if (!user) return toast.error("Please Login to proceed");

      if (!selectedTime || !selectedSeats.length)
        return toast.error("Please select a time and seats ");
      setIsProceeding(true);
      const { data } = await axios.post(
        "/api/booking/create",
        { showId: selectedTime.showId, selectedSeats },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsProceeding(false);
    }
  };

  useEffect(() => {
    getShow();
  }, []);

  useEffect(() => {
    if (selectedTime) {
      getOccupiedSeats();
    }
  }, [selectedTime]);

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timing</p>
        <div className="mt-5 space-y-1">
          {show.dateTime && show.dateTime[date] ? (
            show.dateTime[date].map((item) => (
              <div
                key={item.time}
                onClick={() => setSelectedTime(item)}
                className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer
            transition ${selectedTime?.time === item.time
                    ? "bg-primary text-white"
                    : "hover:bg-primary/20"
                  }`}
              >
                <ClockIcon className="w-4 h-4" />
                <p className="text-sm">{isoTimeFormat(item.time)}</p>
              </div>
            ))
          ) : (
            <p className="px-6 text-sm text-red-400">
              No timings available for this date.
            </p>
          )}
        </div>
      </div>

      {/*Seats Layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="100px" left="100px" />
        <BlurCircle bottom="0" right="0" />
        <h1 className="text-2xl font-semibold mb-4">Select Your Seat</h1>
        <Image src={assets.screenImage} alt="screen" width={540} height={48} />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-base font-semibold">
          <span>Total: </span>
          <span>
            {currency}{" "}
            {selectedTime && selectedSeats.length
              ? (selectedTime.showprice || 0) * selectedSeats.length
              : 0}
          </span>
        </div>

        <button
          disabled
          title="Disabled for development purpose (avoid payment)"
          onClick={bookTickets}
          // disabled={isProceeding}
          className={`flex items-center gap-2 mt-20 px-10 py-3 text-sm rounded-full font-medium transition ${isProceeding
            ? "bg-primary/70 cursor-not-allowed"
            : "bg-primary cursor-not-allowed opacity-70"
            }`}
        >
          {isProceeding ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Proceed to Checkout
              <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
