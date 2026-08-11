// ─────────────────────────────────────────────────────────────────────────────
// La Bella Vita — sheet-driven content layer.
//
// Priority order: published Google Sheet CSV (runtime) > messages/*.json (build-time
// fallback) > key itself (should never surface — every canonical key has a fallback).
// A bad or unreachable sheet must never break the page: fetchContent() swallows every
// error and returns {}, which getContent() then treats as "sheet has nothing to add".
// ─────────────────────────────────────────────────────────────────────────────

export type ContentMap = Record<string, string>;

/**
 * Small dependency-free CSV parser. Handles quoted fields containing commas,
 * newlines, and escaped quotes ("") per RFC 4180. Returns one object per data
 * row, keyed by the header row.
 */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char === "\r") {
      // skip — \r\n handled by the following \n
    } else {
      field += char;
    }
  }

  // Flush the last field/row if the file doesn't end with a newline
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const nonEmptyRows = rows.filter((r) => r.some((cell) => cell.trim() !== ""));
  if (nonEmptyRows.length === 0) return [];

  const header = nonEmptyRows[0].map((h) => h.trim());
  return nonEmptyRows.slice(1).map((r) => {
    const obj: Record<string, string> = {};
    header.forEach((h, i) => {
      obj[h] = (r[i] ?? "").trim();
    });
    return obj;
  });
}

/**
 * Fetches a published Google Sheet CSV and builds a { [key]: text } map.
 * Any failure (network error, empty URL, malformed response) resolves to {}
 * so the caller can fall back to the JSON-baked defaults with zero risk of
 * a broken page from a bad or unreachable sheet.
 */
export async function fetchContent(url: string): Promise<ContentMap> {
  if (!url) return {};

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return {};

    const text = await res.text();
    if (!text.trim()) return {};

    const rows = parseCsv(text);
    const map: ContentMap = {};
    for (const row of rows) {
      const key = row.key?.trim();
      const value = row.text;
      if (key && value && value.trim() !== "") {
        map[key] = value;
      }
    }
    return map;
  } catch {
    return {};
  }
}

/**
 * Merges a fallback map (from messages/*.json) with a sheet map. The sheet
 * wins only when it has a non-empty value for a given key; otherwise the
 * fallback value is kept. Result always has the same keys as fallbackMap.
 */
export function getContent(sheetMap: ContentMap, fallbackMap: ContentMap): ContentMap {
  const merged: ContentMap = { ...fallbackMap };
  for (const key of Object.keys(fallbackMap)) {
    const sheetValue = sheetMap[key];
    if (sheetValue && sheetValue.trim() !== "") {
      merged[key] = sheetValue;
    }
  }
  return merged;
}
