"use client";
import { Link } from "next-view-transitions";
import { IoIosOptions } from "react-icons/io";
import React, { useState } from "react";

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
        <DropdownMenuTrigger className="flex items-center gap-1 text-lg ml-auto font-medium outline-none">
          <IoIosOptions />
          Filters
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
      <section className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1p-4 gap-4">
        {companies &&
          companies.map((company) => (
            <article
              key={company._id}
              className="bg-[#F5F5F5] p-4 rounded-sm drop-shadow-sm"
            >
              <Link
                href={`/companies/${company._id}`}
                className="text-xl font-medium hover:underline"
              >
                {company.name}
              </Link>
              <br />
              <small className="text-gray-500">
                {company.listings.length} job
                {company.listings.length !== 1 && "s"} open
              </small>
              <p className="line-clamp-4">{company.description}</p>
            </article>
          ))}
      </section>
    </main>
  );
}
