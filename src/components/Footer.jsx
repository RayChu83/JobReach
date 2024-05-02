import Image from "next/image";
import { Link } from "next-view-transitions";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { FaQuestionCircle } from "react-icons/fa";

import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col md:grid grid-cols-2 gap-4 max-w-[1280px] m-auto px-4 py-8 items-center">
      <div className="w-full">
        <Link className="flex items-center w-fit" href="/">
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
        <article className="flex items-center gap-4 flex-wrap text-gray-500">
          &copy; JobReach, all rights reserved
        </article>
        <p className="mb-2">
          JobReach is a online platform where you can discover 100+ different
          jobs, filter through jobs to your specific requirements, and apply to
          those positions.
        </p>
        <Button asChild variant="link" size="paddingNone">
          <Link href="/jobs">See Opportunities</Link>
        </Button>
      </div>
      <div className="w-full">
        <article className="flex items-center gap-4 flex-wrap">
          <FaLocationDot />
          New York, Manhattan
        </article>
        <article className="flex items-center gap-4 flex-wrap">
          <FaPhoneAlt /> 123-456-7890
        </article>
        <article className="flex items-center gap-4 flex-wrap">
          <IoMdMail />
          contact@jobreach.com
        </article>
        <article className="flex items-center gap-4 flex-wrap">
          <FaQuestionCircle />
          <Link href="/contact">Frequently asked questions</Link>
        </article>
      </div>
    </footer>
  );
}
