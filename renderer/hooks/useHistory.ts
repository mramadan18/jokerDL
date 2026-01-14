import { useState, useEffect, useCallback } from "react";
import { HistoryRecord } from "../types/history";

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const records = await window.ipc.invoke("history:get", null);
      setHistory(records);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteRecord = useCallback(async (id: string, deleteFile: boolean) => {
    try {
      await window.ipc.invoke("history:delete", { id, deleteFile });
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  }, []);

  const clearHistory = useCallback(async () => {
    try {
      await window.ipc.invoke("history:clear", null);
      setHistory([]);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  }, []);

  const openFile = useCallback(async (path: string) => {
    return await window.ipc.invoke("history:open-file", path);
  }, []);

  const openFolder = useCallback(async (path: string) => {
    return await window.ipc.invoke("history:open-folder", path);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const filteredHistory = history.filter((item) =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    history: filteredHistory,
    isLoading,
    searchQuery,
    setSearchQuery,
    fetchHistory,
    deleteRecord,
    clearHistory,
    openFile,
    openFolder,
  };
};
