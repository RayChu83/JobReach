import CompaniesList from "@/app/companies/_components/CompaniesList";

import React from "react";

export const metadata = {
  title : "See Companies - JobReach"
}

const getCompanies = async () => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/companies`, {
    method: "get",
    cache : "no-store",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const resData = await res.json();
  if (!res.ok || !resData?.companies) {
    throw new Error("Failed to fetch companies, please try again!")
  }
  return resData.companies;
};

export default async function Companies() {
  const companies = await getCompanies();
  return companies && <CompaniesList companies={companies} />;
}
