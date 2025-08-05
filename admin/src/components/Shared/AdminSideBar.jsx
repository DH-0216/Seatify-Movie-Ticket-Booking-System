"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";

import { usePathname } from "next/navigation";
import { user, sidebarItems } from "@/utils";


const AdminSideBar = ({ selectedSection, setSelectedSection }) => {


  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20  text-sm">
      <Image
        src={user.Imageurl}
        alt="sidebar"
        className="h-9  md:h-14 w-9 md:w-14 rounded-full mx-auto"
      />
      <p className="mt-2 text-base max-md:hiddenn text-white">
        {user.FirstName} {user.LastName}
      </p>

      <div className="space-y-2">
        {sidebarItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = selectedSection === item.id;
          return (
            <button
              key={index}
              onClick={() => setSelectedSection(item.id)}
              className={`relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 pr-4
                ${isActive
                  ? "text-red-500 bg-red-500/10 border-r-4 border-red-500"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-500/10 hover:border-r-4 hover:border-red-500 transition-colors duration-200"
                } group`}
            >
              <IconComponent size={20} className="mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSideBar;
