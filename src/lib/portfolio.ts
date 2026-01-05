// Utility to load portfolio data
// Server: read from filesystem to avoid client-only fetch issues
// Client: fetch from public JSON with no-store to avoid caching stale data

export const loadPortfolioData = async () => {
  try {
    if (typeof window === "undefined") {
      // Only import fs on the server side
      const fs = await import("fs/promises");
      const path = await import("path");
      const filePath = path.default.join(
        process.cwd(),
        "public",
        "data",
        "portfolio.json"
      );
      const file = await fs.readFile(filePath, "utf-8");
      return JSON.parse(file);
    }

    const response = await fetch("/data/portfolio.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to load portfolio data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading portfolio data:", error);
    return null;
  }
};

export const savePortfolioData = async (data: any) => {
  try {
    const response = await fetch("/api/admin/save-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to save portfolio data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving portfolio data:", error);
    throw error;
  }
};
