"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Contactform from "@/app/contact/_components/Contactform";
import { motion } from "framer-motion";
import { opacityUpwardsAnimation } from "@/animations";

import React from "react";

export default function Contact() {
  return (
    <motion.main className="p-4 max-w-[1280px] m-auto" {...opacityUpwardsAnimation}>
      <h2 className="text-3xl font-medium">Frequently Asked Questions:</h2>
      <br />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is JobReach free-to-use?</AccordionTrigger>
          <AccordionContent>
            Yes, JobReach is completely free to use. Apply to as many positions
            as you&apos;d like.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does JobReach work?</AccordionTrigger>
          <AccordionContent>
            Employers or Organizations looking to hire post job listings, and
            based on your interests, you may apply for these positions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Who can see my profile?</AccordionTrigger>
          <AccordionContent>
            Only employers have access to view your profile; other users do not
            have permission.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <br />
      <h2 className="text-3xl font-medium">Contact Form:</h2>
      <br />
      <section className="flex justify-between gap-8 flex-col sm:flex-row">
        <Contactform />
        <div className="w-full mt-[18px]">
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
        </div>
      </section>
      <br />
    </motion.main>
  );
}
