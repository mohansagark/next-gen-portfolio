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

function convertFrontmatterToJson(data, content, index) {
  // Parse tags if they're stored as a string
  let parsedTags = [];
  if (typeof data.tags === "string") {
    try {
      parsedTags = JSON.parse(data.tags);
    } catch (e) {
      parsedTags = [data.tags];
    }
  } else if (Array.isArray(data.tags)) {
    parsedTags = data.tags;
  }

  // Extract key takeaways from content
  const keyTakeaways = extractKeyTakeaways(content);

  return {
    id: data.slug,
    title: data.title,
    img: data.image_url || `/img/blog/${index}.jpg`,
    detailsImg: data.image_url || `/img/blog/blog-${index}.jpg`,
    smallImg: data.image_url || `/img/blog/post-thumb-${index}.jpg`,
    desc: data.summary,
    desc1: data.content_strategy,
    desc2: data.writing_style,
    desc3: data.subtitle || "", // Additional content
    content: content, // Full content
    keyTakeaways: keyTakeaways,
    date: formatDate(data.date),
    category: parsedTags?.[0] || "general",
    tags: parsedTags,
    author_role: "Analysis",
    author: "mohansagar",
    status: "Tutorial",
    blogTopList: [
      {
        iconName: "fa-regular fa-calendar-days",
        name: formatDate(data.date),
        path: false,
      },
      {
        iconName: "fa-regular fa-user",
        name: "mohansagar",
        path: true,
      },
    ],
    comments: [], // Initialize empty comments array
  };
}

function extractKeyTakeaways(content) {
  // Extract numbered lists, bullet points, or key sections
  const takeaways = [];

  // Look for numbered lists (1., 2., etc.)
  const numberedMatches = content.match(/^\d+\.\s+(.+)$/gm);
  if (numberedMatches && numberedMatches.length > 0) {
    takeaways.push(
      ...numberedMatches.map((match) => match.replace(/^\d+\.\s+/, "").trim())
    );
  }

  // Look for bullet points with - or *
  const bulletMatches = content.match(/^[\-\*]\s+(.+)$/gm);
  if (bulletMatches && bulletMatches.length > 0) {
    takeaways.push(
      ...bulletMatches.map((match) => match.replace(/^[\-\*]\s+/, "").trim())
    );
  }

  // If no takeaways found, extract key sentences
  if (takeaways.length === 0) {
    const sentences = content
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 20);
    takeaways.push(...sentences.slice(0, 4).map((s) => s.trim()));
  }

  return takeaways.slice(0, 4); // Limit to 4 key takeaways
}

function run() {
  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".mdx"));
  const result = [];

  files.forEach((file, i) => {
    const filePath = path.join(postsDir, file);
    console.log(`Parsing file: ${file}`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    try {
      const { data, content } = matter(fileContent);
      const blogData = convertFrontmatterToJson(data, content, i + 1);
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
