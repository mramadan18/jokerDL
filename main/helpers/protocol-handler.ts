import { app, BrowserWindow } from "electron";
import path from "path";

export function registerProtocolClient() {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient("remixdm", process.execPath, [
        path.resolve(process.argv[1]),
      ]);
    }
  } else {
    app.setAsDefaultProtocolClient("remixdm");
  }
}

export function handleProtocolUrl(url: string, mainWindow: BrowserWindow) {
  const cleanUrl = url.replace("remixdm://", "");
  if (!cleanUrl) return;

  // We wait a bit to ensure the frontend is ready to receive the event
  setTimeout(() => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send("protocol-url", cleanUrl);
    }
  }, 1500);
}
