import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="px-6 mt-20 md:px-16 lg:px-36 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14">
        <div className="md:max-w-96">
          <Image
            alt=""
            className="w-36 h-auto"
            src={assets.logo}
            width={144}
            height={36}
          />
          <p className="mt-6 text-sm">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Image
              src={assets.googlePlay}
              alt="google play"
              className="h-9 w-auto "
              width={120}
              height={120}
            />
            <Image
              src={assets.appStore}
              alt="app store"
              className="h-9 w-auto "
              width={120}
              height={120}
            />
          </div>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="#">Home</Link>
              </li>
              <li>
                <Link href="#">About us</Link>
              </li>
              <li>
                <Link href="#">Contact us</Link>
              </li>
              <li>
                <Link href="#">Privacy policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+1-234-567-890</p>
              <p>contact@example.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-sm pb-5">
        Copyright {new Date().getFullYear()} ©{" "}
        <Link href="/">Seatify</Link>. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
