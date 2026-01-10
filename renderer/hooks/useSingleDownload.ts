import { useState, useCallback, useMemo } from "react";
import { useVideoInfo, startDownload, DownloadQuality } from "./useDownload";
import {
  detectPlatform,
  AUDIO_FORMAT_OPTIONS,
  FORMAT_OPTIONS,
  getAvailableQualityOptions,
} from "../utils/formatters";

export interface UseSingleDownloadReturn {
  // State
  url: string;
  selectedQuality: DownloadQuality;
  selectedFormat: string;
  isDownloading: boolean;
  downloadStatus: string | null;

  // Video info state
  videoInfo: ReturnType<typeof useVideoInfo>["videoInfo"];
  isLoading: boolean;
  error: string | null;

  // Computed values
  platform: { name: string; icon: string } | null;
  isAudioOnly: boolean;
  currentFormats: Array<{ key: string; label: string }>;
  availableQualities: Array<{ key: string; label: string }>;

  // Handlers
  handleUrlChange: (value: string) => void;
  handleFetch: () => Promise<void>;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleDownload: () => Promise<void>;
  handleClear: () => void;
  setSelectedQuality: (quality: DownloadQuality) => void;
  setSelectedFormat: (format: string) => void;
}

/**
 * Custom hook for managing single download logic
 */
export function useSingleDownload(): UseSingleDownloadReturn {
  // Local state
  const [url, setUrl] = useState("");
  const [selectedQuality, setSelectedQuality] = useState(DownloadQuality.BEST);
  const [selectedFormat, setSelectedFormat] = useState("mp4");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  // Video info hook
  const { videoInfo, isLoading, error, extract, reset } = useVideoInfo();

  // Computed values
  const platform = useMemo(() => {
    return url ? detectPlatform(url) : null;
  }, [url]);

  const isAudioOnly = useMemo(() => {
    return selectedQuality === DownloadQuality.AUDIO_ONLY;
  }, [selectedQuality]);

  const currentFormats = useMemo(() => {
    return isAudioOnly ? AUDIO_FORMAT_OPTIONS : FORMAT_OPTIONS;
  }, [isAudioOnly]);

  const availableQualities = useMemo(() => {
    return getAvailableQualityOptions(videoInfo);
  }, [videoInfo]);

  // Handle URL input change
  const handleUrlChange = useCallback(
    (value: string) => {
      setUrl(value);
      reset();
      setDownloadStatus(null);
    },
    [reset]
  );

  // Handle URL fetch
  const handleFetch = useCallback(async () => {
    if (!url.trim()) return;
    await extract(url.trim());
  }, [url, extract]);

  // Handle key press (Enter to fetch)
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleFetch();
      }
    },
    [handleFetch]
  );

  // Handle download
  const handleDownload = useCallback(async () => {
    if (!url.trim()) return;

    setIsDownloading(true);
    setDownloadStatus("Starting download...");

    try {
      const isAudioOnly = selectedQuality === DownloadQuality.AUDIO_ONLY;

      console.log("[handleDownload] selectedQuality:", selectedQuality);
      console.log(
        "[handleDownload] videoInfo?.qualityOptions:",
        videoInfo?.qualityOptions?.map((q) => ({
          key: q.key,
          videoFormatId: q.videoFormat?.formatId,
          audioFormatId: q.audioFormat?.formatId,
        }))
      );

      const result = await startDownload(videoInfo, {
        url: url.trim(),
        outputPath: "", // Will use default
        quality: selectedQuality,
        format: isAudioOnly ? selectedFormat : selectedFormat,
        audioOnly: isAudioOnly,
      });

      if (result.success) {
        setDownloadStatus(
          "Download started! Check Downloads tab for progress."
        );
      } else {
        setDownloadStatus(`Error: ${result.error}`);
      }
    } catch (err) {
      setDownloadStatus(
        `Error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setIsDownloading(false);
    }
  }, [url, videoInfo, selectedQuality, selectedFormat]);

  // Handle clear
  const handleClear = useCallback(() => {
    reset();
    setUrl("");
    setDownloadStatus(null);
  }, [reset]);

  // Handle quality change with format reset
  const handleQualityChange = useCallback((quality: DownloadQuality) => {
    console.log("[handleQualityChange] Changing quality to:", quality);
    setSelectedQuality(quality);
    // Reset format when switching to/from audio
    if (quality === DownloadQuality.AUDIO_ONLY) {
      setSelectedFormat("mp3");
    } else {
      setSelectedFormat("mp4");
    }
  }, []);

  return {
    // State
    url,
    selectedQuality,
    selectedFormat,
    isDownloading,
    downloadStatus,

    // Video info state
    videoInfo,
    isLoading,
    error,

    // Computed values
    platform,
    isAudioOnly,
    currentFormats,
    availableQualities,

    // Handlers
    handleUrlChange,
    handleFetch,
    handleKeyPress,
    handleDownload,
    handleClear,
    setSelectedQuality: handleQualityChange,
    setSelectedFormat,
  };
}
