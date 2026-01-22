import { Card, CardBody, Progress, Button, Chip } from "@heroui/react";
import { Pause, Play, X, Zap, Clock, FolderOpen } from "lucide-react";
import { DownloadStatus, DownloadItem } from "../../../types/download";
import { formatBytes } from "../../../utils/formatters";
import { getFileIcon } from "../../../utils/file-icons";
import {
  getStatusColor,
  getStatusLabel,
  getStatusIcon,
  isActiveStatus,
  isPausableStatus,
  isResumableStatus,
  isCancellableStatus,
} from "../../../utils/status-utils";
import Image from "next/image";

interface DownloadCardProps {
  item: DownloadItem;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onCancel: (id: string) => void;
  onOpenLocation: (path: string) => void;
  onOpenFile: (path: string) => void;
}

export const DownloadCard = ({
  item,
  onPause,
  onResume,
  onCancel,
  onOpenLocation,
  onOpenFile,
}: DownloadCardProps) => {
  const isActive = isActiveStatus(item.status);
  const isPausable = isPausableStatus(item.status);
  const isResumable = isResumableStatus(item.status);
  const isCancellable = isCancellableStatus(item.status);

  const fullPath =
    item.outputPath && item.filename
      ? `${item.outputPath}/${item.filename}`
      : item.outputPath;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow animate-appearance-in">
      <CardBody className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-20 h-14 bg-default-100 rounded-lg overflow-hidden shrink-0">
            {item.videoInfo?.thumbnail ? (
              <Image
                src={item.videoInfo.thumbnail}
                alt="Thumbnail"
                onClick={() =>
                  item.status === DownloadStatus.COMPLETED &&
                  fullPath &&
                  onOpenFile(fullPath)
                }
                width={500}
                height={500}
                className={`w-full h-full object-contain ${item.status === DownloadStatus.COMPLETED ? "cursor-pointer" : "cursor-default"} ${item.status === DownloadStatus.COMPLETED ? "hover:scale-115 transition-transform" : "opacity-70"}`}
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center text-primary ${
                  item.status === DownloadStatus.COMPLETED
                    ? "cursor-pointer hover:bg-default-200 transition-colors"
                    : "cursor-default"
                }`}
                onClick={() =>
                  item.status === DownloadStatus.COMPLETED &&
                  fullPath &&
                  onOpenFile(fullPath)
                }
              >
                {getFileIcon(item.filename)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2 mb-2">
              <h3 className="font-semibold truncate text-sm text-wrap line-clamp-2">
                {item.videoInfo?.title || item.filename || "Downloading..."}
              </h3>
              <div className="flex items-center gap-2 shrink-0 text-xs text-default-500">
                {item.progress.speedString && isActive && (
                  <>
                    <Zap size={12} className="text-warning" />
                    <span>{item.progress.speedString}</span>
                    <span className="text-default-300">|</span>
                  </>
                )}
                {item.progress.etaString && isActive && (
                  <>
                    <Clock size={12} />
                    <span>{item.progress.etaString}</span>
                    <span className="text-default-300">|</span>
                  </>
                )}
                <span>
                  {item.status === DownloadStatus.COMPLETED &&
                  item.progress.totalBytes
                    ? formatBytes(item.progress.totalBytes)
                    : formatBytes(item.progress.downloadedBytes)}
                  {item.progress.totalBytes &&
                    item.status !== DownloadStatus.COMPLETED &&
                    ` / ${formatBytes(item.progress.totalBytes)}`}
                </span>
              </div>
            </div>

            <Progress
              size="sm"
              value={item.progress.progress}
              color={getStatusColor(item.status)}
              className="max-w-full mb-2"
              isIndeterminate={
                item.status === DownloadStatus.EXTRACTING ||
                item.status === DownloadStatus.MERGING ||
                (item.status === DownloadStatus.DOWNLOADING &&
                  item.progress.progress === 0)
              }
            />

            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Chip
                  size="sm"
                  color={getStatusColor(item.status)}
                  variant="flat"
                  startContent={getStatusIcon(item.status)}
                >
                  {getStatusLabel(item.status)}
                  {isActive && ` ${Math.round(item.progress.progress)}%`}
                </Chip>

                {item.videoInfo?.uploader && (
                  <span className="text-xs text-default-400">
                    {item.videoInfo.uploader}
                  </span>
                )}
              </div>

              <div className="flex gap-1">
                {isPausable && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="warning"
                    onPress={() => onPause(item.id)}
                  >
                    <Pause size={16} />
                  </Button>
                )}
                {isResumable && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="success"
                    onPress={() => onResume(item.id)}
                  >
                    <Play size={16} />
                  </Button>
                )}
                {item.status === DownloadStatus.COMPLETED && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="primary"
                    onPress={() => fullPath && onOpenLocation(fullPath)}
                  >
                    <FolderOpen size={16} />
                  </Button>
                )}
                {isCancellable && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => onCancel(item.id)}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            </div>

            {item.error && item.status === DownloadStatus.FAILED && (
              <p className="text-xs text-danger mt-2 truncate text-wrap">
                {item.error}
              </p>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
