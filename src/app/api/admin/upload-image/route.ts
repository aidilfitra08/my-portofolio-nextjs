import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { execSync } from "child_process";

// Check if running on Vercel
const isVercel = process.env.VERCEL === "1";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // Create unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${timestamp}-${originalName}`;
    const relativePath = `/project/${fileName}`;

    if (isVercel) {
      // Running on Vercel - upload to GitHub
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

      const githubPath = `public/project/${fileName}`;

      // Upload to GitHub
      const uploadResponse = await fetch(
        `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${githubPath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Upload image: ${fileName}`,
            content: buffer.toString("base64"),
            branch: "main",
          }),
        }
      );

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(`GitHub upload failed: ${errorData.message}`);
      }

      return NextResponse.json({
        success: true,
        path: relativePath,
        platform: "vercel",
      });
    } else {
      // Local development - save to filesystem and commit to git
      const projectDir = path.join(process.cwd(), "public", "project");
      if (!existsSync(projectDir)) {
        await mkdir(projectDir, { recursive: true });
      }

      const filePath = path.join(projectDir, fileName);
      await writeFile(filePath, buffer);

      // Try to commit to git
      try {
        const cwd = process.cwd();
        execSync(`git add public/project/${fileName}`, { cwd });
        execSync(`git commit -m "Upload image: ${fileName}"`, { cwd });
      } catch (gitError) {
        console.warn("Git commit failed - file saved locally only:", gitError);
      }

      return NextResponse.json({
        success: true,
        path: relativePath,
        platform: "local",
      });
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      {
        error: "Failed to upload file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
