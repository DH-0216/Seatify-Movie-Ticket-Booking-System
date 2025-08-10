import React from "react";
import { ArrowRightIcon } from "lucide-react";

export default function SeatSection({
    assets,
    BlurCircle,
    renderSeats,
    groupRows,
    navigateToBookings,
}) {
    return (
        <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
            <BlurCircle top="100px" left="100px" />
            <BlurCircle bottom="0" right="0" />
            <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
            <img src={assets.screenImage} alt="screen" />
            <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

            <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
                <div>{groupRows[0].map((row) => renderSeats(row))}</div>

                <div className="grid grid-col-2 gap-11">
                    {groupRows.slice(1).map((group, idx) => (
                        <div key={idx}>{group.map((row) => renderSeats(row))}</div>
                    ))}
                </div>
            </div>

            <button
                onClick={navigateToBookings}
                className="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary rounded-full hover:bg-primary-dull font-medium cursor-pointer active:scale-95"
            >
                Proceed to checkout
                <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
            </button>
        </div>
    );
}
