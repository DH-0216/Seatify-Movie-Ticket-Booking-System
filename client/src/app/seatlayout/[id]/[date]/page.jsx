"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { assets } from "@/assets/assets";
import { dummyDateTimeData, dummyShowsData } from "@/data";
import Loading from "@/app/loading";
import BlurCircle from "@/components/shared/BlurCircle";
import TimeSection from "@/components/sections/SeatLayoutSections/TimeSection";
import SeatSection from "@/components/sections/SeatLayoutSections/SeatSection";
import toast from "react-hot-toast";

export default function SeatLayoutPage() {
  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];
  const { id, date } = useParams();
  const router = useRouter();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const getShow = async () => {
    const foundShow = dummyShowsData.find((s) => s._id === id);
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("You can only select 5 seats");
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
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-primary text-white"
                }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    getShow();
  }, []);

  if (!show) return <Loading />;

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      <TimeSection
        date={date}
        show={show}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      <SeatSection
        assets={assets}
        BlurCircle={BlurCircle}
        renderSeats={renderSeats}
        groupRows={groupRows}
        navigateToBookings={() => router.push("/mybookings")}
      />
    </div>
  );
}
