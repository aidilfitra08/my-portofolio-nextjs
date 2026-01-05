#!/usr/bin/env node

/**
 * Password Hash Generator for Portfolio Admin Panel
 *
 * Usage:
 *   node scripts/generate-password-hash.js "your-password"
 *
 * Then copy the hash to NEXT_PUBLIC_ADMIN_PASSWORD_HASH in .env.local
 */

const password = process.argv[2];

if (!password) {
  console.error("❌ Error: Please provide a password");
  console.log('Usage: node scripts/generate-password-hash.js "your-password"');
  process.exit(1);
}

if (password.length < 6) {
  console.warn("⚠️  Warning: Password is very short (less than 6 characters)");
}

// Use the same hash function as auth.ts
function hashPassword(pwd) {
  let hash = 0;
  for (let i = 0; i < pwd.length; i++) {
    const char = pwd.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

const hash = hashPassword(password);

console.log("\n✅ Password Hash Generated Successfully!\n");
console.log("Password:", password);
console.log("Hash:    ", hash);
console.log("\nAdd this to your .env.local:");
console.log(`NEXT_PUBLIC_ADMIN_PASSWORD_HASH=${hash}`);
console.log("\n");
