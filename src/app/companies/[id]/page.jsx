import { CompanyDetailed } from "@/app/companies/[id]/_components/CompanyDetailed";
import { notFound } from "next/navigation";

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

export default async function CompanyDetailedPage({ params: { id } }) {
  const company = await getCompany(id);
  if (!company) {
    notFound();
  }
  return company && <CompanyDetailed company={company} />;
}
