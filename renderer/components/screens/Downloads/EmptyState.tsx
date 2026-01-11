import { Download, CheckCircle2, AlertCircle } from "lucide-react";

interface EmptyStateProps {
  type: "active" | "completed" | "failed" | "all";
}

export const EmptyState = ({ type }: EmptyStateProps) => {
  const config = {
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
  };

  const { icon, title, description } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 text-default-400">
      {icon}
      <p className="mt-4 font-medium">{title}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
};
