/**
 * Pull H2/H3 headings from HTML for TOC / anchors.
 * Adds id attributes when missing (returned as `htmlWithIds`).
 */
export function extractHeadings(html = "") {
  if (!html) return { headings: [], htmlWithIds: html };

  const used = new Set();
  const slugify = (text) => {
    let base = text
      .toLowerCase()
      .replace(/<[^>]+>/g, "")
      .replace(/&[^;]+;/g, " ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 80);
    if (!base) base = "section";
    let id = base;
    let n = 2;
    while (used.has(id)) {
      id = `${base}-${n++}`;
    }
    used.add(id);
    return id;
  };

  const headings = [];
  const htmlWithIds = html.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (full, level, attrs = "", inner) => {
      const text = inner.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      if (!text) return full;
      const existing = /\sid\s*=\s*["']([^"']+)["']/i.exec(attrs || "");
      const id = existing ? existing[1] : slugify(text);
      if (!existing) used.add(id);
      headings.push({ level: Number(level), id, text });
      if (existing) return full;
      const nextAttrs = attrs ? `${attrs} id="${id}"` : ` id="${id}"`;
      return `<h${level}${nextAttrs}>${inner}</h${level}>`;
    }
  );

  return { headings, htmlWithIds };
}

/** Plain-text word count for TOC threshold. */
export function wordCountFromHtml(html = "") {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return 0;
  return text.split(" ").length;
}

/**
 * Best-effort FAQ pairs from an FAQ section in HTML (for FAQPage JSON-LD).
 */
export function extractFaqPairs(html = "") {
  if (!html || !/faq|frequently asked/i.test(html)) return [];

  const sectionMatch =
    html.match(
      /<h2[^>]*>[\s\S]*?(?:faq|frequently asked)[\s\S]*?<\/h2>([\s\S]*?)(?=<h2[\s>]|$)/i
    ) || [];
  const section = sectionMatch[1] || html;
  const pairs = [];

  // Pattern: <h3>Question?</h3> followed by block(s) until next h3/h2
  const re =
    /<h3[^>]*>([\s\S]*?)<\/h3>\s*([\s\S]*?)(?=<h[23][\s>]|$)/gi;
  let m;
  while ((m = re.exec(section)) !== null) {
    const question = m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const answer = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (question && answer && question.length < 300 && answer.length > 10) {
      pairs.push({ question, answer });
    }
  }
  return pairs.slice(0, 20);
}
