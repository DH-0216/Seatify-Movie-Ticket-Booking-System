"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const AdminNavBar = () => {
  return (
    <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30">
      <Image src={assets.logo} alt="" className="w-36 h-auto" />
    </div>
  );
};

export default AdminNavBar;
