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
import NoResults from "@/components/NoResults";
import { motion } from "framer-motion";
import { opacityAnimation, staggerVariant } from "@/animations";

import React, { useState } from "react";

export function JobsList({ jobs }) {
  const [sortedListings, setSortedListings] = useState(jobs);
  const [sort, setSort] = useState("alphabetical");
  switch (sort) {
    case "recent":
      sortByMostRecent(sortedListings, "createdAt");
      break;
    case "oldest":
      sortByOldest(sortedListings, "createdAt");
      break;
    case "alphabetical":
      sortAlphabetically(sortedListings, "title");
      break;
  }
  return (
    <motion.main className="max-w-[1280px] m-auto p-4" {...opacityAnimation}>
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
          update={setSortedListings}
          fields={["title", "description"]}
          placeholder="Search Jobs..."
        />
      </section>
      {sortedListings?.length ? (
        <section className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4">
          {sortedListings.map((job, index) => (
            <motion.span key={job._id} custom={index} {...staggerVariant}>
              <Job job={job} displayDetailsOnHover={true} />
            </motion.span>
          ))}
        </section>
      ) : (
        <NoResults />
      )}
    </motion.main>
  );
}
