"use server";

import { revalidatePath } from "next/cache";
// import axios from "axios";
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

// export const fetchData = async () => {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/apis/retirement`
//     );
//     return(response.data);
//   } catch (error) {
//     console.log("🚀 ~ fetchData ~ error:", error);
//   }
// };

export async function revalidateBypath(path:string) {
  revalidatePath(path)
}
