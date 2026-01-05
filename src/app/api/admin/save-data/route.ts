import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

// Verify admin token
function verifyToken(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "");
  // In production, verify the token properly
  return token.length > 0;
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    if (!verifyToken(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Path to portfolio.json
    const dataPath = join(process.cwd(), "public", "data", "portfolio.json");

    // Write the updated data
    writeFileSync(dataPath, JSON.stringify(data, null, 2));

    // Try to commit to git (if git is available)
    try {
      const cwd = process.cwd();
      execSync("git add public/data/portfolio.json", { cwd });
      execSync(
        `git commit -m "Updated portfolio data: ${new Date().toISOString()}"`,
        { cwd }
      );
    } catch (gitError) {
      console.warn("Git commit failed - file saved locally only:", gitError);
      // Don't fail the request if git isn't available
    }

    return NextResponse.json({
      success: true,
      message: "Portfolio data saved successfully",
    });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
