// import logo from "@/images/image.png";

// import { Protected } from "@/components/protected";
import { ProtectedDashboard } from "@/components/protectedDashboard";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedDashboard>{children}</ProtectedDashboard>;
}
