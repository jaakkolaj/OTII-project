const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const sourcePath = path.join(
  projectRoot,
  "node_modules",
  "tw-animate-css",
  "dist",
  "tw-animate.css"
);
const targetPath = path.join(projectRoot, "app", "tw-animate.css");

try {
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log("Synced tw-animate.css from node_modules.");
  } else {
    console.warn("tw-animate-css not installed; keeping existing tw-animate.css.");
  }
} catch (error) {
  console.error("Failed to sync tw-animate.css:", error);
  process.exitCode = 1;
}
