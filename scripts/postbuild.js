#!/usr/bin/env node
/**
 * postbuild.js
 *
 * Next.js static export creates both `out/why-us/compliance.html` AND
 * `out/why-us/compliance/` (containing public images).  When a visitor
 * opens https://thevertical.ai/why-us/compliance directly in a new tab,
 * Apache sees a real directory and either redirects to the trailing-slash
 * URL (mod_dir 301) or serves a 403/404 because there is no index.html.
 *
 * Fix: copy every `<dir>/<slug>.html` into `<dir>/<slug>/index.html` so
 * Apache's DirectoryIndex directive serves the correct page immediately.
 *
 * Runs automatically via the "postbuild" npm script after `next build`.
 */

const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "out");

/**
 * Walk `dir` one level deep.  For every `<slug>.html` that has a
 * matching `<slug>/` subdirectory, copy the html into `<slug>/index.html`.
 */
function fixDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;

    const slug = entry.name.slice(0, -5); // strip ".html"
    const subdir = path.join(dir, slug);

    if (fs.existsSync(subdir) && fs.statSync(subdir).isDirectory()) {
      const src = path.join(dir, entry.name);
      const dest = path.join(subdir, "index.html");
      fs.copyFileSync(src, dest);
      const rel = path.relative(OUT, dest);
      console.log(`  copied → out/${rel}`);
    }
  }
}

console.log("postbuild: fixing directory/html conflicts in out/...");

// Fix root level (e.g. out/why-us.html + out/why-us/)
fixDir(OUT);

// Fix one level deep (e.g. out/why-us/compliance.html + out/why-us/compliance/)
const rootEntries = fs.readdirSync(OUT, { withFileTypes: true });
for (const entry of rootEntries) {
  if (entry.isDirectory() && !entry.name.startsWith("_") && entry.name !== "images") {
    fixDir(path.join(OUT, entry.name));
  }
}

console.log("postbuild: done.");
