"use server";

import { cookies } from "next/headers";

export async function deleteCookies(names: string[]) {
  const cookieStore = cookies();
  names.forEach((name) => {
    cookieStore.delete(name);
  });
}
