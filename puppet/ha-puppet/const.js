import { readFileSync, existsSync } from "fs";

// find configuration file in the first location we search
const optionsFile = ["./options-dev.json", "/data/options.json"].find(
  existsSync,
);
if (!optionsFile) {
  console.error(
    "No options file found. Please copy options-dev.json.sample to options-dev.json",
  );
  process.exit(1);
}

console.log("Parsing options file %s...", optionsFile);

export const isAddOn = optionsFile === "/data/options.json";

// parse configuration as JSON file
const options = JSON.parse(readFileSync(optionsFile));

// extract values from configuration
export const hassUrl = isAddOn
  ? (options.home_assistant_url || "http://homeassistant:8123")
  : (options.home_assistant_url || "http://localhost:8123");
export const hassToken = options.access_token;
export const debug = false;

export const chromiumExecutable = isAddOn ? "/usr/bin/chromium" : (options.chromium_executable || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");

export const keepBrowserOpen = options.keep_browser_open || false;

export const port = options.port || 10000;

export const prefix = options.prefix || "/";

if (!hassToken) {
  console.warn("No access token configured. UI will show configuration instructions.");
}
