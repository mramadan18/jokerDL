/**
 * Shared File Categories Constants
 * Centralized file extension categorization used across the app
 * Eliminates duplicate category definitions in multiple files
 */

export const FILE_CATEGORIES = {
  programs: [
    "exe",
    "msi",
    "apk",
    "dmg",
    "pkg",
    "appimage",
    "deb",
    "rpm",
    "vspackage",
    "vsix",
  ],
  audios: ["mp3", "wav", "m4a", "flac", "aac", "ogg", "wma", "mka", "opus"],
  videos: [
    "mp4",
    "mkv",
    "avi",
    "mov",
    "wmv",
    "flv",
    "webm",
    "3gp",
    "m4v",
    "mpg",
    "mpeg",
  ],
  compressed: [
    "zip",
    "rar",
    "7z",
    "tar",
    "gz",
    "bz2",
    "xz",
    "tgz",
    "iso",
    "img",
  ],
  documents: [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
    "rtf",
    "odt",
    "ods",
    "odp",
    "csv",
  ],
} as const;

export type FileCategory = keyof typeof FILE_CATEGORIES | "others";

/**
 * Get file category from extension
 * Works with both "mp4" and ".mp4" formats
 */
export function getCategoryFromExtension(extension: string): FileCategory {
  const ext = extension.toLowerCase().replace(/^\./, "");

  for (const [category, extensions] of Object.entries(FILE_CATEGORIES)) {
    if ((extensions as readonly string[]).includes(ext)) {
      return category as FileCategory;
    }
  }

  return "others";
}

/**
 * Get file category from filename
 */
export function getCategoryFromFilename(filename: string): FileCategory {
  if (!filename) return "others";
  const ext = filename.split(".").pop() || "";
  return getCategoryFromExtension(ext);
}

/**
 * Mapped type for simplified category names (video, audio, etc.)
 */
export type SimpleFileType =
  | "video"
  | "audio"
  | "compressed"
  | "document"
  | "program"
  | "file";

/**
 * Map plural category to singular type
 */
const categoryToTypeMap: Record<FileCategory, SimpleFileType> = {
  videos: "video",
  audios: "audio",
  compressed: "compressed",
  documents: "document",
  programs: "program",
  others: "file",
};

/**
 * Get simple file type (singular) from filename
 */
export function getSimpleFileType(filename: string): SimpleFileType {
  const category = getCategoryFromFilename(filename);
  return categoryToTypeMap[category];
}
