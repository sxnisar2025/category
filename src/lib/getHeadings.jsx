// src/lib/getHeadings.js
export function extractHeadings(html) {
  const regex = /<h([2-3])[^>]*>(.*?)<\/h\1>/g;
  const headings = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: match[1],
      text: match[2].replace(/<[^>]+>/g, ""), // remove inner tags
      id: match[2].toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""),
    });
  }

  return headings;
}
