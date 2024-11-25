import { NextResponse } from "next/server";

export default function Middleware() {
  return NextResponse.next();
}
