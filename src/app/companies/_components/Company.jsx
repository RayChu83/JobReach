import { Link } from "next-view-transitions";

import React from "react";

export function Company({ company }) {
  return (
    <article className="p-4 rounded-sm drop-shadow-sm outline outline-gray-300 outline-1">
      <Link
        href={`/companies/${company._id}`}
        className="text-xl font-medium w-fit hover:text-[#1bbe17ff]"
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
  );
}
