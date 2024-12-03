"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteCookies(names: string[]) {
  const cookieStore = cookies();
  names.forEach((name) => {
    cookieStore.delete(name);
  });
}

export async function setCookies(name:string,value:string) {
  cookies().set(name, value);
}
