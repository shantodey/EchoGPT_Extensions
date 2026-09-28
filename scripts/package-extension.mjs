import fs from "node:fs";
import path from "node:path";

const rootDirectory = process.cwd();
const outputDirectory = path.join(rootDirectory, "out");
const manifestSource = path.join(rootDirectory, "extension", "manifest.json");
const logoSource = path.join(rootDirectory, "src", "app", "logo.png");
const requiredFiles = [
  path.join(outputDirectory, "index.html"),
  path.join(outputDirectory, "background.js"),
  manifestSource,
  logoSource,
];

for (const filePath of requiredFiles) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Required extension deployment file is missing: ${filePath}`);
  }
}

const manifest = JSON.parse(fs.readFileSync(manifestSource, "utf8"));
const iconDirectory = path.join(outputDirectory, "images");
const textExtensions = new Set([".css", ".html", ".js", ".json", ".map", ".svg", ".txt"]);
fs.mkdirSync(iconDirectory, { recursive: true });
fs.copyFileSync(manifestSource, path.join(outputDirectory, "manifest.json"));
fs.copyFileSync(logoSource, path.join(iconDirectory, "icon-128.png"));

if (!manifest.background?.service_worker || !manifest.side_panel?.default_path) {
  throw new Error("The extension manifest is missing its service worker or side panel.");
}

function updateAssetReferences(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      updateAssetReferences(entryPath);
    } else if (textExtensions.has(path.extname(entry.name))) {
      let content = fs.readFileSync(entryPath, "utf8").replaceAll("/_next/", "/next/");

      if (path.extname(entry.name) === ".html") {
        let inlineScriptIndex = 0;
        const pageName = path.relative(outputDirectory, entryPath).replaceAll(path.sep, "-");

        content = content.replace(
          /<script([^>]*)>([\s\S]*?)<\/script>/gi,
          (tag, attributes, code) => {
            if (/\bsrc\s*=/.test(attributes) || !code.trim()) return tag;
            if (/\btype\s*=\s*["'](?!text\/javascript)[^"']+["']/i.test(attributes)) return tag;

            const scriptName = `extension-${pageName}-${inlineScriptIndex++}.js`;
            fs.writeFileSync(path.join(outputDirectory, scriptName), code);
            return `<script${attributes} src="/${scriptName}"></script>`;
          }
        );
      }

      fs.writeFileSync(entryPath, content);
    }
  }
}

updateAssetReferences(outputDirectory);
console.log('Prepared Chrome extension package in "out".');