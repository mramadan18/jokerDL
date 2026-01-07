import { Clock, HardDrive, Globe, Eye } from "lucide-react";
import {
  formatDuration,
  formatViewCount,
  formatBytes,
} from "../../../utils/formatters";

interface VideoFormat {
  hasVideo?: boolean;
  hasAudio?: boolean;
  filesize?: number;
  filesizeApprox?: number;
}

interface VideoInfo {
  title: string;
  duration?: number;
  viewCount?: number;
  formats: VideoFormat[];
  extractor?: string;
}

interface VideoMetadataProps {
  videoInfo: VideoInfo;
}

export const VideoMetadata = ({ videoInfo }: VideoMetadataProps) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-2 line-clamp-2">
        {videoInfo.title}
      </h3>
      <div className="flex flex-wrap gap-4 text-small text-default-500 mb-6">
        {videoInfo.duration && (
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{formatDuration(videoInfo.duration)}</span>
          </div>
        )}
        {videoInfo.viewCount && (
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{formatViewCount(videoInfo.viewCount)} views</span>
          </div>
        )}
        {videoInfo.formats.length > 0 && (
          <div className="flex items-center gap-1">
            <HardDrive size={16} />
            <span>
              {formatBytes(
                videoInfo.formats[0].filesize ||
                  videoInfo.formats[0].filesizeApprox
              )}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1 text-primary font-medium">
          <Globe size={16} />
          <span>{videoInfo.extractor || "Direct Link"}</span>
        </div>
      </div>
    </div>
  );
};
