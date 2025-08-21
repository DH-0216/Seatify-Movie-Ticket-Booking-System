"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";

import { usePathname } from "next/navigation";
import { user, sidebarItems } from "@/utils";

const AdminSideBar = ({ selectedSection, setSelectedSection }) => {
  const [isClient, setIsClient] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
      className={`
        h-[calc(100vh-64px)] flex flex-col items-center pt-8
        ${isSidebarOpen ? "w-54" : "w-16"}
        border-r border-gray-300/20 text-sm
        bg-[#0a0a0a]
        transition-[width] duration-300 ease-in-out
        overflow-hidden
      `}
    >
      <div className="flex flex-col items-center transition-all duration-300">
        <Image
          src={user.Imageurl}
          alt="sidebar"
          className={`rounded-full mx-auto transition-all duration-300 ${
            isSidebarOpen ? "h-14 w-14" : "h-9 w-9"
          }`}
        />
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen
              ? "opacity-100 max-h-10 mt-2"
              : "opacity-0 max-h-0 mt-0"
          }`}
        >
          <p className="text-base text-white whitespace-nowrap">
            {user.FirstName} {user.LastName}
          </p>
        </div>
      </div>

      <div className="space-y-4 mt-4 w-full">
        {sidebarItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = selectedSection === item.id;
          return (
            <button
              key={index}
              onClick={() => setSelectedSection(item.id)}
              className={`relative flex items-center w-full py-2 first:mt-6 rounded-md
                ${
                  isSidebarOpen
                    ? "justify-start pl-6 pr-4 gap-2"
                    : "mx-auto transition-all duration-300 pl-5"
                }
                ${
                  isActive
                    ? isSidebarOpen
                      ? "text-red-500 bg-red-500/10 border-r-4 border-red-500"
                      : "text-red-500"
                    : isSidebarOpen
                    ? "text-gray-400 hover:text-red-500 hover:bg-red-500/10 hover:border-r-4 hover:border-red-500 transition-colors duration-200"
                    : "text-gray-400 hover:text-red-500 transition-colors duration-200"
                } group transition-all duration-300`}
            >
              <span
                className={`flex items-center justify-center transition-all duration-300 ${
                  isSidebarOpen ? "p-2" : "p-0"
                }`}
              >
                <IconComponent size={20} />
              </span>
              <span
                className={`font-medium transition-all duration-300 ${
                  isSidebarOpen
                    ? "opacity-100 scale-100 ml-2"
                    : "opacity-0 scale-95 ml-0"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSideBar;
