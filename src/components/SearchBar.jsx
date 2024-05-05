"use client";
import { filterBySearch } from "@/utils";
import { IoSearch } from "react-icons/io5";

import React from "react";

export function SearchBar({ data, update, fields, placeholder}) {
  return (
    <form
      className="flex items-center gap-2 w-[100%]"
      action={(formData) => {
        const search = formData.get("search");
        filterBySearch(data, update, search, fields);
      }}
    >
      <input
        type="text"
        name="search"
        className="px-4 py-1 placeholder:text-black/80 outline-none bg-transparent w-[100%]"
        placeholder={placeholder}
        onChange={(e) => filterBySearch(data, update, e.target.value, fields)}
      />
      <button type="submit">
        <IoSearch className="cursor-pointer text-xl" />
      </button>
    </form>
  );
}
