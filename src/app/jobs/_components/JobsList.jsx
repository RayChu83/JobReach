"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosOptions } from "react-icons/io";
import { Job } from "@/components/Job";
import { sortAlphabetically, sortByMostRecent, sortByOldest } from "@/utils";
import { SearchBar } from "@/components/SearchBar";

import React, { useState } from "react";

export function JobsList({ jobs }) {
  const [sortedJobs, setSortedJobs] = useState(jobs);
  const [sort, setSort] = useState("alphabetical");
  switch (sort) {
    case "recent":
      sortByMostRecent(sortedJobs, "createdAt");
      break;
    case "oldest":
      sortByOldest(sortedJobs, "createdAt");
      break;
    case "alphabetical":
      sortAlphabetically(sortedJobs, "title");
      break;
  }
  return (
    <main className="max-w-[1280px] m-auto p-4">
      <section className="flex items-center mb-4 gap-2 bg-[#F5F5F5] px-4 py-1 rounded-sm drop-shadow-sm w-[100%] hover:bg-[#F2F2F2]">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IoIosOptions className="text-xl" />
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
        <SearchBar
          data={jobs}
          update={setSortedJobs}
          fields={["title", "description"]}
          placeholder="Search Jobs..."
        />
      </section>
      <section className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4 ">
        {sortedJobs && sortedJobs.map((job) => <Job job={job} key={job._id} />)}
      </section>
    </main>
  );
}
