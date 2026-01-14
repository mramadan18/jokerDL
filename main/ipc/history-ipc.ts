import { ipcMain } from "electron";
import { historyService } from "../services/history.service";

export const initializeHistoryIpc = () => {
  // Get history
  ipcMain.handle("history:get", () => {
    return historyService.getHistory();
  });

  // Delete record
  ipcMain.handle("history:delete", async (_, { id, deleteFile }) => {
    await historyService.deleteRecord(id, deleteFile);
    return true;
  });

  // Clear all history
  ipcMain.handle("history:clear", () => {
    historyService.clearHistory();
    return true;
  });

  // Open file
  ipcMain.handle("history:open-file", async (_, path) => {
    return await historyService.openFile(path);
  });

  // Open folder
  ipcMain.handle("history:open-folder", (_, path) => {
    return historyService.openFolder(path);
  });
};
