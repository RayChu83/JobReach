"use client";
import { filterBySearch } from "@/utils";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

export function SearchBar({ data, update, fields }) {
  const [search, setSearch] = useState("");
  return (
    <form
      className="flex items-center gap-2 w-[100%]"
      action={() => filterBySearch(data, update, search, fields)}
    >
      <input
        type="text"
        className="px-4 py-2 placeholder:text-black/80 outline-none bg-transparent w-[100%]"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IoSearch className="cursor-pointer text-xl hover:text-[#1bbe17ff]" />
    </form>
  );
}
