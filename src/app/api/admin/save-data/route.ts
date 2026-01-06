import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

// Verify admin token
function verifyToken(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "");
  return token.length > 0;
}

// Check if running on Vercel
const isVercel = process.env.VERCEL === "1";

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    if (!verifyToken(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const filePath = "public/data/portfolio.json";

    if (isVercel) {
      // Running on Vercel - use GitHub API
      const githubToken = process.env.GITHUB_TOKEN;
      const githubOwner = process.env.GITHUB_OWNER;
      const githubRepo = process.env.GITHUB_REPO;

      if (!githubToken || !githubOwner || !githubRepo) {
        return NextResponse.json(
          {
            error:
              "GitHub not configured. Set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO in Vercel environment variables.",
          },
          { status: 500 }
        );
      }

      // Get current file SHA
      const getFileResponse = await fetch(
        `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${filePath}`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!getFileResponse.ok) {
        throw new Error("Failed to fetch current file from GitHub");
      }

      const fileData = await getFileResponse.json();

      // Commit changes to GitHub
      const commitResponse = await fetch(
        `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${filePath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Update portfolio data - ${new Date().toISOString()}`,
            content: Buffer.from(JSON.stringify(data, null, 2)).toString(
              "base64"
            ),
            sha: fileData.sha,
            branch: "main",
          }),
        }
      );

      if (!commitResponse.ok) {
        const errorData = await commitResponse.json();
        throw new Error(`GitHub commit failed: ${errorData.message}`);
      }

      return NextResponse.json({
        success: true,
        message: "Portfolio data saved to GitHub successfully",
        platform: "vercel",
      });
    } else {
      // Local development - save to filesystem and commit to git
      const dataPath = join(process.cwd(), filePath);
      writeFileSync(dataPath, JSON.stringify(data, null, 2));

      // Try to commit to git
      try {
        const cwd = process.cwd();
        execSync("git add public/data/portfolio.json", { cwd });
        execSync(
          `git commit -m "Updated portfolio data: ${new Date().toISOString()}"`,
          { cwd }
        );
      } catch (gitError) {
        console.warn("Git commit failed - file saved locally only:", gitError);
      }

      return NextResponse.json({
        success: true,
        message: "Portfolio data saved locally",
        platform: "local",
      });
    }
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      {
        error: "Failed to save data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
