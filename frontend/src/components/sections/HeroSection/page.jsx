"use client";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { ArrowRight, Calendar1Icon, ClockIcon } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-hero bg-cover bg-center h-screen">
      <Image
        src={assets.marvelLogo}
        alt=""
        className="max-h-11 lg:h-11 mt-20"
      />

      <h1 className="text-5x1 md:text-[70px] md:leading-18 font-semibold max-w-110">
        Guardians <br /> of the Galaxy
      </h1>

      <div className="flex items-center gap-4 text-gray-300">
        <span>Action | Adeventure | Sci-Fi</span>
        <div className="flex items-center gap-1">
          <Calendar1Icon className="w-4.5 h-4.5" /> 2018
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="w-4.5 h-4.5" /> 2h 8m
        </div>
      </div>
      <p className="max-w-md text-gray-300">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, amet
        veniam, incidunt porro eveniet facilis praesentium illo officia quam ea,
        alias enim ullam voluptatem? Ea corrupti eos laborum iure autem.
      </p>
      <button
        onClick={() => router.push("/movies")}
        className="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
      >
        Explore Movies
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Hero;
