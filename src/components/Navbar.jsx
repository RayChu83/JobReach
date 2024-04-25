"use client"
import Image from "next/image";
import { Link } from "next-view-transitions";
import React from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between p-4 max-w-[1280px] m-auto">
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
        <div className="sm:flex items-center gap-6 hidden">
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
