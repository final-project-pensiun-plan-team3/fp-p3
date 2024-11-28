import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { HttpError, handleError } from "./lib/errorhandler";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  try {
    console.log("Masuk middleware nih ...", request.nextUrl.pathname);

    const authCookie = cookies().get("Authorization");
    console.log(authCookie);

    if (authCookie && request.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (!authCookie && request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }

    if (!authCookie) {
      throw new HttpError("Invalid Token", 401);
    }

    const token = authCookie.value;
    if (!token) {
      throw new HttpError("Invalid Token", 401);
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

    const result = await jose.jwtVerify<{ UserId: string }>(token, secret);
    console.log(result.payload);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-UserId", result.payload.UserId);

    return NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });

    // return NextResponse.next();
  } catch (error) {
    console.log(error);

    return handleError(error);
  }
}

export const config = {
  matcher: ["/onboarding", "/apis/retirement", "/dashboard"],
};
