import { Button } from "@heroui/react";
import { Download } from "lucide-react";

interface PlaylistFooterProps {
  selectedCount: number;
}

export const PlaylistFooter: React.FC<PlaylistFooterProps> = ({
  selectedCount,
}) => {
  return (
    <div className="py-2 flex justify-end">
      <Button
        size="lg"
        color="primary"
        className="font-bold shadow-lg"
        startContent={<Download />}
        isDisabled={selectedCount === 0}
      >
        Download Selected ({selectedCount})
      </Button>
    </div>
  );
};
