import {
  File,
  FileVideo,
  Music,
  Archive,
  FileText,
  Package,
  LucideIcon,
} from "lucide-react";
import { getSimpleFileType, SimpleFileType } from "./file-categories";

// Re-export for backward compatibility
export type { SimpleFileType };

interface FileIconProps {
  Icon: LucideIcon;
  className: string;
}

/**
 * Get appropriate icon component and className for file type
 */
export const getFileIconProps = (
  type?: SimpleFileType | string,
): FileIconProps => {
  switch (type) {
    case "video":
      return { Icon: FileVideo, className: "text-primary" };
    case "audio":
      return { Icon: Music, className: "text-secondary" };
    case "compressed":
      return { Icon: Archive, className: "text-warning" };
    case "document":
      return { Icon: FileText, className: "text-info" };
    case "program":
      return { Icon: Package, className: "text-success" };
    default:
      return { Icon: File, className: "text-default-500" };
  }
};

/**
 * Get file icon JSX element for a given filename
 * @param filename - The filename to get icon for
 * @param size - Icon size (default: 24)
 */
export const getFileIcon = (filename: string | null, size: number = 24) => {
  if (!filename) return <File size={size} />;

  const type = getSimpleFileType(filename);
  const { Icon, className } = getFileIconProps(type);
  return <Icon size={size} className={className} />;
};

/**
 * Get file type from filename extension
 * @deprecated Use getSimpleFileType from file-categories.ts instead
 */
export const getFileTypeFromExtension = (filename: string): SimpleFileType => {
  return getSimpleFileType(filename);
};
