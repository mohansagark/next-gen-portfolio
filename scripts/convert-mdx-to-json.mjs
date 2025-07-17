import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src/blog/posts");
const outputPath = path.join(process.cwd(), "public/blogs.json");

function formatDate(inputDate) {
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function convertFrontmatterToJson(data, index) {
  return {
    id: data.slug,
    title: data.title,
    // img: data.image_url || `/img/blog/${index}.jpg`,
    // detailsImg: data.image_url || `/img/blog/blog-${index}.jpg`,
    // smallImg: data.image_url || `/img/blog/post-thumb-${index}.jpg`,
    desc: data.summary,
    desc1: data.content_strategy,
    desc2: data.writing_style,
    date: formatDate(data.date),
    category: data.tags?.[0] || "general",
    tags: data.tags || [],
    author_role: "Analysis",
    author: "mohansagar",
    status: "Tutorial",
  };
}

function run() {
  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".mdx"));
  const result = [];

  files.forEach((file, i) => {
    const filePath = path.join(postsDir, file);
    console.log(`Parsing file: ${file}`);
    const content = fs.readFileSync(filePath, "utf-8");
    try {
      const { data } = matter(content);
      const blogData = convertFrontmatterToJson(data, i + 1);
      result.push(blogData);
    } catch (error) {
      console.error(`❌ Error in file: ${file}`);
      console.error(error.message);
      throw error; // Stop execution after error for easier debugging
    }
  });

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(`✅ blogs.json created with ${result.length} blogs`);
}

run();
