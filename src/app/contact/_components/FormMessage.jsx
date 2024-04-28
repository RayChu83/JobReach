import { BiSolidError } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";

import React from 'react'

export default function FormMessage({status, message}) {
  return (
    <section className={`${status === 500 ? "bg-red-500/80" : "bg-[#1bbe17ff]"} w-full text-white rounded-sm py-2 px-3 drop-shadow-sm font-medium flex items-center gap-2 justify-center`}>
        {status === 500 ? <BiSolidError /> : <FaCheckCircle />}
        {message}
    </section>
  )
}
