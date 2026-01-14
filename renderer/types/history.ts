export interface HistoryRecord {
  id: string;
  url: string;
  originalUrl?: string;
  filename: string;
  path: string;
  size: number;
  status: "completed" | "failed" | "cancelled";
  date: string; // ISO string
  type: "video" | "audio" | "file";
  thumbnail?: string;
  mimeType?: string;
  duration?: string;
  exists?: boolean;
}
