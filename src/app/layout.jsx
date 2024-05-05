import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ViewTransitions } from "next-view-transitions";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JobReach | Search over 100+ job opportunities",
  description:
    "JobReach is a online platform where you can discover 100+ different jobs, filter through jobs to your specific requirements, and apply to those positions.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${inter.className} min-h-[101vh]`}>
          <SessionProvider session={session}>
            <Navbar />
            {children}
          </SessionProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}