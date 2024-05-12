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

import React, { useState } from "react";

export function CompanyListings({ company }) {
  const [sortedData, setSortedData] = useState(company.listings);
  const [sort, setSort] = useState("alphabetical");
  switch (sort) {
    case "recent":
      sortByMostRecent(sortedData, "createdAt");
      break;
    case "oldest":
      sortByOldest(sortedData, "createdAt");
      break;
    case "alphabetical":
      sortAlphabetically(sortedData, "title");
      break;
  }
  return (
    <>
      <section className="flex items-center gap-2 bg-[#F5F5F5] px-4 py-1 rounded-sm drop-shadow-sm w-[100%] hover:bg-[#F2F2F2]">
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
          update={setSortedData}
          fields={["title", "description"]}
          placeholder="Search Jobs..."
        />
      </section>
      {sortedData?.length ? (
        sortedData.map((listing) => (
          <article
            className="p-4 rounded-sm outline outline-gray-300 outline-1 drop-shadow-sm"
            key={listing._id}
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
          </article>
        ))
      ) : (
        <NoResults />
      )}
    </>
  );
}
