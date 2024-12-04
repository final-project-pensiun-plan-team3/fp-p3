// import logo from "@/images/image.png";

// import { Protected } from "@/components/protected";
import  ProtectedOnBoard from "@/components/ProtectingOnBoard";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedOnBoard>{children}</ProtectedOnBoard>;
}
