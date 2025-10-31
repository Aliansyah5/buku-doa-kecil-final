#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function incrementVersion(version, type = "patch") {
  const parts = version.split(".").map(Number);

  switch (type) {
    case "major":
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case "minor":
      parts[1]++;
      parts[2] = 0;
      break;
    case "patch":
    default:
      parts[2]++;
      break;
  }

  return parts.join(".");
}

function updatePackageJson(newVersion) {
  const packagePath = join(rootDir, "package.json");
  const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
  const oldVersion = packageJson.version;

  packageJson.version = newVersion;
  writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");

  return oldVersion;
}

function updateServiceWorker(newVersion) {
  const swPath = join(rootDir, "public", "sw.js");
  let swContent = readFileSync(swPath, "utf8");

  // Update the CACHE_VERSION constant
  swContent = swContent.replace(
    /const CACHE_VERSION = "buku-doa-v[\d.]+-dev";/,
    `const CACHE_VERSION = "buku-doa-v${newVersion}";`
  );

  writeFileSync(swPath, swContent);
}

function createVersionJson(version) {
  const versionPath = join(rootDir, "public", "version.json");
  const versionData = {
    version,
    buildDate: new Date().toISOString(),
    timestamp: Date.now(),
  };

  writeFileSync(versionPath, JSON.stringify(versionData, null, 2) + "\n");
}

async function main() {
  try {
    log("\n🚀 Starting deployment process...\n", colors.bright + colors.cyan);

    // Get version type from command line argument
    const versionType = process.argv[2] || "patch";

    if (!["major", "minor", "patch"].includes(versionType)) {
      log(
        "❌ Invalid version type. Use: major, minor, or patch",
        colors.yellow
      );
      process.exit(1);
    }

    // Read current version
    const packagePath = join(rootDir, "package.json");
    const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
    const currentVersion = packageJson.version;

    // Increment version
    const newVersion = incrementVersion(currentVersion, versionType);

    log(`📦 Current version: ${currentVersion}`, colors.blue);
    log(`📦 New version: ${newVersion}`, colors.green);
    log(`📝 Version type: ${versionType}\n`, colors.yellow);

    // Step 1: Update package.json
    log("1️⃣  Updating package.json...", colors.cyan);
    updatePackageJson(newVersion);
    log("✅ package.json updated\n", colors.green);

    // Step 2: Update Service Worker
    log("2️⃣  Updating Service Worker...", colors.cyan);
    updateServiceWorker(newVersion);
    log("✅ Service Worker updated\n", colors.green);

    // Step 3: Create version.json
    log("3️⃣  Creating version.json...", colors.cyan);
    createVersionJson(newVersion);
    log("✅ version.json created\n", colors.green);

    // Step 4: Build project
    log("4️⃣  Building project...", colors.cyan);
    execSync("npm run build", { stdio: "inherit", cwd: rootDir });
    log("✅ Build completed\n", colors.green);

    // Step 5: Git operations (optional)
    log("5️⃣  Git operations...", colors.cyan);
    try {
      execSync("git add .", { cwd: rootDir });
      execSync(`git commit -m "chore: release v${newVersion}"`, {
        cwd: rootDir,
      });
      log(`✅ Git commit created: v${newVersion}\n`, colors.green);

      // Ask if user wants to push
      log("📤 Ready to push to repository", colors.yellow);
      log("   Run: git push origin main\n", colors.yellow);
    } catch (error) {
      log("⚠️  Git operations skipped (optional)\n", colors.yellow);
    }

    // Success message
    log("═".repeat(50), colors.green);
    log("🎉 Deployment preparation completed!", colors.bright + colors.green);
    log(`✨ Version ${newVersion} is ready`, colors.green);
    log("═".repeat(50) + "\n", colors.green);

    log("📋 Next steps:", colors.cyan);
    log("   1. Review the changes in dist/ folder", colors.reset);
    log("   2. Test the build locally: npm run preview", colors.reset);
    log("   3. Push to repository: git push origin main", colors.reset);
    log("   4. Deploy dist/ folder to your hosting\n", colors.reset);

    log("💡 Service Worker will notify users about the update!", colors.blue);
    log("   Users will see an update banner automatically.\n", colors.blue);
  } catch (error) {
    log("\n❌ Deployment failed!", colors.yellow);
    log(error.message, colors.yellow);
    process.exit(1);
  }
}

main();
