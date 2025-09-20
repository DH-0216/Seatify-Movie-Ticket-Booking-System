"use client";

import { AlertCircle, Home, RefreshCw } from "lucide-react";

const Error = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Error icon with subtle animation */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <AlertCircle className="w-20 h-20 text-red-500 mx-auto opacity-20" />
            </div>
            <AlertCircle className="w-20 h-20 text-red-500 mx-auto relative" />
          </div>
        </div>

        {/* Error message */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-white tracking-tight">
              Something went wrong
            </h1>

            <p className="text-xl text-gray-400 font-medium">
              We couldn't process your movie booking
            </p>

            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
              This might be due to high traffic or a temporary issue. Please try
              again in a moment.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-8">
            <button
              onClick={handleRetry}
              className="group flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:scale-105"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Try Again
            </button>

            <button
              onClick={goHome}
              className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 border border-gray-800 hover:border-gray-700"
            >
              <Home className="w-5 h-5" />
              Go Home
            </button>
          </div>
        </div>

        {/* Footer message */}
        <p className="text-gray-600 text-xs mt-16 font-medium">
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
};

export default Error;
