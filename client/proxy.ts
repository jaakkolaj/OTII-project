import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//Tämä middleware tarkistaa jokaisesta määritellystä reitistä, 
// onko käyttäjällä voimassaoleva JWT-token cookieissä. Jos token löytyy, 
// pyyntö saa jatkaa normaalisti. Jos tokenia ei löydy tai se on vanhentunut, käyttäjä uudelleenohjataan login-sivulle.
export function proxy(request: NextRequest) {
  const autenticationToken = request.cookies.get("access_token")?.value;
  // Jos tokenia ei löydy, uudelleenohjataan käyttäjä login-sivulle
  if (!autenticationToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
//Määrittellään reitit, Mitkä suojataan
export const config = {
  matcher: [
    "/home/:path*",
    //"/resumeAnalyzer/:path*",
    "/job_postings/:path*", 
    "/profile/:path*",
    "/settings/:path*",
  ],
};
