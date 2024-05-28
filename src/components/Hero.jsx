"use client";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { opacityLeftAnimation, opacityRightAnimation } from "@/animations";

import React from "react";

export default function Hero() {
  return (
    <section className="flex items-center justify-between max-w-[1280px] m-auto flex-wrap p-4 gap-4">
      <motion.div
        className="flex flex-col gap-y-4"
        {...opacityRightAnimation}
      >
        <h1 className="sm:text-[42px] text-[32px] sm:leading-[50px] leading-[40px] font-semibold">
          Explore over 100+
          <span className="text-[#1bbe17ff] drop-shadow-[0_0_125px_rgba(27,190,23,0.75)]">
            {" "}
            Job <br /> Opportunities
          </span>
          , awaiting you!
        </h1>
        <Button variant="cta" asChild className="w-fit">
          <Link href="/jobs">Explore Jobs</Link>
        </Button>
      </motion.div>
      <motion.div
        {...opacityLeftAnimation}
      >
        <Image
          src={`/hero.png`}
          alt="hero"
          height="500"
          width="500"
        />
      </motion.div>
    </section>
  );
}
