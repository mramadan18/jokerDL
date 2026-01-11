import { formatBytes } from "../../../utils/formatters";

interface DownloadsStatsProps {
  totalDownloaded: number;
  completedCount: number;
}

export const DownloadsStats = ({
  totalDownloaded,
  completedCount,
}: DownloadsStatsProps) => {
  return (
    <div className="mt-8 pt-4 border-t border-divider">
      <div className="flex justify-between text-sm text-default-400">
        <span>Total downloaded: {formatBytes(totalDownloaded)}</span>
        <span>{completedCount} files completed</span>
      </div>
    </div>
  );
};
