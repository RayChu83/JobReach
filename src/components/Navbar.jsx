"use client";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { HiMenuAlt3 } from "react-icons/hi";
import React, { useState } from "react";

export default function Navbar() {
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  return (
<>
      <nav className="flex justify-between p-4 max-w-[1280px] m-auto items-center">
        <Link className="flex items-center" href="/">
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
          className="sm:hidden block text-3xl cursor-pointer"
        />
        <div className="sm:flex hidden items-center gap-6">
          <Link href="/" className="hover:text-[#1bbe17ff]">
            Home
          </Link>
          <Link href="/jobs" className="hover:text-[#1bbe17ff]">
            Jobs
          </Link>
          <Link href="/companies" className="hover:text-[#1bbe17ff]">
            Companies
          </Link>
          <Link href="/contact" className="hover:text-[#1bbe17ff]">
            Contact
          </Link>
        </div>
      </nav>
    </>
  );
}
