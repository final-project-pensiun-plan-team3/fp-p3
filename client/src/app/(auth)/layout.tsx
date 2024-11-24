import Link from "next/link";
// import logo from "@/images/image.png";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="navbar bg-base-100 ">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            {/* <Image
              src={logo}
              alt="logo"
              width={130}
              style={{ background: "none" }}
            /> */}
          </Link>
        </div>
      </div>

      {children}
    </>
  );
}
