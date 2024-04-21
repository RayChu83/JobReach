import React from "react";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex items-center justify-between max-w-[1280px] m-auto flex-wrap p-4 gap-4">
      <div className="flex flex-col gap-y-4">
        <h1 className="sm:text-[42px] text-[32px] sm:leading-[50px] leading-[40px] font-semibold text-gray-700">
          Explore over 100+
          <span className="text-[#1bbe17ff] drop-shadow-[0_0_125px_rgba(27,190,23,0.5)]">
            {" "}
            Job <br /> Opportunities
          </span>
          , awaiting you!
        </h1>
        <Button variant="cta" asChild className="w-fit">
          <Link href="/jobs">View Jobs</Link>
        </Button>
      </div>
      <div>
        <Image
          src={`/hero.png`}
          alt="hero"
          height="500"
          width="500"
          className="bg-[#F5F5F5] rounded-tl-[45%] rounded-br-[45%] rounded-bl-2xl rounded-tr-2xl p-2 drop-shadow-sm"
        />
      </div>
    </section>
  );
}
