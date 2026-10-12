const fs = require("node:fs");
const path = require("node:path");

const fetchCache = path.join(process.cwd(), ".next", "cache", "fetch-cache");
fs.rmSync(fetchCache, { recursive: true, force: true });
console.log("Cleared Next.js fetch cache so the static build reads current CMS content.");
