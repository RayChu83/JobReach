"use client";
import FormMessage from "@/components/FormMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [formMessage, setFormMessage] = useState(null);
  const [pending, setPending] = useState(false);
  const handleAction = async (formData) => {
    setFormMessage(null);
    const [email, password] = [
      formData.get("email").toLowerCase(),
      formData.get("password"),
    ];
    if (!email || !password) {
      setFormMessage({ status: 500, message: "All fields required." });
      return;
    }
    setPending(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setFormMessage({
          status: 500,
          message: "Invalid email or password.",
        });
        setPending(false);
        return;
      } else {
        setFormMessage({
          status: 200,
          message: "Success",
        });
        router.replace("/");
        router.refresh()
      }
    } catch (error) {
      setFormMessage({
        status: 500,
        message: "Something went wrong, Please try again.",
      });
      setPending(false);
      return;
    }
    setPending(false);
  };
  return (
    <main className="max-w-[1280px] m-auto p-4">
      <h1 className="sm:text-4xl text-3xl font-semibold">
        Login to an existing account:
      </h1>
      <br />
      <form action={handleAction} className="flex flex-col">
        {formMessage && (
          <span className="mb-4">
            <FormMessage
              status={formMessage.status}
              message={formMessage.message}
            />
          </span>
        )}
        <article className="mb-4">
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
        <article className="mb-2">
          <Label htmlFor="password" className="ml-1 cursor-pointer">
            Password:
          </Label>
          <Input
            id="password"
            placeholder="Your Password"
            type="password"
            name="password"
            required
          />
        </article>
        <small className="mb-2 ml-1">
          Don&apos;t have an account,{" "}
          <Link
            href="/register"
            className="text-[#1bbe17ff] hover:underline font-medium"
          >
            Register
          </Link>
        </small>
        <Button className="w-fit" variant="cta" disabled={pending}>
          {pending ? "Logging In..." : "Log In"}
        </Button>
      </form>
    </main>
  );
}
