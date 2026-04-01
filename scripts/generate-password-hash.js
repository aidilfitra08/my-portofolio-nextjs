#!/usr/bin/env node

/**
 * Password Hash Generator for Portfolio Admin Panel
 *
 * Generates bcrypt hash for production use
 *
 * Usage:
 *   node scripts/generate-password-hash.js "your-password"
 *
 * Then add to your .env.production:
 *   ADMIN_PASSWORD_HASH=<generated-hash>
 */

const password = process.argv[2];

if (!password) {
  console.error("❌ Error: Please provide a password");
  console.log('Usage: node scripts/generate-password-hash.js "your-password"');
  process.exit(1);
}

if (password.length < 8) {
  console.warn(
    "⚠️  Warning: Password should be at least 8 characters for security"
  );
}

async function generateHash() {
  try {
    // Try to use bcryptjs if available
    const bcrypt = require("bcryptjs");
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    console.log("\n✅ Bcrypt Password Hash Generated Successfully!\n");
    console.log(
      "Password:",
      "*".repeat(password.length),
      "(hidden for security)"
    );
    console.log("Hash:    ", hash);
    console.log("\nAdd these to your .env.production:");
    console.log(`ADMIN_USERNAME=admin`);
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log("\n⚠️  IMPORTANT: Never commit .env.production to git!");
    console.log("Add .env.production to .gitignore\n");
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      console.error("\n❌ Error: bcryptjs is not installed");
      console.log("\nTo install bcryptjs, run:");
      console.log("  npm install bcryptjs");
      console.log("\nThen run this script again.\n");
      process.exit(1);
    } else {
      console.error("Error generating hash:", error);
      process.exit(1);
    }
  }
}

generateHash();
