const fs = require("fs");
const path = require("path");

const MDX_DIR = path.join(process.cwd(), "src/blog/posts"); // Change as needed

function fixSummaryBlockLiteral(filepath) {
  let content = fs.readFileSync(filepath, "utf8");
  // Find summary block literal with quotes and replace with unquoted pipe
  content = content.replace(/summary:\s*"\|"/g, "summary: |");

  // Fix indentation for block literal lines under summary
  // Find the summary block and ensure lines are indented with 2 spaces
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const fmMatch = content.match(frontmatterRegex);
  if (fmMatch) {
    let fm = fmMatch[1];
    const lines = fm.split("\n");
    let inBlock = false;
    let fixedLines = [];
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (/^summary:\s*\|/.test(line)) {
        inBlock = true;
        fixedLines.push(line);
        continue;
      }
      if (inBlock) {
        // End of block is next key:value line, or last line
        if (/^[a-zA-Z0-9_-]+:/.test(line)) {
          inBlock = false;
          fixedLines.push(line);
        } else if (line.trim() === "") {
          fixedLines.push(line); // Keep blank lines
        } else {
          // Ensure 2 spaces at start
          fixedLines.push(
            line.startsWith("  ") ? line : "  " + line.trimRight()
          );
        }
      } else {
        fixedLines.push(line);
      }
    }
    const newFm = fixedLines.join("\n");
    content = content.replace(frontmatterRegex, `---\n${newFm}\n---`);
    fs.writeFileSync(filepath, content, "utf8");
    console.log(`✅ Fixed block literal: ${filepath}`);
  } else {
    console.warn(`⚠️ No frontmatter found in ${filepath}`);
  }
}

function main() {
  const files = fs.readdirSync(MDX_DIR).filter((f) => f.endsWith(".mdx"));
  for (const fname of files) {
    fixSummaryBlockLiteral(path.join(MDX_DIR, fname));
  }
}

main();
