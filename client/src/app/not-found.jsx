"use client";

import { useState, useEffect } from "react";
import { Film, Home, Search, Ticket } from "lucide-react";

export default function NotFound() {
  const handleHomeClick = () => {
    window.location.href = "/";
  };

  const handleMoviesClick = () => {
    window.location.href = "/movies";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Animated film reel */}
        <div className="relative mb-8 flex justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center animate-spin">
            <Film className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* 404 text */}
        <div className="space-y-2 mb-8">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
          <p className="text-gray-400">
            The page you're looking for doesn't exist
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={handleHomeClick}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          <button
            onClick={handleMoviesClick}
            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>Browse Movies</span>
          </button>
        </div>

        {/* Ticket icon */}
        <div className="opacity-30">
          <Ticket className="w-12 h-12 text-white mx-auto" />
        </div>
      </div>
    </div>
  );
}
