"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

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
        <Link href="/" className="btn btn-ghost text-xl">
          Home
        </Link>
        <Link href="/dashboard" className="btn btn-ghost text-xl p-0">
          Dashboard
        </Link>
      </div>

      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar mr-4"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                width={40}
                height={40}
              />
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
    </div>
  );
}
