import React from "react";
import { Link } from "next-view-transitions";
import { Apply } from "@/components/Apply";
import { FaLocationDot } from "react-icons/fa6";

export async function generateMetadata({ params: { id } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/companies/${id}`, {
    method: "get",
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();
  return {
    title: `${resData.company?.name || "Unknown"} - JobReach`,
  };
}

const getCompany = async (id) => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/companies/${id}`, {
    method: "get",
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();
  if (!res.ok || !resData.company) {
    throw new Error("Failed to find company, please try again!");
  }
  return resData.company;
};

export default async function CompanyDetail({ params: { id } }) {
  const company = await getCompany(id);
  return (
    <main className="max-w-[1280px] m-auto p-4 flex flex-col-reverse md:grid grid-cols-10 gap-4">
      {company && (
        <>
          <section className="md:col-span-6 flex flex-col gap-4">
            {company.listings.length ? (
              company.listings.map((listing) => (
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
                    <Apply id={listing._id} />
                  </div>
                </article>
              ))
            ) : (
              <p></p>
            )}
          </section>
          <article className="md:col-span-4 block md:sticky top-[108px] p-4 h-fit bg-[#F5F5F5] rounded-sm drop-shadow-sm">
            <h1 className="text-2xl font-medium">{company.name}</h1>
            <small className="text-gray-500 flex items-center gap-1">
              <FaLocationDot />
              {company.location}
            </small>
            <p>{company.description}</p>
          </article>
        </>
      )}
    </main>
  );
}
