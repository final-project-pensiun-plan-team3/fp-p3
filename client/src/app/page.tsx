"use client";

import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { WavyBackground } from "@/components/ui/wavy-background";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Home() {
  const words = [
    { text: "Plan" },
    { text: "for" },
    { text: "your" },
    { text: "future" },
    { text: "with" },
    { text: "our" },
    { text: "PensiunPlan.", className: "text-black-500 dark:text-navy-dark" },
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
  console.log(name)

  return (
    <div className="overflow-hidden">
      {/* Floating Navbar */}
      <FloatingNav />
      
      {/* Wavy Background */}
      <WavyBackground
        className="h-screen"
        containerClassName="relative" // Ensure WavyBackground content is above the canvas
        colors={["rgb(38, 49, 64)", "rgb(139, 100, 59)", "rgb(100, 120, 141)", "rgb(229, 206, 166)", "rgb(34, 211, 238)"]}
        waveWidth={60} // Customize wave width
        backgroundFill="rgba(0, 0, 0, 0.5)" // Adjust background overlay
        blur={10} // Optional: Control blur
        speed="fast" // Optional: Control speed
        waveOpacity={0.5} // Optional: Control opacity
      >
        {/* Content inside WavyBackground */}
        <div className="flex items-center h-full justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-[60px] font-bold mb-12">Hello {name}</h1> {/* H1 size updated to 75px */}
            <TypewriterEffect className="mb-10 max-w-[950px] text-[30px]" words={words} /> {/* TypewriterEffect size updated to 16px */}
            <Link
              href={"/onboarding"}
              className="bg-secondary text-white font-bold py-2 px-6 rounded hover:bg-blue-700 border-e-base-100 transition-all ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] duration-300 text-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </WavyBackground>

      {/* Footer */}
      <Footer />
    </div>
  );
}
