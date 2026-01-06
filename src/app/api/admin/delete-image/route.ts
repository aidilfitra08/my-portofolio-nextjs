import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

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

    // Construct full file path
    const filePath = path.join(process.cwd(), "public", imagePath);

    try {
      await unlink(filePath);
      return NextResponse.json({
        success: true,
        message: "Image deleted successfully",
      });
    } catch (error: any) {
      if (error.code === "ENOENT") {
        // File doesn't exist, return success anyway
        return NextResponse.json({
          success: true,
          message: "Image already deleted or doesn't exist",
        });
      }
      throw error;
    }
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
