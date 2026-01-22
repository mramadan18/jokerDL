/**
 * Download Status Utilities
 * Shared functions for download status display
 */

import { DownloadStatus } from "../types/download";
import {
  CheckCircle2,
  AlertCircle,
  Pause,
  Clock,
  Loader2,
  Download,
} from "lucide-react";
import { ReactNode } from "react";

export type StatusColor = "primary" | "success" | "warning" | "danger" | "default";

/**
 * Get color for download status (HeroUI color scheme)
 */
export function getStatusColor(status: DownloadStatus): StatusColor {
  switch (status) {
    case DownloadStatus.DOWNLOADING:
    case DownloadStatus.MERGING:
    case DownloadStatus.EXTRACTING:
    case DownloadStatus.CONVERTING:
      return "primary";
    case DownloadStatus.COMPLETED:
      return "success";
    case DownloadStatus.PAUSED:
    case DownloadStatus.PENDING:
      return "warning";
    case DownloadStatus.FAILED:
    case DownloadStatus.CANCELLED:
      return "danger";
    default:
      return "default";
  }
}

/**
 * Get human-readable label for download status
 */
export function getStatusLabel(status: DownloadStatus): string {
  const labels: Record<DownloadStatus, string> = {
    [DownloadStatus.PENDING]: "Pending",
    [DownloadStatus.EXTRACTING]: "Extracting...",
    [DownloadStatus.DOWNLOADING]: "Downloading",
    [DownloadStatus.MERGING]: "Merging...",
    [DownloadStatus.CONVERTING]: "Converting...",
    [DownloadStatus.COMPLETED]: "Completed",
    [DownloadStatus.PAUSED]: "Paused",
    [DownloadStatus.FAILED]: "Failed",
    [DownloadStatus.CANCELLED]: "Cancelled",
  };
  return labels[status] || status;
}

/**
 * Get icon for download status
 * @param size - Icon size (default: 12)
 */
export function getStatusIcon(status: DownloadStatus, size: number = 12): ReactNode {
  switch (status) {
    case DownloadStatus.COMPLETED:
      return <CheckCircle2 size={size} />;
    case DownloadStatus.FAILED:
    case DownloadStatus.CANCELLED:
      return <AlertCircle size={size} />;
    case DownloadStatus.PAUSED:
      return <Pause size={size} />;
    case DownloadStatus.PENDING:
      return <Clock size={size} />;
    case DownloadStatus.DOWNLOADING:
    case DownloadStatus.MERGING:
    case DownloadStatus.EXTRACTING:
    case DownloadStatus.CONVERTING:
      return <Loader2 size={size} className="animate-spin" />;
    default:
      return null;
  }
}

/**
 * Check if download is in an active state
 */
export function isActiveStatus(status: DownloadStatus): boolean {
  return [
    DownloadStatus.DOWNLOADING,
    DownloadStatus.MERGING,
    DownloadStatus.EXTRACTING,
    DownloadStatus.CONVERTING,
  ].includes(status);
}

/**
 * Check if download can be paused
 */
export function isPausableStatus(status: DownloadStatus): boolean {
  return status === DownloadStatus.DOWNLOADING;
}

/**
 * Check if download can be resumed
 */
export function isResumableStatus(status: DownloadStatus): boolean {
  return [DownloadStatus.PAUSED, DownloadStatus.FAILED].includes(status);
}

/**
 * Check if download can be cancelled
 */
export function isCancellableStatus(status: DownloadStatus): boolean {
  return ![DownloadStatus.COMPLETED, DownloadStatus.CANCELLED].includes(status);
}
