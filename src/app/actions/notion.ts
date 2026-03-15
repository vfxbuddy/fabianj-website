"use server";

import { NotionAPI } from "notion-client";

const notion = new NotionAPI();

/**
 * Extract the Notion page ID from a full URL.
 * Handles formats like:
 *   - https://efficacious-lotus-05e.notion.site/Page-Title-abc123def456
 *   - https://www.notion.so/workspace/abc123def456
 *   - abc123def456 (raw ID)
 */
function extractNotionId(urlOrId: string): string {
  // If it's already a clean ID (32 hex chars, with or without dashes)
  const cleanId = urlOrId.replace(/-/g, "");
  if (/^[a-f0-9]{32}$/i.test(cleanId)) {
    return urlOrId;
  }

  // Extract the ID from the end of a URL path
  const match = urlOrId.match(/([a-f0-9]{32}|[a-f0-9-]{36})(?:\?|$)/i);
  if (match) {
    return match[1];
  }

  // Try to get the last segment after the last dash in the URL path
  try {
    const url = new URL(urlOrId);
    const path = url.pathname.split("/").pop() || "";
    // Notion URLs end with the ID as the last 32 hex chars of the slug
    const slugMatch = path.match(/([a-f0-9]{32})$/i);
    if (slugMatch) {
      return slugMatch[1];
    }
  } catch {
    // Not a URL, return as-is
  }

  return urlOrId;
}

export async function getNotionPage(urlOrId: string) {
  try {
    const pageId = extractNotionId(urlOrId);
    const recordMap = await notion.getPage(pageId);
    return { recordMap, error: null };
  } catch (err) {
    console.error("Failed to fetch Notion page:", err);
    return { recordMap: null, error: "Failed to load page content." };
  }
}
