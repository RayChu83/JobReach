"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";

export default function Contactform() {
  return (
    <form action="" className="flex flex-col gap-y-4 w-full">
      <Input placeholder="Your Name" />
      <Input type="email" placeholder="Email" />
      <Textarea placeholder="Message" rows="3" />
      <Button variant="cta">Send</Button>
    </form>
  );
}
