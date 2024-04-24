"use client";
import { IoIosOptions } from "react-icons/io";
import React, { useState } from "react";
import { Company } from "@/app/companies/_components/Company";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function sortByMostRecent(array, timeProperty) {
  return array.sort(
    (a, b) => new Date(b[timeProperty]) - new Date(a[timeProperty])
  );
}

function sortByOldest(array, timeProperty) {
  return array.sort(
    (a, b) => new Date(a[timeProperty]) - new Date(b[timeProperty])
  );
}

function sortAlphabetically(array, propertyName) {
  return array.sort((a, b) => a[propertyName].localeCompare(b[propertyName]));
}

export default function CompaniesList({ companies }) {
  const [sort, setSort] = useState("alphabetical");
  switch (sort) {
    case "recent":
      sortByMostRecent(companies, "createdAt");
      break;
    case "oldest":
      sortByOldest(companies, "createdAt");
      break;
    case "alphabetical":
      sortAlphabetically(companies, "name");
      break;
  }
  return (
    <main className="max-w-[1280px] p-4 m-auto">
      <DropdownMenu className="ml-auto">
        <DropdownMenuTrigger className="flex items-center gap-1 ml-auto outline-none">
          <IoIosOptions />
          Sort
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setSort("alphabetical");
            }}
            className={sort === "alphabetical" && "font-semibold"}
          >
            A-Z
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSort("recent");
            }}
            className={sort === "recent" && "font-semibold"}
          >
            Most Recent
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSort("oldest");
            }}
            className={sort === "oldest" && "font-semibold"}
          >
            Most Oldest
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4">
        {companies &&
          companies.map((company) => (
            <Company key={company._id} company={company} />
          ))}
      </section>
    </main>
  );
}
