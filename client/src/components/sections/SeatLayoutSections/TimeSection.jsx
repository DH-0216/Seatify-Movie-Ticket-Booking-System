import React from "react";
import { ClockIcon } from "lucide-react";
import isoTimeFormat from "@/lib/isoTimeFormat";

export default function TimeSection({ date, show, selectedTime, setSelectedTime }) {
    return (
        <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
            <p className="text-lg font-semibold px-6">Available Timing</p>
            <div className="mt-5 space-y-1">
                {show.dateTime[date]?.map((item) => (
                    <div
                        key={item.time}
                        onClick={() => setSelectedTime(item)}
                        className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time
                                ? "bg-primary text-white"
                                : "hover:bg-primary/20"
                            }`}
                    >
                        <ClockIcon className="w-4 h-4" />
                        <p className="text-sm">{isoTimeFormat(item.time)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
