"use client";
import FormMessage from "@/components/FormMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";
import { FaClock } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";

import React, { useState, useTransition } from "react";

export default function Login() {
  const router = useRouter();
  const [formMessage, setFormMessage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handleAction = (formData) => {
    setFormMessage(null);
    const [email, password] = [
      formData.get("email").toLowerCase(),
      formData.get("password"),
    ];
    if (!email || !password) {
      setFormMessage({ status: 500, message: "All fields required." });
      return;
    }
    startTransition(async () => {
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
          return;
        } else {
          setFormMessage({
            status: 200,
            message: "Success!",
          });
          router.replace("/");
          router.refresh();
        }
      } catch (error) {
        setFormMessage({
          status: 500,
          message: "Something went wrong, Please try again!",
        });
        return;
      }
    });
  };
  const handleDemo = () => {
    setFormMessage(null);
    startTransition(async () => {
      const res = await signIn("credentials", {
        email: process.env.NEXT_PUBLIC_DEMO_EMAIL,
        password: process.env.NEXT_PUBLIC_DEMO_PASSWORD,
        redirect: false,
      });
      if (res.error) {
        setFormMessage({
          status: 500,
          message: "Something went wrong, Please try again!",
        });
        return;
      } else {
        setFormMessage({
          status: 200,
          message: "Launching demo user...",
        });
        router.replace("/");
        router.refresh();
      }
    });
  };
  return (
    <main className="max-w-[1280px] m-auto p-4">
      <h1 className="sm:text-4xl text-3xl font-semibold">
        Login to an existing account:
      </h1>
      <br />
      <form action={handleAction} className="flex flex-col gap-2">
        {formMessage && (
          <span>
            <FormMessage
              status={formMessage.status}
              message={formMessage.message}
            />
          </span>
        )}
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
          <Label htmlFor="password" className="ml-1 cursor-pointer">
            Password:
          </Label>
          <Input
            id="password"
            placeholder="Your Password"
            type={passwordVisible ? "text" : "password"}
            name="password"
            required
          />
        </article>
        <small
          className="ml-1 cursor-pointer text-gray-500"
          onClick={() => {
            setPasswordVisible((prev) => !prev);
          }}
        >
          {passwordVisible ? "Hide Password" : "Show Password"}
        </small>
        <Button
          className="flex items-center gap-2"
          onClick={() => signIn("google")}
          variant="outline"
          type="button"
          disabled={isPending}
        >
          <FaGoogle />
          Login With Google
        </Button>
        <Button
          className="flex items-center gap-2"
          onClick={handleDemo}
          type="button"
          disabled={isPending}
        >
          <FaClock />
          Try with Demo
        </Button>
        <Button variant="cta" disabled={isPending}>
          {isPending ? "Logging In..." : "Log In"}
        </Button>
        <small className="ml-1">
          Don&apos;t have an account,{" "}
          <Link
            href="/register"
            className="text-[#1bbe17ff] hover:underline font-medium"
          >
            Register
          </Link>
        </small>
      </form>
    </main>
  );
}
