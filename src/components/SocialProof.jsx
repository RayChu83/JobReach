"use client";
import { getSocialProof } from "@/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { opacityAnimation, slowStaggerVariant } from "@/animations";

import React from "react";

export default function SocialProof() {
  const socialProof = getSocialProof();
  return (
    <motion.section
      className="max-w-[1280px] m-auto p-4"
      {...opacityAnimation}
    >
      <h1 className="text-3xl font-medium">What our users have to say:</h1>
      <br />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1p-4 gap-4 items-start">
        {socialProof &&
          socialProof.map((person, index) => (
            <motion.article
              className="p-4 rounded-sm drop-shadow-sm flex flex-col gap-2"
              key={person.name}
              custom={index}
              {...slowStaggerVariant}
            >
              <Image
                src={person.headshotSrc}
                alt={person.name}
                width={100}
                height={100}
                className="rounded-full m-auto bg-[#F5F5F5]"
              />
              <h3 className="text-xl font-medium text-center">{person.name}</h3>
              <small className="text-gray-500 text-center">{person.role}</small>
              <p className="text-center text-gray-500 line-clamp-3">
                {person.message}
              </p>
            </motion.article>
          ))}
      </div>
    </motion.section>
  );
}
