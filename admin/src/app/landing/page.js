"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function LandingPage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background blur circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="text-center z-10 max-w-2xl mx-auto px-6">
        {/* Logo */}
        <Image
          src={assets.logo}
          alt="Seatify Logo"
          className="w-64 h-auto mx-auto mb-8"
        />

        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-6">
          Welcome to Seatify Admin
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
          Manage your movie theater with ease. Add shows, track bookings, and
          control your cinema operations from one powerful dashboard.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl">🎬</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Manage Shows</h3>
            <p className="text-gray-400 text-sm">
              Add and schedule movie shows with ease
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl">📊</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Track Bookings</h3>
            <p className="text-gray-400 text-sm">
              Monitor all customer bookings and sales
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl">⚡</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Real-time Updates</h3>
            <p className="text-gray-400 text-sm">
              Get instant updates on your theater status
            </p>
          </div>
        </div>

        {/* Sign In Button */}
        <button
          onClick={() => router.push("/admin-signin")}
          className="px-8 py-4 bg-primary hover:bg-primary-dull transition-all duration-200 rounded-full font-semibold text-lg text-white shadow-lg hover:shadow-primary/25 cursor-pointer"
        >
          Sign In to Admin Dashboard
        </button>

        {/* Footer */}
        <div className="mt-16 text-gray-500 text-sm">
          <p>Need help? Contact your system administrator</p>
        </div>
      </div>
    </div>
  );
}
