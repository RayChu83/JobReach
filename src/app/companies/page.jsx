import React from "react";
import { Link } from "next-view-transitions";
import CompaniesList from "@/app/companies/_components/CompaniesList";

const getCompanies = async () => {
  "use server";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/companies`, {
      method: "get",
    });
    const { companies } = await res.json();
    return companies;
  } catch (error) {
    throw new Error("Failed to load companies, please try again!");
  }
};

export default async function Companies() {
  const companies = await getCompanies();
  return(companies && <CompaniesList companies={companies} />)
}
