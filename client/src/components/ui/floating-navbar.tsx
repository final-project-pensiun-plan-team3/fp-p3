"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { deleteCookies } from "@/action";

// Komponen untuk navbar floating dengan logo dan avatar
export const FloatingNav = ({
  navItems = [], // Default to an empty array
  className,
}: {
  navItems?: { name: string; link: string; icon?: JSX.Element }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); 
  const avatar = Cookies.get("avatar"); 
  // const name = Cookies.get("username"); 
  const token = Cookies.get("Authorization"); 
  const router = useRouter();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      const direction = previous !== undefined ? current - previous : 0;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true); // Show navbar when scroll is at the top
      } else {
        if (direction < 0) {
          setVisible(true); // Show navbar when scrolling down
        } else {
          setVisible(false); // Hide navbar when scrolling up
        }
      }
    }
  });

  const handleLogout = () => {
    Cookies.remove("Authorization");
    Cookies.remove("avatar");
    Cookies.remove("username");
    deleteCookies(["Authorization", "username", "avatar"]);
    router.push("/login");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Tidak merender komponen jika belum mounted
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "flex max-w-fit fixed top-2 inset-x-0 mx-auto border border-transparent dark:border-white/[0.5] rounded-full dark:bg-black bg-white shadow-lg z-[5000] pr-4 pl-6 py-2 items-center justify-between space-x-6",
          className
        )}
      >
        {/* Logo - kiri */}
        <Link href="/" passHref>
          <Image
            src="/images/PensiunPlan.png"
            alt="PensiunPlan"
            width={50}
            height={50}
            className=""
          />
        </Link>

        {/* Daftar Navigasi */}
        <div className="flex-1 flex justify-center space-x-4">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-2 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          ))}

          {/* Tombol Home */}
          <Link href="/" passHref>
            <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <span>Home</span>
            </button>
          </Link>

          {/* Tombol Dashboard */}
          <Link href="/dashboard" passHref>
            <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <span>Dashboard</span>
            </button>
          </Link>
        </div>

        {/* Avatar dan dropdown logout */}
        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
            className="cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              {avatar ? (
                <Image src={avatar} alt="Avatar" width={50} height={50} />
              ) : (
                <Image
                  src={"/images/image.png"}
                  alt="Avatar"
                  width={50}
                  height={50}
                />
              )}
            </div>
          </div>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-4 w-35 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              <ul className="py-2 text-sm text-gray-800 dark:text-white">
                <li>
                  {token ? (
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/login")}
                      className="block px-4 py-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Login
                    </button>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
