"use client";
import { Apply } from "@/components/Apply";
import { SearchBar } from "@/components/SearchBar";
import { Link } from "next-view-transitions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosOptions } from "react-icons/io";
import { sortAlphabetically, sortByMostRecent, sortByOldest } from "@/utils";
import NoResults from "@/components/NoResults";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { opacityUpwardsAnimation, slowStaggerVariant } from "@/animations";

import React, { useState } from "react";

export function CompanyDetailed({ company }) {
  const [sortedListings, setSortedListings] = useState(company.listings);
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
    <>
      <motion.main
        className="max-w-[1280px] m-auto p-4 flex flex-col-reverse md:grid grid-cols-10 gap-4"
        {...opacityUpwardsAnimation}
      >
        {company && (
          <>
            <section className="md:col-span-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 bg-[#F5F5F5] px-4 py-1 rounded-sm drop-shadow-sm w-[100%] hover:bg-[#F2F2F2]">
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
                  data={company.listings}
                  update={setSortedListings}
                  fields={["title", "description"]}
                  placeholder="Search Jobs..."
                />
              </div>
              {sortedListings?.length ? (
                sortedListings.map((listing, index) => (
                  <motion.article
                    className="p-4 rounded-sm outline outline-gray-300 outline-1 drop-shadow-sm"
                    key={listing._id}
                    custom={index}
                    {...slowStaggerVariant}
                  >
                    <Link
                      href={`/jobs/${listing._id}`}
                      className="text-xl font-medium hover:text-[#1bbe17ff]"
                    >
                      {listing.title}
                    </Link>
                    <br />
                    <Link
                      href={`/companies/${listing.company}`}
                      className="text-gray-500 text-sm"
                    >
                      {company.name}
                    </Link>
                    <p className="mb-2">{listing.description}</p>
                    <div className="flex justify-end">
                      <Apply id={listing._id} appliedUsers={listing.applied} />
                    </div>
                  </motion.article>
                ))
              ) : (
                <NoResults />
              )}
            </section>
            <article className="md:col-span-4 block md:sticky top-[96px] p-4 h-fit bg-[#F5F5F5] rounded-sm drop-shadow-sm">
              <h1 className="text-2xl font-semibold">{company.name}</h1>
              <small className="text-gray-500 flex items-center gap-1">
                <FaLocationDot />
                {company.location}
              </small>
              <p>{company.description}</p>
            </article>
          </>
        )}
      </motion.main>
    </>
  );
}
