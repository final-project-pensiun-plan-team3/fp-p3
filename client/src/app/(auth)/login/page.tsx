"use client";
import Footer from "@/components/Footer";
import { useEffect } from "react";
// import { redirect } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import Image from "next/image";
import { setCookies } from "@/action";
interface CredentialResponse {
  credential: string; // JWT token
  // Add other properties if necessary
}

export default function Page() {
  const router = useRouter();

  async function handleCredentialResponse(response: CredentialResponse) {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/apis/login`,
        null,
        {
          headers: {
            token: response.credential,
          },
        }
      );
      const data = res.data;
      cookies.set("username", data.name, { expires: 90 });
      setCookies("Authorization",data.accessToken)
      cookies.set("avatar", data.picture, { expires: 90 });

      router.push("/");
    } catch (error) {
      console.log("🚀 ~ handleCredentialResponse ~ error:", error);
    }
  }

  useEffect(() => {
    console.log(process.env.GOOGLE_CLIENT_ID, "<<<<<");
    const buttonDiv = document.getElementById("buttonDiv") as HTMLElement; // Type assertion
    google.accounts.id.initialize({
      client_id:
        "104217290771-gi9n0eaqmi6gvki8inc9h4fjc1hj4509.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(buttonDiv, {
      theme: "filled_black",
      size: "large",
      type: "standard",
    });
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 h-16">
        <div
          className="text-xl font-medium text-base-content cursor-pointer"
          onClick={() => router.push("/")}
        >
          PensiunPlan
        </div>
        <a
          href="https://www.hacktiv8.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-medium text-base-content cursor-pointer"
        >
          Hacktiv8
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-center h-full">
          <div className="mx-auto my-auto max-w-md px-4">
            <Image
              className="aspect-square w-full h-full object-contain"
              src="/images/PensiunPlan.png"
              alt="PensiunPlan"
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className="flex items-center justify-center h-full">
          <div className="mx-auto my-auto max-w-lg px-4 justify-items-center">
            <h1 className="text-center text-4xl font-medium max-w-[300px] mx-auto mb-16 text-base-content">
              Effortless Retirement Plan Management
            </h1>
            <p className="text-base text-center max-w-[320px] mx-auto text-base-content">
              Plan today for a comfortable tomorrow
              <br />
              with PensiunPlan
            </p>
            <div className="flex item-center mt-16">
              <button>
                <div id="buttonDiv"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
