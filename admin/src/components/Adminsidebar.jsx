"use client";

import React, { useState, useEffect } from "react";

import { assets } from "@/assets/assets";
import Image from "next/image";
import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Adminsidebar = () => {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsClient(true);
  }, []);

  const user = {
    FirstName: "Admin",
    LastName: "User",
    Imageurl: assets.profile,
  };

  const adminnavlinks = [
    { name: "Dashboard", href: "/Dashboard", icon: LayoutDashboardIcon },
    { name: "AddShows", href: "/Addshows", icon: PlusSquareIcon },
    { name: "BookingLists", href: "/Bookinglists", icon: ListIcon },
    { name: "ListShows", href: "/Listshows", icon: ListCollapseIcon },
  ];

  return (
    <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20  text-sm">
      <Image
        src={user.Imageurl}
        alt="sidebar"
        className="h-9  md:h-14 w-9 md:w-14 rounded-full mx-auto"
      />
      <p className="mt-2 text-base max-md:hidden">
        {user.FirstName}
        {user.LastName}
      </p>

      <div className="w-full">
        {adminnavlinks.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400  ${
                isActive
                  ? "text-red-500 bg-red-500/10"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors duration-200"
              }group`}
            >
              {/* Active indicator line */}
              <span
                className={`w-1.5 h-10 rounded-r left-0 absolute ${
                  isActive ? "bg-red-500" : "group-hover:bg-red-500/50"
                }`}
              />

              <Icon className="w-5 h-5" />
              <span className="hidden md:inline">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Adminsidebar;
