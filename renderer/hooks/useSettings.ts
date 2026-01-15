import { useState, useEffect } from "react";

export interface AppSettings {
  downloadPath: string;
  maxConcurrentDownloads: number;
  onFileExists: "overwrite" | "skip" | "rename";
  defaultQuality: string;
  defaultFormat: string;
}

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const data = await (window as any).ipc.invoke("settings:get");
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    try {
      const updated = await (window as any).ipc.invoke(
        "settings:update",
        newSettings
      );
      setSettings(updated);
      return updated;
    } catch (error) {
      console.error("Failed to update settings:", error);
      throw error;
    }
  };

  const getDefaults = async () => {
    try {
      const data = await (window as any).ipc.invoke("settings:get-defaults");
      return data as AppSettings;
    } catch (error) {
      console.error("Failed to fetch default settings:", error);
      return null;
    }
  };

  const selectDirectory = async () => {
    try {
      const path = await (window as any).ipc.invoke(
        "settings:select-directory"
      );
      return path;
    } catch (error) {
      console.error("Failed to select directory:", error);
      return null;
    }
  };

  return {
    settings,
    loading,
    updateSettings,
    getDefaults,
    selectDirectory,
    refreshSettings: fetchSettings,
  };
};
