import React from "react";
import CompaniesList from "@/app/companies/_components/CompaniesList";

const getCompanies = async () => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/companies`, {
    method: "get",
    cache : "no-cache"
  });
  const { companies } = await res.json();
  if (!res.ok || !companies) {
    throw new Error("Failed to fetch companies, please try again!");
  }
  return companies;
};

export default async function Companies() {
  const companies = await getCompanies();
  return companies && <CompaniesList companies={companies} />;
}
