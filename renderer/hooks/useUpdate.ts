import { useState, useEffect } from "react";

export interface UpdateStatus {
  status:
    | "checking"
    | "available"
    | "up-to-date"
    | "downloaded"
    | "error"
    | "idle";
  message: string;
  version?: string;
  error?: string;
}

export interface UpdateProgress {
  bytesPerSecond: number;
  percent: number;
  total: number;
  transferred: number;
}

export const useUpdate = () => {
  const [status, setStatus] = useState<UpdateStatus>({
    status: "idle",
    message: "",
  });
  const [progress, setProgress] = useState<UpdateProgress | null>(null);

  useEffect(() => {
    const handleStatus = (data: UpdateStatus) => {
      setStatus(data);
    };

    const handleProgress = (data: UpdateProgress) => {
      setProgress(data);
    };

    const removeStatus = window.ipc.on("update-status", handleStatus);
    const removeProgress = window.ipc.on("update-progress", handleProgress);

    return () => {
      removeStatus();
      removeProgress();
    };
  }, []);

  const checkForUpdate = () => {
    window.ipc.send("check-for-update", null);
  };

  const installUpdate = () => {
    window.ipc.send("install-update", null);
  };

  return {
    status,
    progress,
    checkForUpdate,
    installUpdate,
  };
};
