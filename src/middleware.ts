import { NextRequest, NextResponse } from "next/server";

// Add your IP address here - you can find it by visiting https://whatismyipaddress.com/
const ALLOWED_IPS = [
  "127.0.0.1", // localhost
  "::1", // localhost IPv6
  "182.253.135.223",
  // 'YOUR_IP_ADDRESS_HERE'
];

export function middleware(request: NextRequest) {
  // Only apply IP restriction to the clock page
  if (request.nextUrl.pathname.startsWith("/playground/vscode-clone")) {
    const clientIP = getClientIP(request);

    if (!ALLOWED_IPS.includes(clientIP)) {
      // Return 403 Forbidden for unauthorized IPs
      return new NextResponse("Access Denied: Unauthorized IP", {
        status: 403,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
  }

  return NextResponse.next();
}

function getClientIP(request: NextRequest): string {
  // Try different headers to get the real client IP
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const clientIP = request.headers.get("x-client-ip");

  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (clientIP) {
    return clientIP;
  }

  // Fallback for unknown IP
  return "unknown";
}

export const config = {
  matcher: "/playground/clock/:path*",
};
