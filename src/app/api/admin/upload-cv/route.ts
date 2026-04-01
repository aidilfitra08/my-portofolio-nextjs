import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const isVercel = process.env.VERCEL === "1";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF is allowed." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = "cv.pdf";
    const relativePath = `/data/${fileName}`;

    if (isVercel) {
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

      const githubPath = `public${relativePath}`;

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
            message: "Upload CV",
            content: buffer.toString("base64"),
            branch: "main",
          }),
        }
      );

      if (!uploadResponse.ok) {
        const err = await uploadResponse.json();
        throw new Error(`GitHub upload failed: ${err.message}`);
      }

      return NextResponse.json({
        success: true,
        path: relativePath,
        platform: "vercel",
      });
    }

    // Local: save to filesystem
    const targetDir = path.join(process.cwd(), "public", "data");
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true });
    }
    const filePath = path.join(targetDir, fileName);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      path: relativePath,
      platform: "local",
    });
  } catch (error) {
    console.error("Error uploading CV:", error);
    return NextResponse.json(
      {
        error: "Failed to upload CV",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
