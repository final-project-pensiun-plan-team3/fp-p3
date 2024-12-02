import { redirect } from "next/navigation";
import axios from "axios";
import { ReactElement } from "react";
import { cookies } from "next/headers";

export default async function ProtectedOnBoard({
  children,
}: Readonly<{ children: React.ReactNode }>): Promise<React.AwaitedReactNode> {
  const authCookie = cookies().get("Authorization");
  console.log("🚀 ~ authCookie:", authCookie);
  if (!authCookie) {
    return redirect("/login");
  }
  const { data } = await axios.get("http://localhost:3000/apis/retirement", {
    headers: { Cookie: cookies().toString() },
  });
  if (data) {
    return redirect("/dashboard");
  }

  return children as ReactElement;
}
