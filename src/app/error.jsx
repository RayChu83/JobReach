"use client"

import React from 'react'
import { Button } from '@/components/ui/button';
import { Link } from 'next-view-transitions';

import { BiSolidError } from "react-icons/bi";

export default function Error({error, reset}) {
  return (
    <main className="max-w-[1280px] m-auto text-center">
        <h1 className="text-2xl font-semibold flex gap-2 items-center justify-center"><BiSolidError/>{error.message || "An error occurred, please try again!"}</h1>
        <br />
        <div className="flex gap-4 items-center justify-center">
            <Button variant="destructive" onClick={reset}>Try Again</Button>
            <Button asChild><Link href="/">Go Home</Link></Button>
        </div>
    </main>
  )
}
