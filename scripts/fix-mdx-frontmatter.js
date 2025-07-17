const fs = require("fs");
const path = require("path");

// Update this to the directory containing your .mdx files
const MDX_DIR = path.join(process.cwd(), "src/blog/posts");

function yamlSafeValue(value) {
  if (value == null) return '""';
  value = String(value);
  if (value.includes("\n")) {
    // Block literal (no quotes, exactly two spaces indentation)
    return `|\n  ${value
      .split("\n")
      .map((line) => line.trimRight())
      .join("\n  ")}`;
  } else if (value.includes('"')) {
    return `'${value.replace(/'/g, "''")}'`;
  } else if (value.includes(":") || value.trim().startsWith("- ")) {
    return `"${value.replace(/"/g, '\\"')}"`;
  } else {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
}

function fixFrontmatterInFile(filepath) {
  const content = fs.readFileSync(filepath, "utf-8");
  // Extract frontmatter: between ---\n and ---\n (first only)
  const regex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(regex);
  if (!match) {
    console.warn(`No frontmatter found in ${filepath}`);
    return;
  }
  const fmText = match[1];
  const fmLines = fmText.split("\n");
  const fixedFm = [];
  for (let line of fmLines) {
    if (!line.trim()) continue;
    const splitIdx = line.indexOf(":");
    if (splitIdx === -1) {
      fixedFm.push(line);
      continue;
    }
    let key = line.substring(0, splitIdx).trim();
    let val = line.substring(splitIdx + 1).trim();
    // Remove quotes only if they wrap the whole value
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.substring(1, val.length - 1);
    }
    fixedFm.push(`${key}: ${yamlSafeValue(val)}`);
  }
  const newFm = `---\n${fixedFm.join("\n")}\n---\n`;
  const rest = content.slice(match[0].length);
  fs.writeFileSync(filepath, newFm + rest, "utf-8");
  console.log(`✅ Fixed: ${filepath}`);
}

function main() {
  const files = fs.readdirSync(MDX_DIR).filter((f) => f.endsWith(".mdx"));
  for (const fname of files) {
    fixFrontmatterInFile(path.join(MDX_DIR, fname));
  }
}

main();
