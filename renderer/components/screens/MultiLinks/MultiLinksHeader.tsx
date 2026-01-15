import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { APP_CONFIG } from "../../../config/app-config";

interface MultiLinksHeaderProps {
  onClear: () => void;
}

export const MultiLinksHeader = ({ onClear }: MultiLinksHeaderProps) => {
  return (
    <div className="flex justify-between items-end mb-6">
      <div>
        <h1 className="text-4xl font-black pb-1 bg-clip-text text-transparent bg-linear-to-r from-brand-cyan to-brand-purple">
          Multiple Links Download
        </h1>
        <p className="text-default-500 mt-1">
          Download multiple files at once with {APP_CONFIG.name} Smart Queue.
        </p>
      </div>
      <Button
        color="danger"
        variant="light"
        startContent={<Trash2 size={18} />}
        onPress={onClear}
      >
        Clear All
      </Button>
    </div>
  );
};
