import { Image } from "@heroui/react";
import { FileVideo, User } from "lucide-react";
import { formatDuration } from "../../../utils/formatters";

interface VideoInfo {
  thumbnail?: string;
  duration?: number;
  isLive?: boolean;
  uploader?: string;
}

interface VideoThumbnailProps {
  videoInfo: VideoInfo;
}

export const VideoThumbnail = ({ videoInfo }: VideoThumbnailProps) => {
  return (
    <div className="md:col-span-1">
      <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg group bg-default-100">
        {videoInfo.thumbnail ? (
          <Image
            alt="Video Thumbnail"
            src={videoInfo.thumbnail}
            classNames={{
              wrapper: "w-full h-full",
              img: "object-cover w-full h-full transform transition-transform group-hover:scale-105",
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileVideo size={48} className="text-violet-500" />
          </div>
        )}
        {videoInfo.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md font-medium">
            {formatDuration(videoInfo.duration)}
          </div>
        )}
        {videoInfo.isLive && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
        )}
      </div>

      {/* Uploader info */}
      {videoInfo.uploader && (
        <div className="mt-3 flex items-center gap-2 text-sm text-default-500">
          <User size={14} />
          <span className="truncate">{videoInfo.uploader}</span>
        </div>
      )}
    </div>
  );
};
