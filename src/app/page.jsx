import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PreviewJobs from "@/components/PreviewJobs";
import SocialProof from "@/components/SocialProof";
import React from "react";

export default function Home() {
  return (
    <main>
      <Hero />
      <PreviewJobs />
      <SocialProof />
      <hr className="max-w-[1280px] m-auto"/>
      <Footer />
    </main>
  );
}
