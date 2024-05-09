"use client";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

import React from "react";

export default function Error({ reset }) {
  return (
    <main className="max-w-[1280px] m-auto text-center top-[42%] sticky">
    <section className="max-w-[400px] flex flex-col items-center m-auto gap-2">
      <h1 className="flex gap-2 items-center text-7xl font-bold text-red-500">
          500
      </h1>
    <h3 className="text-lg font-medium">
      Something went wrong, please try again later or contact us if the problem continues!
    </h3>
    <div className="flex gap-2 items-center justify-center">
      <Button className="w-fit" variant="destructive" onClick={reset}>
        Try Again
      </Button>
      <Button asChild className="w-fit">
          <Link href="/">Back To Home</Link>
      </Button>
    </div>
    </section>
  </main>
  );
}
