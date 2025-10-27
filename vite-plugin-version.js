import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate version from package.json and build timestamp
export function generateVersion() {
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "package.json"), "utf-8")
  );

  const version = packageJson.version || "1.0.0";
  const buildDate = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const buildTime = new Date().toTimeString().split(" ")[0].replace(/:/g, "");

  return `v${version}-${buildDate}-${buildTime}`;
}

// Plugin to inject version into Service Worker
export function injectVersionPlugin() {
  return {
    name: "inject-version",
    apply: "build", // Only run on production build
    generateBundle(options, bundle) {
      const version = generateVersion();

      // Find and modify sw.js
      for (const fileName in bundle) {
        if (fileName === "sw.js") {
          const file = bundle[fileName];
          if (file.type === "asset" && typeof file.source === "string") {
            file.source = file.source.replace(
              /const CACHE_VERSION = ['"].*?['"]/,
              `const CACHE_VERSION = '${version}'`
            );
          }
        }
      }

      // Create version.json for version checking
      const versionInfo = {
        version,
        buildDate: new Date().toISOString(),
        environment: "production",
      };

      this.emitFile({
        type: "asset",
        fileName: "version.json",
        source: JSON.stringify(versionInfo, null, 2),
      });
    },
  };
}
