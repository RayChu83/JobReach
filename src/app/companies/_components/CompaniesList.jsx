"use client";
import { IoIosOptions } from "react-icons/io";
import { Company } from "@/app/companies/_components/Company";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortAlphabetically, sortByMostRecent, sortByOldest } from "@/utils";
import { SearchBar } from "@/components/SearchBar";

import React, { useState } from "react";
import NoResults from "@/components/NoResults";

export default function CompaniesList({ companies }) {
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [sort, setSort] = useState("alphabetical");
  switch (sort) {
    case "recent":
      sortByMostRecent(filteredCompanies, "createdAt");
      break;
    case "oldest":
      sortByOldest(filteredCompanies, "createdAt");
      break;
    case "alphabetical":
      sortAlphabetically(filteredCompanies, "name");
      break;
  }
  return (
    <main className="max-w-[1280px] p-4 m-auto">
      <section className="flex items-center mb-4 gap-2 bg-[#F5F5F5] w-[100%] px-4 py-1 rounded-sm drop-shadow-sm hover:bg-[#F2F2F2]">
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto outline-none">
            <IoIosOptions className="text-xl"/>
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
        <SearchBar data={companies} update={setFilteredCompanies} fields={["name", "description"]} placeholder="Search Companies..."/>
      </section>
          {filteredCompanies?.length ? (
          <section className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4">
            {filteredCompanies.map((company) => <Company key={company._id} company={company} />)}
          </section>
        ) : (
          <NoResults />
        )}
    </main>
  );
}
