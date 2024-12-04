// import logo from "@/images/image.png";

import { Protected } from "@/components/protected";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <div className="overflow-hidden min-h-screen">
      <Protected>{children}</Protected>
    // </div>
  );
}
