import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export function middleware(request: Request) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}
