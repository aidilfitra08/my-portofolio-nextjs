import { NextRequest, NextResponse } from "next/server";

/**
 * Production credential verification endpoint
 * Uses bcrypt for secure password hashing
 */
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { valid: false, error: "Missing credentials" },
        { status: 400 }
      );
    }

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH) {
      console.error(
        "Missing environment variables: ADMIN_USERNAME or ADMIN_PASSWORD_HASH"
      );
      return NextResponse.json(
        { valid: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Check username first
    if (username !== ADMIN_USERNAME) {
      return NextResponse.json({ valid: false });
    }

    // Use bcrypt to compare passwords
    try {
      const bcrypt = require("bcryptjs");
      const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

      return NextResponse.json({ valid: isValid });
    } catch (error: any) {
      if (error.code === "MODULE_NOT_FOUND") {
        console.error(
          "bcryptjs is not installed. Please run: npm install bcryptjs"
        );
        // Fallback to direct comparison (NOT SECURE - only for initial setup)
        const isValid = password === ADMIN_PASSWORD_HASH;
        console.warn(
          "WARNING: Using direct password comparison. Install bcryptjs for production!"
        );
        return NextResponse.json({ valid: isValid });
      }
      console.error("Password verification error:", error);
      return NextResponse.json(
        { valid: false, error: "Verification failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Credential verification error:", error);
    return NextResponse.json(
      { valid: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
