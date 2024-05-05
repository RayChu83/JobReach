"use client";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { HiMenuAlt3 } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  return (
    <>
      <nav
        className={`flex justify-between p-4 max-w-[1280px] m-auto items-center ${
          mobileDropdownOpen && "flex-col"
        }`}
      >
        <Link
          className="flex items-center self-start z-20"
          href="/"
          onClick={() => setMobileDropdownOpen(false)}
        >
          <Image
            src="/logo-image.png"
            width={55}
            height={55}
            alt="logo image"
            priority
          />
          <Image
            src="/logo-text.png"
            width={150}
            height={55}
            alt="logo text"
            priority
          />
        </Link>
        <HiMenuAlt3
          onClick={() => setMobileDropdownOpen((prev) => !prev)}
          className="sm:hidden absolute top-[30px] right-[16px] text-3xl cursor-pointer z-20"
        />
        <div
          className={`sm:flex ${
            mobileDropdownOpen
              ? "flex flex-col h-[100vh] justify-center fixed w-full bg-white z-10"
              : "hidden"
          } items-center gap-6`}
        >
          <Link
            href="/"
            className={`hover:text-[#1bbe17ff] ${
              pathname === "/" && "font-semibold"
            }`}
            onClick={() => setMobileDropdownOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className={`hover:text-[#1bbe17ff] ${
              pathname === "/jobs" && "font-semibold"
            }`}
            onClick={() => setMobileDropdownOpen(false)}
          >
            Jobs
          </Link>
          <Link
            href="/companies"
            className={`hover:text-[#1bbe17ff] ${
              pathname === "/companies" && "font-semibold"
            }`}
            onClick={() => setMobileDropdownOpen(false)}
          >
            Companies
          </Link>
          <Link
            href="/profile"
            className="text-[#1bbe17ff] text-3xl"
            onClick={() => setMobileDropdownOpen(false)}
          >
            <CgProfile />
          </Link>
        </div>
      </nav>
    </>
  );
}
