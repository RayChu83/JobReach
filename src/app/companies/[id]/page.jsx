import { FaLocationDot } from "react-icons/fa6";
import { CompanyListings } from "@/app/companies/[id]/_components/CompanyListings";
import {notFound} from "next/navigation"

import React from "react";

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
  if (!company) {
    notFound()
  }
  return (
    <main className="max-w-[1280px] m-auto p-4 flex flex-col-reverse md:grid grid-cols-10 gap-4">
      {company && (
        <>
          <section className="md:col-span-6 flex flex-col gap-4">
            <CompanyListings company={company} />
          </section>
          <article className="md:col-span-4 block md:sticky top-[96px] p-4 h-fit bg-[#F5F5F5] rounded-sm drop-shadow-sm">
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
