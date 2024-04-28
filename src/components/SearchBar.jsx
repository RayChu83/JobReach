"use client";
import { filterBySearch } from "@/utils";
import { IoSearch } from "react-icons/io5";

import React, { useState } from "react";

export function SearchBar({ data, update, fields }) {
  const [search, setSearch] = useState("");
  return (
    <form
      className="flex items-center gap-2 w-[100%]"
      action={() => filterBySearch(data, update, search, fields)}
    >
      <input
        type="text"
        className="px-4 py-1 placeholder:text-black/80 outline-none bg-transparent w-[100%]"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">
        <IoSearch className="cursor-pointer text-xl text-[#1bbe17ff]" />
      </button>
    </form>
  );
}
