const STORAGE_KEY = "rentbuzz-saved-listings";
export const SAVED_LISTINGS_EVENT = "rentbuzz-saved-change";

function readSavedIds() {
  if (typeof window === "undefined") return [] as string[];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [];
  }
}

function writeSavedIds(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(SAVED_LISTINGS_EVENT));
}

export function getSavedIds() {
  return readSavedIds();
}

export function isSaved(id: string) {
  return readSavedIds().includes(id);
}

export function saveListing(id: string) {
  const nextIds = Array.from(new Set([...readSavedIds(), id]));
  writeSavedIds(nextIds);
}

export function unsaveListing(id: string) {
  const nextIds = readSavedIds().filter((savedId) => savedId !== id);
  writeSavedIds(nextIds);
}
