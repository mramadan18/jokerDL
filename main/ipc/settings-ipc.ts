import { ipcMain } from "electron";
import { settingsService, AppSettings } from "../services/settings.service";
import { directDownloader } from "../services/downloader/direct";

export const initializeSettingsIpc = () => {
  ipcMain.handle("settings:get", () => {
    return settingsService.getSettings();
  });

  ipcMain.handle("settings:get-defaults", () => {
    return settingsService.getDefaults();
  });

  ipcMain.handle(
    "settings:update",
    (_event, settings: Partial<AppSettings>) => {
      const updated = settingsService.updateSettings(settings);

      // Notify services of changes that require immediate action
      if (settings.maxConcurrentDownloads !== undefined) {
        directDownloader.updateGlobalSettings().catch(() => {});
      }

      return updated;
    }
  );

  ipcMain.handle("settings:select-directory", () => {
    return settingsService.selectDirectory();
  });
};
