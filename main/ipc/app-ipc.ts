import { app, ipcMain } from "electron";

export function registerAppIpc() {
  ipcMain.on("get-app-version", (event) => {
    event.returnValue = app.getVersion();
  });

  ipcMain.on("message", async (event, arg) => {
    event.reply("message", `${arg} World!`);
  });
}
