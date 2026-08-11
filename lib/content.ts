// ─────────────────────────────────────────────────────────────────────────────
// La Bella Vita — sheet-driven content layer.
//
// Priority order: published Google Sheet CSV (runtime) > messages/*.json (build-time
// fallback) > key itself (should never surface — every canonical key has a fallback).
// A bad or unreachable sheet must never break the page: fetchContent() swallows every
// error and returns {}, which getContent() then treats as "sheet has nothing to add".
// ─────────────────────────────────────────────────────────────────────────────

export type ContentMap = Record<string, string>;

export interface ParsedCsv {
  headers: string[];
  rows: Record<string, string>[];
}

/**
 * Small dependency-free CSV parser. Handles quoted fields containing commas,
 * newlines, and escaped quotes ("") per RFC 4180. Returns the header row plus
 * one object per data row, keyed by the (raw, untouched) header row — column
 * matching against those raw headers happens in fetchContent().
 */
export function parseCsv(text: string): ParsedCsv {
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
  if (nonEmptyRows.length === 0) return { headers: [], rows: [] };

  const headers = nonEmptyRows[0].map((h) => h.trim());
  const dataRows = nonEmptyRows.slice(1).map((r) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = (r[i] ?? "").trim();
    });
    return obj;
  });

  return { headers, rows: dataRows };
}

/**
 * Finds the actual header name whose (case-insensitive, trimmed) text starts
 * with the given prefix. The published Sheet's real headers are editor-facing
 * labels like "key (do not edit)" or "TEXT — EDIT HERE (SK)", not the bare
 * "key"/"text" names — matching by prefix survives those annotations and the
 * per-language suffix on the text column.
 */
function findColumn(headers: string[], prefix: string): string | undefined {
  const lower = prefix.toLowerCase();
  return headers.find((h) => h.trim().toLowerCase().startsWith(lower));
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

    const { headers, rows } = parseCsv(text);

    // Match by prefix, not exact name — the real Sheet headers are editor-facing
    // labels ("key (do not edit)", "TEXT — EDIT HERE (SK)"), not bare "key"/"text".
    const keyHeader = findColumn(headers, "key");
    const textHeader = findColumn(headers, "text");
    if (!keyHeader || !textHeader) return {};

    const map: ContentMap = {};
    for (const row of rows) {
      const key = row[keyHeader]?.trim();
      const value = row[textHeader];
      if (key && value && value.trim() !== "") {
        map[key] = value;
      }
    }

    // TEMPORARY — remove once sheet sync is confirmed working in Vercel logs.
    console.log(`[content] parsed ${Object.keys(map).length} keys from ${url}`);

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
