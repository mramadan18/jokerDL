import { Card, CardBody } from "@heroui/react";
import {
  LucideIcon,
  Download,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Inbox,
} from "lucide-react";
import { ReactNode } from "react";

export interface EmptyStateConfig {
  icon: ReactNode;
  title: string;
  description: string;
}

interface EmptyStateProps {
  /** Pre-configured type for common use cases */
  type?:
    | "active"
    | "completed"
    | "failed"
    | "all"
    | "history"
    | "playlist"
    | "queue";
  /** Custom icon (overrides type icon) */
  icon?: ReactNode;
  /** Custom title (overrides type title) */
  title?: string;
  /** Custom description (overrides type description) */
  description?: string;
  /** Use card style (like History) vs simple style (like Downloads) */
  variant?: "simple" | "card";
  /** Additional class for the container */
  className?: string;
}

const typeConfigs: Record<string, EmptyStateConfig> = {
  all: {
    icon: <Download size={48} className="opacity-50" />,
    title: "No downloads yet",
    description: "Your download list is empty. Start a new download!",
  },
  active: {
    icon: <Download size={48} className="opacity-50" />,
    title: "No active downloads",
    description: "Start a new download from the home page",
  },
  completed: {
    icon: <CheckCircle2 size={48} className="opacity-50" />,
    title: "No completed downloads",
    description: "Completed downloads will appear here",
  },
  failed: {
    icon: <AlertCircle size={48} className="opacity-50" />,
    title: "No failed downloads",
    description: "Failed downloads will appear here for retry",
  },
  history: {
    icon: <CalendarDays size={40} className="text-default-300" />,
    title: "No History Yet",
    description:
      "Your download history will appear here once you start downloading files.",
  },
  playlist: {
    icon: <Inbox size={48} className="opacity-50" />,
    title: "No videos in playlist",
    description: "Enter a playlist URL above to fetch videos",
  },
  queue: {
    icon: <Download size={48} className="opacity-50" />,
    title: "Queue is empty",
    description: "Add links above to start downloading",
  },
};

/**
 * Unified Empty State Component
 * Used across Downloads, History, Playlists, and Queue pages
 */
export const EmptyState = ({
  type = "all",
  icon,
  title,
  description,
  variant = "simple",
  className = "",
}: EmptyStateProps) => {
  const config = typeConfigs[type] || typeConfigs.all;

  const displayIcon = icon ?? config.icon;
  const displayTitle = title ?? config.title;
  const displayDescription = description ?? config.description;

  if (variant === "card") {
    return (
      <Card
        className={`bg-default-50/50 border-2 border-dashed border-default-200 ${className}`}
      >
        <CardBody className="py-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-default-100 rounded-full flex items-center justify-center mb-4">
            {displayIcon}
          </div>
          <h3 className="text-xl font-bold text-default-700">{displayTitle}</h3>
          <p className="text-default-500 mt-2 max-w-xs">{displayDescription}</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center py-16 text-default-400 ${className}`}
    >
      {displayIcon}
      <p className="mt-4 font-medium">{displayTitle}</p>
      <p className="text-sm">{displayDescription}</p>
    </div>
  );
};

export default EmptyState;
