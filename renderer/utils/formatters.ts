import { DownloadQuality } from "../hooks/useDownload";
import { PLATFORMS } from "../types/download";

/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes: number | null): string {
  if (!bytes) return "Unknown";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Format duration in seconds to readable string
 */
export function formatDuration(seconds: number | null): string {
  if (!seconds) return "--:--";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Format view count
 */
export function formatViewCount(views: number | null): string {
  if (!views) return "N/A";
  if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
  if (views >= 1000) return (views / 1000).toFixed(1) + "K";
  return views.toString();
}

/**
 * Detect platform from URL
 */
export function detectPlatform(
  url: string
): { name: string; icon: string } | null {
  try {
    const hostname = new URL(url).hostname.toLowerCase().replace("www.", "");
    for (const platform of Object.values(PLATFORMS)) {
      if (platform.domains.some((d) => hostname.includes(d))) {
        return { name: platform.name, icon: platform.icon };
      }
    }
  } catch {
    // Invalid URL
  }
  return null;
}

/**
 * Quality options for downloads
 */
export const QUALITY_OPTIONS = [
  { key: DownloadQuality.BEST, label: "Best Quality (Auto)" },
  { key: DownloadQuality.QUALITY_4K, label: "4K (2160p)" },
  { key: DownloadQuality.QUALITY_1440P, label: "2K (1440p)" },
  { key: DownloadQuality.QUALITY_1080P, label: "Full HD (1080p)" },
  { key: DownloadQuality.QUALITY_720P, label: "HD (720p)" },
  { key: DownloadQuality.QUALITY_480P, label: "SD (480p)" },
  { key: DownloadQuality.QUALITY_360P, label: "Low (360p)" },
  { key: DownloadQuality.AUDIO_ONLY, label: "Audio Only" },
];

/**
 * Video format options
 */
export const FORMAT_OPTIONS = [
  { key: "mp4", label: "MP4 (Recommended)" },
  { key: "mkv", label: "MKV" },
  { key: "webm", label: "WebM" },
];

/**
 * Audio format options
 */
export const AUDIO_FORMAT_OPTIONS = [
  { key: "mp3", label: "MP3" },
  { key: "m4a", label: "M4A (AAC)" },
  { key: "opus", label: "Opus" },
  { key: "flac", label: "FLAC (Lossless)" },
];
