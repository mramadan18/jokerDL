import Store from "electron-store";
import { app, dialog } from "electron";
import * as path from "path";
import { APP_CONFIG } from "../../renderer/config/app-config";

export interface AppSettings {
  downloadPath: string;
  maxConcurrentDownloads: number;
  onFileExists: "overwrite" | "skip" | "rename";
  defaultQuality: string;
  defaultFormat: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  downloadPath: path.join(app.getPath("downloads"), APP_CONFIG.name),
  maxConcurrentDownloads: 3,
  onFileExists: "rename",
  defaultQuality: "1080p",
  defaultFormat: "mp4",
};

class SettingsService {
  private store: Store<AppSettings>;

  constructor() {
    this.store = new Store<AppSettings>({
      name: "app-settings",
      defaults: DEFAULT_SETTINGS,
    });
  }

  getSettings(): AppSettings {
    return this.store.store;
  }

  getDefaults(): AppSettings {
    return DEFAULT_SETTINGS;
  }

  updateSettings(settings: Partial<AppSettings>): AppSettings {
    this.store.set(settings);
    return this.getSettings();
  }

  async selectDirectory(): Promise<string | null> {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    return result.filePaths[0];
  }
}

export const settingsService = new SettingsService();
