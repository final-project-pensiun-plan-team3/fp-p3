"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* Main 1 */}
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('https://placehold.co/1920x1080')" }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-6">HELLO THERE</h1>
            <p className="text-lg mb-6">
              Plan for your future with our PensiunPlan. Fill in your income,
              percentage of savings, and age to get started.
            </p>
            <Link
              href={"/onboarding"}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
