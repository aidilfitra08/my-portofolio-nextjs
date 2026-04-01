// Production-ready authentication utility
// Uses environment variables to switch between dev and production modes

const isDevelopment = process.env.NODE_ENV === "development";

// Development credentials (simple)
const DEV_USERNAME = "admin";
const DEV_PASSWORD = "password";

// Production credentials (from environment variables)
const PROD_USERNAME = process.env.ADMIN_USERNAME;
const PROD_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

/**
 * Verify credentials based on environment
 * In development: simple username/password check
 * In production: bcrypt hash verification via API route
 */
export const verifyCredentials = async (
  username: string,
  password: string
): Promise<boolean> => {
  if (isDevelopment) {
    // Development mode: simple check
    return username === DEV_USERNAME && password === DEV_PASSWORD;
  } else {
    // Production mode: verify via API route with bcrypt
    try {
      const response = await fetch("/api/admin/verify-credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      return data.valid === true;
    } catch (error) {
      console.error("Credential verification error:", error);
      return false;
    }
  }
};

export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("admin_token", token);
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("admin_token");
  }
  return null;
};

export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("admin_token");
  }
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

// Helper to get current environment
export const getAuthMode = (): "development" | "production" => {
  return isDevelopment ? "development" : "production";
};
