"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import { MenuIcon,  TicketPlus,  } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";

const AdminNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <>
      <div className="flex items-center justify-between  py-12 mx-12 h-16 border-b-2  border-gray-300/30">
        <Image src={assets.logo} alt="" className="w-36 h-auto" />

        {!user ? (
          <button
            onClick={() => openSignIn()}
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
                onClick={() => router.push("mybookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </>
  );
};

export default AdminNavBar;
