"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormMessage from "@/components/FormMessage";
import { Label } from "@/components/ui/label";
import emailjs from "@emailjs/browser";

import React, { useState, useRef, useTransition } from "react";

export default function Contactform() {
  const [formMessage, setFormMessage] = useState(null);
  const [isPending, startTransition] = useTransition();
  const form = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(() => {
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
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-2 w-full"
      ref={form}
    >
      {formMessage && (
        <FormMessage
          status={formMessage.status}
          message={formMessage.message}
        />
      )}
      <article>
        <Label htmlFor="name" className="ml-1 cursor-pointer">
          Name:
        </Label>
        <Input placeholder="Your Name" id="name" name="name" required />
      </article>
      <article>
        <Label htmlFor="email" className="ml-1 cursor-pointer">
          Email:
        </Label>
        <Input
          placeholder="Your Email"
          id="email"
          type="email"
          name="email"
          required
        />
      </article>
      <article>
        <Label htmlFor="message" className="ml-1 cursor-pointer">
          Message:
        </Label>
        <Textarea
          placeholder="Your Message"
          id="message"
          rows="3"
          name="message"
          required
        />
      </article>
      <Button type="submit" variant="cta" disabled={isPending}>
      {isPending ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}
