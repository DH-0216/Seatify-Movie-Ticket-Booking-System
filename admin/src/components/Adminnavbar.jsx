"use client";


import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const Adminnavbar = () => {

  return <div className='flex items-center justify-between px-6 md:px-10 h-16 border-b border-white-300/30'>
    <Link href="/">
      <Image src={assets.logo } alt="logo " className='w-36 h-auto'/>
    </Link>
  </div>;
};

export default Adminnavbar;
