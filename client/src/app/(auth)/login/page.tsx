"use client";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import axios from "axios";

export default function Page() {
  async function handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);

    const res = await axios.post("http://localhost:3000/apis/login", null, {
      headers: {
        token: response.credential,
      },
    });

    redirect("/");
  }

  useEffect(() => {
    console.log(process.env.GOOGLE_CLIENT_ID, "<<<<<");
    const buttonDiv = document.getElementById("buttonDiv") as HTMLElement; // Type assertion
    google.accounts.id.initialize({
      client_id:
        "645521973109-l33lea84qvfvdo4n5pouji0i0r8m5bsm.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(buttonDiv, {
      theme: "outline",
      size: "large", // customization attributes
      type: "standard",
    });
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 h-16">
        <div className="text-xl font-medium text-base-content">PensiunPlan</div>
        <div className="text-xl font-medium text-base-content">Hacktiv8</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-center h-full">
          <div className="mx-auto my-auto max-w-md px-4">
            <img
              className="aspect-square w-full h-full object-contain"
              src="/images/PensiunPlan.png"
            />
          </div>
        </div>
        <div className="flex items-center justify-center h-full">
          <div className="mx-auto my-auto max-w-lg px-4">
            <h1 className="text-center text-4xl font-medium max-w-[300px] mx-auto mb-16 text-base-content">
              Effortless Retirement Plan Management
            </h1>
            <p className="text-base text-center max-w-[320px] mx-auto text-base-content">
              Plan today for a comfortable tommorow with PensiunPlan
            </p>
            <div className="flex item-center mt-16">
              <button className="flex w-full items-center justify-center gap-3 rounded-full bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-700 focus-visible:ring-transparent">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                  />
                </svg>
                <span className="text-sm/6 font-semibold">Google</span>
              </button>
              <div id="buttonDiv"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
