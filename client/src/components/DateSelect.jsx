import React, { useState } from "react";
import BlurCircle from "./shared/BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const DateSelect = ({ dateTime = {}, id, show }) => {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const dateFormat = (date) => format(new Date(date), "dd MMMM yyyy");

  const onBookHandler = () => {
    if (!selected) {
      toast.error("Please select a date");
      return;
    }
    router.push(`/seatlayout/${id}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <div
      id="dateSelect"
      className="px-6 md:px-16 lg:px-40 pt-10 md:pt-10 mt-10 md:10"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="100px" right="0px" />
        <div>
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-6 text-sm mt-5 ml-10">
            <ChevronLeftIcon width={28} />
            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {show?.dateTime &&
                Object.keys(show.dateTime).map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelected(date)}
                    className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${
                      selected === date
                        ? "bg-primary text-white"
                        : "border border-primary/70"
                    }`}
                  >
                    <span>{new Date(date).getDate()}</span>
                    <span>
                      {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                  </button>
                ))}
            </span>
            <ChevronRightIcon width={28} />
          </div>
        </div>
        <button
          onClick={onBookHandler}
          className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
