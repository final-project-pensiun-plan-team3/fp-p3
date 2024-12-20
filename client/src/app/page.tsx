"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
// import { WavyBackground } from "@/components/ui/wavy-background";
import Link from "next/link";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
const WavyBackground = dynamic(
  () =>
    import("@/components/ui/wavy-background").then((mod) => mod.WavyBackground),
  { ssr: false }
);

export default function Home() {
  const words = [
    { text: "Plan" },
    { text: "for" },
    { text: "your" },
    { text: "future" },
    { text: "with" },
    {
      text: "PensiunPlan.",
      className: "text-black-500 text-gold-classic",
    },
    { text: "Fill" },
    { text: "in" },
    { text: "your" },
    { text: "income," },
    { text: "percentage" },
    { text: "of" },
    { text: "savings," },
    { text: "and" },
    { text: "age" },
    { text: "to" },
    { text: "get" },
    { text: "started." },
  ];

  const name = Cookies.get("username");
  const greeting = name ? `Hello, ${name}!` : "Welcome to PensiunPlan!";
  // console.log(name);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Floating Navbar */}
      <FloatingNav />
  
      {/* Wavy Background */}
      <WavyBackground
        className="flex flex-col flex-grow"
        containerClassName="relative"
        colors={[
          "rgb(38, 49, 64)",
          "rgb(139, 100, 59)",
          "rgb(100, 120, 141)",
          "rgb(229, 206, 166)",
          "rgb(34, 211, 238)",
        ]}
        waveWidth={60}
        backgroundFill="rgba(0, 0, 0, 0.5)"
        blur={10}
        speed="fast"
        waveOpacity={0.5}
      >
        {/* Main Content */}
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="text-center text-white w-full max-w-4xl">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">{greeting}</h1>
            
            {/* Typewriter Effect */}
            <TypewriterEffect
              className="mb-10 max-w-[950px] text-xl sm:text-2xl md:text-3xl"
              words={words}
            />
  
            {/* Get Started Button */}
            <Link
              href={"/onboarding"}
              className="bg-secondary text-white font-bold py-2 px-6 rounded hover:bg-blue-700 border-e-base-100 transition-all ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] duration-300 text-lg sm:text-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
  
        {/* Footer */}
        <div className="text-center mt-auto py-4 text-white">
          <p className="text-sm sm:text-base">
            © {new Date().getFullYear()} - PensiunPlan | All rights reserved
          </p>
        </div>
      </WavyBackground>
    </div>
  );
  


}
