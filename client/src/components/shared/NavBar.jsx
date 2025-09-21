"use client";
import Link from "next/link";
import { useNavigate } from "react-router-dom";
import Image from "next/image";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  const navigate = useNavigate()

  const {favoriteMovies} = useAppContext()

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
      <Link href="/" className="max-md:flex-1">
        <Image src={assets.logo} alt="" className="w-36 h-auto" />
      </Link>

      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <Link
          href="/"
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          className={`relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:transition-all after:duration-300
             ${
               pathname === "/"
                 ? "after:w-full text-[var(--color-primary)] after:bg-[var(--color-primary)]"
                 : "after:w-0 hover:after:w-full after:bg-white"
             }`}
        >
          Home
        </Link>
        <Link
          href="/movies"
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          className={`relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:transition-all after:duration-300
             ${
               pathname === "/movies"
                 ? "after:w-full text-[var(--color-primary)] after:bg-[var(--color-primary)]"
                 : "after:w-0 hover:after:w-full after:bg-white"
             }`}
        >
          Movies
        </Link>
        <Link
          href="/"
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          className={`relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:transition-all after:duration-300
             ${
               pathname === ""
                 ? "after:w-full text-[var(--color-primary)] after:bg-[var(--color-primary)]"
                 : "after:w-0 hover:after:w-full after:bg-white"
             }`}
        >
          Theaters
        </Link>
        <Link
          href="/"
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          className={`relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:transition-all after:duration-300
             ${
               pathname === ""
                 ? "after:w-full text-[var(--color-primary)] after:bg-[var(--color-primary)]"
                 : "after:w-0 hover:after:w-full after:bg-white"
             }`}
        >
          Releases
        </Link>
        {user && favoriteMovies.length > 0 && (
          <Link
            href="/favorite"
            onClick={() => {
              scrollTo(0, 0);
              setIsOpen(false);
            }}
            className={`relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:transition-all after:duration-300
             ${pathname === "/favorite"
                ? "after:w-full text-[var(--color-primary)] after:bg-[var(--color-primary)]"
                : "after:w-0 hover:after:w-full after:bg-white"
              }`}
          >
            Favorites
          </Link> )}
      </div>

      <div className="flex items-center gap-8">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />

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
    </div>
  );
};

export default NavBar;
