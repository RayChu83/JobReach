import React from "react";

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

export default function Contact() {
  return (
    <main className="p-4 max-w-[1280px] m-auto">
      <h2 className="text-3xl font-medium">Frequently Asked Questions:</h2>
      <br />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is JobReach free-to-use?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
            eligendi autem id, sunt consequuntur nulla odio laborum expedita
            fuga repellendus? Veniam, eveniet.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does JobReach work?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
            totam? Omnis, minima magni? At, repudiandae porro.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Are there any remote positions?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            sapiente est itaque culpa assumenda nemo dicta ipsum iusto.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <br />
      <h2 className="text-3xl font-medium">Contact Form:</h2>
      <br />
      <section className="flex justify-between gap-8 flex-col sm:flex-row">
        <Contactform />
        <div className="w-full">
          <article className="flex text-lg items-center gap-4 flex-wrap">
            <FaLocationDot />
            New York, Manhattan
          </article>
          <article className="flex text-lg items-center gap-4 flex-wrap">
            <FaPhoneAlt /> 123-456-7890
          </article>
          <article className="flex text-lg items-center gap-4 flex-wrap">
            <IoMdMail />
            contact@jobreach.com
          </article>
        </div>
      </section>
      <br />
    </main>
  );
}
