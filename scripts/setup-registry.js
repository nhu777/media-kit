#!/usr/bin/env node
/**
 * Generates .npmrc with ARBOR_TOKEN for installing private @linktr.ee packages.
 * The .npmrc file works for both npm and yarn package managers.
 * Token is read from environment variable or .env.local file.
 */
const fs = require('fs');

let token = process.env.ARBOR_TOKEN;

// Fallback to .env.local for local development
if (!token && fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const match = envContent.match(/^ARBOR_TOKEN=(.+)$/m);
  if (match) {
    token = match[1].trim();
    // Remove surrounding quotes if present
    if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'"))
    ) {
      token = token.slice(1, -1);
    }
  }
}

if (token) {
  const npmrc = `@linktr.ee:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${token}
`;
  fs.writeFileSync('.npmrc', npmrc);
  console.log('✓ .npmrc generated with ARBOR_TOKEN');
} else {
  console.log('⚠ No ARBOR_TOKEN found - skipping .npmrc generation');
}
