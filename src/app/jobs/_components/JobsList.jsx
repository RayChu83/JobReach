"use client"
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosOptions } from "react-icons/io";
import { Job } from "@/components/Job";

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

export function JobsList({ jobs }) {
  console.log(jobs);
  const [sort, setSort] = useState("alphabetical");
  switch (sort) {
    case "recent":
      sortByMostRecent(jobs, "createdAt");
      break;
    case "oldest":
      sortByOldest(jobs, "createdAt");
      break;
    case "alphabetical":
      sortAlphabetically(jobs, "title");
      break;
  }
  return (
    <main className="max-w-[1280px] m-auto p-4">
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
      <section className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4 ">
        {jobs &&
          jobs.map((job) => (
            <Job job={job} key={job._id}/>
          ))}
      </section>
    </main>
  );
}
