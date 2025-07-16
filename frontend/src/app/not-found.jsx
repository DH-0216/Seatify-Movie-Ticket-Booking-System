"use client";

import { useState, useEffect } from "react";
import { Film, Home, Search, Ticket, Play, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [ticketAnimation, setTicketAnimation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    const ticketInterval = setInterval(() => {
      setTicketAnimation(true);
      setTimeout(() => setTicketAnimation(false), 1000);
    }, 4000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(ticketInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Animated movie reel */}
          <div className="relative mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-600 to-red-700 rounded-full mb-6 animate-spin-slow">
              <Film className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20"></div>
          </div>

          {/* Glitch effect on 404 */}
          <div className="relative mb-6">
            <h1
              className={`text-8xl md:text-9xl font-black text-white transition-all duration-200 ${
                glitchActive ? "animate-pulse scale-110" : ""
              }`}
            >
              404
            </h1>
            {glitchActive && (
              <>
                <div className="absolute inset-0 text-8xl md:text-9xl font-black text-red-500 opacity-50 transform translate-x-1 animate-pulse">
                  404
                </div>
                <div className="absolute inset-0 text-8xl md:text-9xl font-black text-slate-300 opacity-50 transform -translate-x-1 animate-pulse">
                  404
                </div>
              </>
            )}
          </div>

          {/* Ticket animation */}
          <div
            className={`relative mb-8 transform transition-all duration-500 ${
              ticketAnimation ? "scale-105 rotate-3" : ""
            }`}
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black px-6 py-3 rounded-lg shadow-2xl">
              <Ticket className="w-6 h-6" />
              <span className="font-bold text-lg">MOVIE NOT FOUND</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          </div>

          {/* Main message */}
          <div className="mb-8 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              This Show Has Been
              <span className="text-red-400 block">Cancelled</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-lg mx-auto leading-relaxed">
              The page you're looking for seems to have gone off-screen. Let's
              get you back to the main feature.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push("/")}
              className="group relative px-8 py-4 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px]"
            >
              <div className="absolute inset-0 bg-white rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </button>

            <button
              onClick={() => router.push("/movies")}
              className="group relative px-8 py-4 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px]"
            >
              <div className="absolute inset-0 bg-red-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Search className="w-5 h-5" />
              <span>Browse Movies</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}
