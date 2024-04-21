import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JobReach | Search over 100+ job opportunities",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${inter.className} min-h-[101vh]`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
