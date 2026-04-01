#!/usr/bin/env node

/**
 * Test Authentication Setup
 * Verifies that the authentication configuration is correct
 */

const isDevelopment = process.env.NODE_ENV !== "production";

console.log("\n🔍 Testing Authentication Setup\n");
console.log("=================================\n");

console.log(`Environment: ${isDevelopment ? "DEVELOPMENT" : "PRODUCTION"}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV || "not set"}\n`);

if (isDevelopment) {
  console.log("✅ Development Mode Detected");
  console.log("   Default credentials will be used:");
  console.log("   Username: admin");
  console.log("   Password: password\n");
} else {
  console.log("✅ Production Mode Detected");
  console.log("   Checking environment variables...\n");

  const username = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  let hasErrors = false;

  if (!username) {
    console.log("❌ ADMIN_USERNAME is not set");
    hasErrors = true;
  } else {
    console.log(`✅ ADMIN_USERNAME: ${username}`);
  }

  if (!passwordHash) {
    console.log("❌ ADMIN_PASSWORD_HASH is not set");
    hasErrors = true;
  } else {
    console.log(`✅ ADMIN_PASSWORD_HASH: ${passwordHash.substring(0, 10)}...`);
  }

  // Check if bcryptjs is installed
  try {
    require("bcryptjs");
    console.log("✅ bcryptjs is installed\n");
  } catch (error) {
    console.log("❌ bcryptjs is NOT installed");
    console.log("   Run: npm install bcryptjs\n");
    hasErrors = true;
  }

  if (hasErrors) {
    console.log("\n⚠️  Configuration Issues Found!");
    console.log("   Please check the errors above and fix them.\n");
    console.log("   See PRODUCTION_SETUP.md for setup instructions.\n");
    process.exit(1);
  } else {
    console.log("\n✅ All checks passed! Your production setup is ready.\n");
  }
}

console.log("=================================\n");
