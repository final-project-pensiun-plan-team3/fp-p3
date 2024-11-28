import { Auth } from "@/db/models/users";

import { NextResponse } from "next/server";

import { OAuth2Client } from "google-auth-library";

export async function POST(request: Request) {
  try {
    const token = await request.headers.get("token");
    // console.log(headers.get("token"), "<<<<<<<");

    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: token as string,
      audience:
        "104217290771-gi9n0eaqmi6gvki8inc9h4fjc1hj4509.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    console.log(payload);
    if (payload) {
      await Auth.create(payload?.email as string, payload?.name as string);
    }

    return NextResponse.json({
      accessToken: "token",
    });
  } catch (error) {
    return console.log(error);
  }
}
