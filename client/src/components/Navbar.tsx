"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

type NavbarProps = {
  theme?: "light" | "dark";
};

export default function Navbar({ theme = "light" }: NavbarProps) {
  const router = useRouter();
  const avatar = Cookies.get("avatar");
  const name = Cookies.get("name");

  const handleLogout = () => {
    router.push("/login");
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="navbar sticky top-0">
      <Image
        src="/images/PensiunPlan.png"
        alt="PensiunPlan"
        className="ml-4"
        width={50}
        height={50}
      />
      <div className="flex-1 flex justify-center space-x-4">
        <Link
          href="/"
          className={`${
            theme === "light" ? "text-neutral" : "text-white"
          } text-xl font-semibold`}
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className={`${
            theme === "light" ? "text-neutral" : "text-white"
          } text-xl font-semibold p-0`}
        >
          Dashboard
        </Link>
      </div>
      {isMounted && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mr-4"
            >
              <div className="w-10 rounded-full">
                {avatar ? (
                  <Image
                    alt="Tailwind CSS Navbar component"
                    src={avatar}
                    width={40}
                    height={40}
                  />
                ) : (
                  <span className="text-xl">{name?.[0] || ""}</span>
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-30 p-2 shadow text-red-500 border-2 border-red-500"
            >
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
