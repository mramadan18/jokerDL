import * as path from "path";
import { BaseDownloader } from "./base-downloader";
import { VideoInfo, ApiResponse, DownloadOptions } from "../types";
import { getYtDlpWrap, ensureYtDlp } from "../../utils/binary-manager";
import { getDownloadSubPath } from "../../utils/file-utils";

export class PlaylistDownloader extends BaseDownloader {
  /**
   * Fetch playlist metadata/entries without downloading
   */
  async getPlaylistMetadata(url: string): Promise<ApiResponse<VideoInfo>> {
    try {
      await ensureYtDlp();
      const ytDlp = getYtDlpWrap();

      const args = [
        url,
        "--dump-single-json",
        "--no-warnings",
        "--no-check-certificates",
        "--flat-playlist",
        "--playlist-items",
        "1-100", // Limit to first 100 items for metadata safety
      ];

      const rawOutput = await ytDlp.execPromise(args);
      const metadata = JSON.parse(rawOutput);

      // Map basic metadata to VideoInfo (simplified for playlist scanning)
      const videoInfo: VideoInfo = {
        id: metadata.id,
        title: metadata.title,
        description: metadata.description || null,
        duration: metadata.duration || null,
        durationString: metadata.duration_string || null,
        uploader: metadata.uploader || null,
        uploaderUrl: metadata.uploader_url || null,
        uploadDate: metadata.upload_date || null,
        viewCount: metadata.view_count || null,
        likeCount: metadata.like_count || null,
        thumbnail: metadata.thumbnail || null,
        thumbnails: metadata.thumbnails || [],
        formats: [],
        subtitles: {},
        webpage_url: metadata.webpage_url,
        extractor: metadata.extractor,
        extractorKey: metadata.extractor_key,
        isLive: metadata.is_live || false,
        isPlaylist: true,
      };

      if (metadata.entries) {
        videoInfo.playlist = {
          id: metadata.id,
          title: metadata.title,
          description: metadata.description || null,
          uploader: metadata.uploader || null,
          uploaderUrl: metadata.uploader_url || null,
          thumbnail: metadata.thumbnail || null,
          videoCount: metadata.entries.length,
          videos: metadata.entries.map((e: any, index: number) => ({
            id: e.id,
            title: e.title,
            duration: e.duration || null,
            thumbnail:
              e.thumbnail ||
              (e.thumbnails?.length
                ? e.thumbnails[e.thumbnails.length - 1].url
                : null),
            url: e.url || e.webpage_url,
            index: index + 1,
          })),
        };
      }

      return { success: true, data: videoInfo };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch playlist",
      };
    }
  }

  /**
   * Orchestrate: decompose playlist into single video download options
   */
  preparePlaylistVideoTasks(
    videoInfo: VideoInfo,
    baseOptions: DownloadOptions,
  ): { options: DownloadOptions; videoInfo: VideoInfo }[] {
    if (!videoInfo.playlist || !videoInfo.playlist.videos) return [];

    // Ensure we have a valid output path that includes the playlist name
    const basePath =
      baseOptions.outputPath ||
      getDownloadSubPath(baseOptions.audioOnly ? "audios" : "videos");
    let targetPath = basePath;

    if (videoInfo.playlist.title) {
      const cleanTitle = videoInfo.playlist.title
        .replace(/[<>:"/\\|?*\x00-\x1f]/g, "_")
        .trim()
        .substring(0, 80); // Safer length for Windows paths

      // Always ensure the playlist title is a subfolder of the base path
      // This is more robust than checking basename
      const pathSegments = targetPath.split(path.sep);
      if (!pathSegments.includes(cleanTitle)) {
        targetPath = path.join(basePath, cleanTitle);
      }
    }

    return videoInfo.playlist.videos.map((video) => {
      const index = video.index;

      // Merge base options with playlist-specific settings
      const options: DownloadOptions = {
        ...baseOptions,
        url: video.url,
        isPlaylist: true,
        playlistIndex: index,
        outputPath: targetPath, // Explicitly set the target path
        // Windows Solution: Add index to filename for sorting + trim via flag
        filename: baseOptions.filename
          ? `${index} - ${baseOptions.filename}`
          : `${index} - %(title)s.%(ext)s`,
      };

      // Create a minimal videoInfo for this specific video so title/thumb appear in UI
      const miniVInfo: VideoInfo = {
        id: video.id,
        title: video.title,
        thumbnail: video.thumbnail,
        webpage_url: video.url,
        duration: video.duration,
        formats: [],
        subtitles: {},
        isPlaylist: false,
        extractor: videoInfo.extractor,
        extractorKey: videoInfo.extractorKey,
      } as any;

      return { options, videoInfo: miniVInfo };
    });
  }
}
