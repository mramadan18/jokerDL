/**
 * File Utilities
 * Helper functions for file operations and formatting
 */

import { app } from "electron";
import * as fs from "fs";
import * as path from "path";
import slugify from "slugify";
import { APP_CONFIG } from "../../../renderer/config/app-config";
import { settingsService } from "../settings.service";

/**
 * Get the default downloads directory
 */
export function getDefaultDownloadPath(): string {
  return app.getPath("downloads");
}

/**
 * Get a subdirectory in downloads for specific content types
 */
export function getDownloadSubPath(
  subDir:
    | "videos"
    | "audios"
    | "playlists"
    | "others"
    | "programs"
    | "compressed"
    | "documents"
): string {
  const settings = settingsService.getSettings();
  const basePath = settings.downloadPath;
  // Capitalize the first letter of the subDir
  const capitalizedDir = subDir.charAt(0).toUpperCase() + subDir.slice(1);
  const subPath = path.join(basePath, capitalizedDir);

  // Ensure directory exists
  if (!fs.existsSync(subPath)) {
    fs.mkdirSync(subPath, { recursive: true });
  }

  return subPath;
}

/**
 * Categorize a file by its extension
 */
export function getCategoryByExtension(
  filename: string
): "videos" | "audios" | "programs" | "compressed" | "documents" | "others" {
  const ext = path.extname(filename).toLowerCase();

  const categories: Record<string, string[]> = {
    programs: [
      ".exe",
      ".msi",
      ".apk",
      ".dmg",
      ".pkg",
      ".appimage",
      ".deb",
      ".rpm",
      ".vspackage",
      ".vsix",
    ],
    audios: [
      ".mp3",
      ".wav",
      ".m4a",
      ".flac",
      ".aac",
      ".ogg",
      ".wma",
      ".mka",
      ".opus",
    ],
    videos: [
      ".mp4",
      ".mkv",
      ".avi",
      ".mov",
      ".wmv",
      ".flv",
      ".webm",
      ".3gp",
      ".m4v",
      ".mpg",
      ".mpeg",
    ],
    compressed: [
      ".zip",
      ".rar",
      ".7z",
      ".tar",
      ".gz",
      ".bz2",
      ".xz",
      ".tgz",
      ".iso",
      ".img",
    ],
    documents: [
      ".pdf",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".ppt",
      ".pptx",
      ".txt",
      ".rtf",
      ".odt",
      ".ods",
      ".odp",
      ".csv",
    ],
  };

  for (const [category, extensions] of Object.entries(categories)) {
    if (extensions.includes(ext)) {
      return category as any;
    }
  }

  return "others";
}

export function slugifyFilename(text: string): string {
  if (!text) return "";

  return slugify(text, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: false, // Keep original case
    strict: true, // Strip special characters
    trim: true,
  });
}

/**
 * Sanitize a filename to remove invalid characters
 * Windows MAX_PATH is 260, but we need to account for the full path
 * Supports Unicode characters including Arabic, Chinese, etc.
 */
export function sanitizeFilename(
  filename: string,
  maxLength: number = 200,
  slugify: boolean = false
): string {
  if (!filename || typeof filename !== "string") {
    return "download";
  }

  // Get extension and base name to sanitize them separately
  const ext = path.extname(filename);
  const base = filename.substring(0, filename.length - ext.length);

  let sanitizedBase = base;

  if (slugify) {
    sanitizedBase = slugifyFilename(base);
  } else {
    // Standard sanitization
    // Characters not allowed in Windows filenames
    const invalidChars = /[<>:"/\\|?*\x00-\x1f]/g;
    sanitizedBase = base.replace(invalidChars, "_");
    sanitizedBase = sanitizedBase.trim().replace(/^\.+|\.+$/g, "");
    sanitizedBase = sanitizedBase.replace(/[\s_]{2,}/g, " ");
  }

  // Limit length
  if (sanitizedBase.length > maxLength) {
    const chars = Array.from(sanitizedBase);
    sanitizedBase = chars.slice(0, maxLength).join("").trim();
  }

  // Final cleanup of base
  sanitizedBase = sanitizedBase.replace(/[\s.]+$/g, "") || "download";

  // Reattach extension (also sanitize it just in case)
  const sanitizedExt = ext
    .replace(/[<>:"/\\|?*\x00-\x1f\s]/g, "")
    .toLowerCase();

  return sanitizedBase + sanitizedExt;
}

/**
 * Generate unique filename if file already exists
 */
export function generateUniqueFilename(dir: string, filename: string): string {
  const ext = path.extname(filename);
  const baseName = path.basename(filename, ext);
  let counter = 0;
  let newFilename = filename;

  while (fs.existsSync(path.join(dir, newFilename))) {
    counter++;
    newFilename = `${baseName} (${counter})${ext}`;
  }

  return newFilename;
}

/**
 * Get free disk space in bytes
 * Works on Linux, macOS, and Windows (Node.js 18.11.0+)
 */
export async function getFreeDiskSpace(
  dirPath: string
): Promise<number | null> {
  try {
    // Ensure directory exists
    if (!fs.existsSync(dirPath)) {
      // Try parent directory
      const parentDir = path.dirname(dirPath);
      if (!fs.existsSync(parentDir)) {
        return null;
      }
      dirPath = parentDir;
    }

    // Use statfsSync if available (Node.js 18.11.0+)
    // This works on Linux, macOS, and Windows
    if (
      typeof (
        fs as unknown as {
          statfsSync?: (path: string) => { bfree: number; bsize: number };
        }
      ).statfsSync === "function"
    ) {
      const stats = (
        fs as unknown as {
          statfsSync: (path: string) => { bfree: number; bsize: number };
        }
      ).statfsSync(dirPath);
      return stats.bfree * stats.bsize;
    }

    // Fallback: return null if statfsSync is not available
    // The download will proceed without disk space check
    return null;
  } catch (error) {
    // If check fails, return null to allow download to proceed
    // This prevents blocking downloads on systems where disk space check is not available
    console.warn("[FileUtils] Failed to check disk space:", error);
    return null;
  }
}

/**
 * Parse size string (e.g. "10.5 MiB") to bytes
 */
export function parseBytes(sizeStr: string): number {
  if (!sizeStr) return 0;

  // Clean whitespace
  sizeStr = sizeStr.trim();

  // Extract number and unit
  const match = sizeStr.match(/^([\d.]+)\s*([a-zA-Z]+)$/);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  const multipliers: Record<string, number> = {
    b: 1,
    k: 1024,
    kb: 1024,
    kib: 1024,
    m: 1024 * 1024,
    mb: 1024 * 1024,
    mib: 1024 * 1024,
    g: 1024 * 1024 * 1024,
    gb: 1024 * 1024 * 1024,
    gib: 1024 * 1024 * 1024,
    t: 1024 * 1024 * 1024 * 1024,
    tb: 1024 * 1024 * 1024 * 1024,
    tib: 1024 * 1024 * 1024 * 1024,
  };

  return value * (multipliers[unit] || 1);
}

/**
 * Rename file to a temporary name for later deletion
 * This helps unlock files on Windows by breaking the file handle
 */
export function renameFileForDeletion(filePath: string): string | null {
  if (!fs.existsSync(filePath)) return null;

  try {
    const dir = path.dirname(filePath);
    const ext = path.extname(filePath);
    const baseName = path.basename(filePath, ext);
    const tempName = `.${baseName}.deleting.${Date.now()}${ext}`;
    const tempPath = path.join(dir, tempName);

    fs.renameSync(filePath, tempPath);
    return tempPath;
  } catch (error: any) {
    console.warn(
      `[FileUtils] Failed to rename file for deletion: ${filePath} - ${error.message}`
    );
    return null;
  }
}

/**
 * Schedule file deletion in background after delay
 */
export function scheduleFileDeletion(
  filePath: string,
  delayMs: number = 10000
): void {
  setTimeout(async () => {
    try {
      if (fs.existsSync(filePath)) {
        await deleteFileWithRetry(filePath, 10, 2000);
      }
    } catch (error) {
      console.warn(
        `[FileUtils] Scheduled deletion failed for: ${filePath}`,
        error
      );
    }
  }, delayMs);
}

/**
 * Delete a file with retry mechanism (handles EBUSY/EPERM)
 * On Windows, uses rename-then-delete strategy for locked files
 */
export async function deleteFileWithRetry(
  filePath: string,
  maxRetries: number = 5,
  retryDelay: number = 1000
): Promise<boolean> {
  if (!fs.existsSync(filePath)) return true;

  const isWindows = process.platform === "win32";

  // On Windows, try rename first to break file handle locks
  if (isWindows) {
    const renamedPath = renameFileForDeletion(filePath);
    if (renamedPath) {
      // Try to delete the renamed file immediately
      try {
        fs.unlinkSync(renamedPath);
        return true;
      } catch (error: any) {
        // If immediate delete fails, schedule it for later
        console.log(
          `[FileUtils] File renamed but still locked, scheduling deletion: ${renamedPath}`
        );
        scheduleFileDeletion(renamedPath, 10000);
        // Continue with retry attempts on original path as fallback
      }
    }
  }

  for (let i = 0; i < maxRetries; i++) {
    try {
      // Normal delete attempt
      fs.unlinkSync(filePath);
      return true;
    } catch (error: any) {
      const isLockError =
        error.code === "EBUSY" ||
        error.code === "EPERM" ||
        error.code === "EACCES" ||
        (isWindows && error.code === "ENOENT"); // Sometimes Windows returns ENOENT for locked files

      if (isLockError && i < maxRetries - 1) {
        // Wait before retrying with exponential backoff
        const delay = retryDelay * (i + 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        // Last attempt or non-lock error
        if (i === maxRetries - 1) {
          console.warn(
            `[FileUtils] Failed to delete file after ${maxRetries} attempts: ${filePath} (${
              error.code || error.message
            })`
          );
          // On Windows, try rename and schedule for later deletion
          if (isWindows) {
            const renamedPath = renameFileForDeletion(filePath);
            if (renamedPath) {
              console.log(
                `[FileUtils] File renamed for scheduled deletion: ${renamedPath}`
              );
              scheduleFileDeletion(renamedPath, 15000);
              return true; // Consider it "deleted" since it's renamed and scheduled
            }
          }
        }
        return false;
      }
    }
  }
  return false;
}
