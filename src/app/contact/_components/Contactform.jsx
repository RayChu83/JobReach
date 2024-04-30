"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormMessage from "@/app/contact/_components/FormMessage";
import emailjs from "@emailjs/browser";

import React, { useState, useRef } from "react";

export default function Contactform() {
  const [formMessage, setFormMessage] = useState(null);
  const form = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(() => {
        setFormMessage({ status: 200, message: "Message Sent" });
      }),
      (error) => {
        setFormMessage({
          status: 500,
          message: "An error occurred, please try again!",
        });
      };
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-4 w-full"
      ref={form}
    >
      {formMessage && (
        <FormMessage
          status={formMessage.status}
          message={formMessage.message}
        />
      )}
      <Input placeholder="Name" name="name" required />
      <Input type="email" placeholder="Email" name="email" required />
      <Textarea placeholder="Message" rows="3" name="message" required />
      <Button type="submit" variant="cta">
        Send
      </Button>
    </form>
  );
}
