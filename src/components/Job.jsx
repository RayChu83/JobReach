import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";

import React from "react";

export function Job({ job, isDescriptionFaded, displayDetailsOnHover }) {
  return (
    <article className="group p-4 rounded-sm drop-shadow-sm outline outline-gray-300 outline-1">
      <Link
        href={`/jobs/${job._id}`}
        className="text-xl font-medium line-clamp-1 w-fit hover:text-[#1bbe17ff]"
      >
        {job.title}
      </Link>
      <Link
        href={`/companies/${job.company._id}`}
        className="text-gray-500 text-sm"
      >
        {job.company.name}
      </Link>
      <p
        className={`line-clamp-2 overflow-hidden mb-2 ${
          isDescriptionFaded && "text-fade"
        }`}
        title={job.description}
      >
        {job.description}
      </p>
      <div className="flex justify-end">
        <Button
          variant="link"
          size="paddingNone"
          asChild
          className={`group-hover:opacity-100 ${
            displayDetailsOnHover && "opacity-0"
          } transition-all duration-150`}
        >
          <Link href={`/jobs/${job._id}`}>See Details</Link>
        </Button>
      </div>
    </article>
  );
}
