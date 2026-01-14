import Store from "electron-store";
import { app, shell } from "electron";
import * as path from "path";
import * as fs from "fs";
import { DownloadItem, DownloadStatus } from "./downloader/types";

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
  exists?: boolean; // Computed at runtime
}

interface HistoryStoreSchema {
  history: HistoryRecord[];
}

class HistoryService {
  private store: Store<HistoryStoreSchema>;

  constructor() {
    this.store = new Store<HistoryStoreSchema>({
      name: "download-history",
      defaults: {
        history: [],
      },
    });
  }

  /**
   * Add a record to history
   */
  addRecord(item: DownloadItem): void {
    const history = this.store.get("history");

    // Determine type
    let type: "video" | "audio" | "file" = "file";
    if (item.videoInfo) {
      type = item.options.audioOnly ? "audio" : "video";
    }

    const record: HistoryRecord = {
      id: item.id,
      url: item.url,
      originalUrl: item.videoInfo?.webpage_url,
      filename: item.filename || item.progress.filename || "unknown",
      path: path.join(
        item.outputPath,
        item.filename || item.progress.filename || ""
      ),
      size: item.progress.totalBytes || 0,
      status: item.status === DownloadStatus.COMPLETED ? "completed" : "failed",
      date: new Date().toISOString(),
      type,
      thumbnail: item.videoInfo?.thumbnail || undefined,
      duration: item.videoInfo?.durationString || undefined,
    };

    // Add to beginning of array
    history.unshift(record);

    // Limit history size (optional, say 1000 items)
    if (history.length > 1000) {
      history.length = 1000;
    }

    this.store.set("history", history);
  }

  /**
   * Get history records
   */
  getHistory(): HistoryRecord[] {
    const history = this.store.get("history") || [];

    // Check file existence for each record
    // We map this at runtime to ensure it's always accurate
    return history.map((record) => ({
      ...record,
      exists: fs.existsSync(record.path),
    }));
  }

  /**
   * Delete a record
   */
  async deleteRecord(id: string, deleteFile: boolean): Promise<void> {
    const history = this.store.get("history");
    const recordIndex = history.findIndex((r) => r.id === id);

    if (recordIndex === -1) return;

    const record = history[recordIndex];

    if (deleteFile && record.path) {
      try {
        if (fs.existsSync(record.path)) {
          await fs.promises.unlink(record.path);
        }
      } catch (error) {
        console.error(
          `[HistoryService] Failed to delete file: ${record.path}`,
          error
        );
      }
    }

    history.splice(recordIndex, 1);
    this.store.set("history", history);
  }

  /**
   * Clear all history
   */
  clearHistory(): void {
    this.store.set("history", []);
  }

  /**
   * Open file in default handler
   */
  async openFile(filePath: string): Promise<boolean> {
    if (!fs.existsSync(filePath)) return false;
    const result = await shell.openPath(filePath);
    return result === ""; // empty string means success
  }

  /**
   * Open file location in explorer/finder
   */
  openFolder(filePath: string): boolean {
    if (!fs.existsSync(filePath)) return false;
    shell.showItemInFolder(filePath);
    return true;
  }
}

export const historyService = new HistoryService();

import { directDownloader } from "./downloader/direct";
import { videoDownloader } from "./downloader/video";

export const startHistoryRecording = () => {
  console.log("[HistoryService] Starting history recording...");

  directDownloader.on("complete", (item) => {
    console.log(`[HistoryService] Direct download completed: ${item.filename}`);
    historyService.addRecord(item);
  });

  videoDownloader.on("complete", (item) => {
    console.log(`[HistoryService] Video download completed: ${item.filename}`);
    historyService.addRecord(item);
  });
};
