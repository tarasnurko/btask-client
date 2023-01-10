import { NextMiddleware, NextRequest, NextResponse } from "next/server";

export const middleware: NextMiddleware = (req: NextRequest) => {
  const jwt = req.cookies?.has("jwt");

  if (!jwt) {
    return NextResponse.next();
  }

  return NextResponse.redirect("/auth/login");
};
