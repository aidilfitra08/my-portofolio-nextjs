import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { execSync } from "child_process";

// Check if running on Vercel
const isVercel = process.env.VERCEL === "1";

export async function DELETE(request: NextRequest) {
  try {
    const { imagePath } = await request.json();

    if (!imagePath) {
      return NextResponse.json(
        { error: "No image path provided" },
        { status: 400 }
      );
    }

    // Only delete files in /project folder for security
    if (!imagePath.startsWith("/project/")) {
      return NextResponse.json(
        { error: "Can only delete images in /project folder" },
        { status: 403 }
      );
    }

    if (isVercel) {
      // Running on Vercel - delete from GitHub
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

      const fileName = path.basename(imagePath);
      const githubPath = `public/project/${fileName}`;

      // Get file SHA
      const getFileResponse = await fetch(
        `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${githubPath}`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!getFileResponse.ok) {
        // File doesn't exist on GitHub
        return NextResponse.json({
          success: true,
          message: "Image already deleted or doesn't exist",
          platform: "vercel",
        });
      }

      const fileData = await getFileResponse.json();

      // Delete from GitHub
      const deleteResponse = await fetch(
        `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${githubPath}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Delete image: ${fileName}`,
            sha: fileData.sha,
            branch: "main",
          }),
        }
      );

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json();
        throw new Error(`GitHub delete failed: ${errorData.message}`);
      }

      return NextResponse.json({
        success: true,
        message: "Image deleted successfully from GitHub",
        platform: "vercel",
      });
    } else {
      // Local development - delete from filesystem and commit to git
      const filePath = path.join(process.cwd(), "public", imagePath);
      const fileName = path.basename(imagePath);

      try {
        await unlink(filePath);

        // Try to commit to git
        try {
          const cwd = process.cwd();
          execSync(`git add public/project/${fileName}`, { cwd });
          execSync(`git commit -m "Delete image: ${fileName}"`, { cwd });
        } catch (gitError) {
          console.warn(
            "Git commit failed - file deleted locally only:",
            gitError
          );
        }

        return NextResponse.json({
          success: true,
          message: "Image deleted successfully",
          platform: "local",
        });
      } catch (error: any) {
        if (error.code === "ENOENT") {
          return NextResponse.json({
            success: true,
            message: "Image already deleted or doesn't exist",
            platform: "local",
          });
        }
        throw error;
      }
    }
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete image",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
