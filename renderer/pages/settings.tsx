import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import {
  GeneralSettings,
  AppearanceSettings,
  NotificationSettings,
  EngineSettings,
  AboutSettings,
} from "../components/screens/Settings";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // yt-dlp binary state
  const [binaryInfo, setBinaryInfo] = useState<{
    path: string;
    version: string | null;
  } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [updateError, setUpdateError] = useState<string | null>(null);

  const fetchBinaryInfo = useCallback(async () => {
    try {
      const result = await window.ipc.invoke("download:get-binary-info", null);
      if (result.success && result.data) {
        setBinaryInfo(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch binary info:", error);
    }
  }, []);

  const handleUpdateYtDlp = async () => {
    setIsUpdating(true);
    setUpdateStatus("idle");
    setUpdateError(null);

    try {
      const result = await window.ipc.invoke("download:update-binary", null);
      if (result.success) {
        setBinaryInfo(result.data);
        setUpdateStatus("success");
        setTimeout(() => setUpdateStatus("idle"), 3000);
      } else {
        setUpdateStatus("error");
        setUpdateError(result.error || "Update failed");
      }
    } catch (error) {
      setUpdateStatus("error");
      setUpdateError(error instanceof Error ? error.message : "Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchBinaryInfo();
  }, [fetchBinaryInfo]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="flex flex-col gap-6">
        <GeneralSettings />

        <AppearanceSettings
          theme={theme}
          setTheme={setTheme}
          mounted={mounted}
        />

        <NotificationSettings />

        <EngineSettings
          binaryInfo={binaryInfo}
          isUpdating={isUpdating}
          updateStatus={updateStatus}
          updateError={updateError}
          onUpdate={handleUpdateYtDlp}
        />

        <AboutSettings />
      </div>
    </div>
  );
};

export default SettingsPage;
