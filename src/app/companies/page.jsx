import Link from "next/link";
import React from "react";

const getCompanies = async () => {
  "use server";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/companies`);
    const { companies } = await res.json();
    return companies;
  } catch (error) {
    throw new Error("Failed to load companies, please try again!");
  }
};

export default async function Companies() {
  const companies = await getCompanies()
  return (
    <main className="max-w-[1280px] p-4 m-auto grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1p-4 gap-4">
      {companies.map((company) => (
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
            {company.listings.length} job{company.listings.length !== 1 && "s"}{" "}
            open
          </small>
          <p className="line-clamp-4">{company.description}</p>
        </article>
      ))}
    </main>
  );
}
