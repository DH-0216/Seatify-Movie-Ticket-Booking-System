import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-3xl font-bold">
      <span className="text-[color:#E50914] text-5xl ">S</span>
      <span className="text-white">eatify</span>
      <span className="  text-white ml-3">Movie</span>
    </Link>
  );
};

export default Logo;
