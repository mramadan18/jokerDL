import { Button } from "@heroui/react";
import { Pause, Play, Trash2 } from "lucide-react";
import { APP_CONFIG } from "../../../config/app-config";

interface DownloadsHeaderProps {
  total: number;
  active: number;
  completed: number;
  onPauseAll: () => void;
  onResumeAll: () => void;
  onClearCompleted: () => void;
  isPauseDisabled: boolean;
  isResumeDisabled: boolean;
  isClearDisabled: boolean;
}

export const DownloadsHeader = ({
  total,
  active,
  completed,
  onPauseAll,
  onResumeAll,
  onClearCompleted,
  isPauseDisabled,
  isResumeDisabled,
  isClearDisabled,
}: DownloadsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-black bg-linear-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">
          {APP_CONFIG.name} Downloads
        </h1>
        <p className="text-default-500 text-sm mt-1">
          {total} total • {active} active • {completed} completed
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          color="warning"
          variant="flat"
          size="sm"
          startContent={<Pause size={14} />}
          isDisabled={isPauseDisabled}
          onPress={onPauseAll}
        >
          Pause All
        </Button>
        <Button
          color="success"
          variant="flat"
          size="sm"
          startContent={<Play size={14} />}
          isDisabled={isResumeDisabled}
          onPress={onResumeAll}
        >
          Resume All
        </Button>
        <Button
          color="default"
          variant="flat"
          size="sm"
          startContent={<Trash2 size={14} />}
          isDisabled={isClearDisabled}
          onPress={onClearCompleted}
        >
          Clear Done
        </Button>
      </div>
    </div>
  );
};
