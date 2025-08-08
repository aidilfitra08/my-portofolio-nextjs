import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    console.log(message);
    // Replace this URL with your actual backend server endpoint
    const BACKEND_URL = process.env.AI_BACKEND_URL || "";
    console.log(BACKEND_URL);
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any authentication headers if needed
        // "Authorization": `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        user_id: 1, // Your backend expects user_id
        prompt: message, // Your backend expects prompt instead of message
        // You can add history here if your backend supports it
        // history: history
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    // console.log(await response.json());
    const data = await response.json();

    return NextResponse.json({
      response: data.reply || data.message || "No response from AI",
      success: true,
    });
  } catch (error) {
    console.error("AI Chat API Error:", error);

    // Fallback response if backend is not available
    return NextResponse.json(
      {
        response:
          "I'm currently offline. Please check if the backend server is running and try again.",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
