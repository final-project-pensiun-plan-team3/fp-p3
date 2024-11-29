import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export function Protected({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const authCookie = cookies().has("Authorization");
  if (authCookie) {
    redirect("/");
  }

  return children;
}
