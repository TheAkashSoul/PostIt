import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  const staticPaths = [
    "/",
    "/explore",
    "/notifications",
    "/post",
    "/saved",
    "/settings",
    "/view/:path*",
    "/signin",
    "/signup",
  ];

  const isDynamicUserRoute = !staticPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (
    !token &&
    (isDynamicUserRoute || !["/signin", "/signup"].includes(pathname))
  ) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // if (!token && !["/signin", "/signup"].includes(pathname)) {
  //   return NextResponse.redirect(new URL("/signin", req.url));
  // }

  if (token && ["/signin", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/explore",
    "/notifications",
    "/post",
    "/saved",
    "/:username",
    "/settings",
    "/view/:path*",
    "/signin",
    "/signup",
  ],
};
