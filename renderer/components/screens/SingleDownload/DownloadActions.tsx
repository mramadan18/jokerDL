import { Button, Spacer } from "@heroui/react";
import { Download } from "lucide-react";

interface DownloadActionsProps {
  isDownloading: boolean;
  onClear: () => void;
  onDownload: () => void;
}

export const DownloadActions = ({
  isDownloading,
  onClear,
  onDownload,
}: DownloadActionsProps) => {
  return (
    <>
      <Spacer y={4} />
      <div className="flex justify-end gap-3">
        <Button variant="ghost" className="font-medium" onPress={onClear}>
          Clear
        </Button>
        <Button
          color="primary"
          isLoading={isDownloading}
          isDisabled={isDownloading}
          onPress={onDownload}
          className="font-bold bg-linear-to-r from-violet-600 to-fuchsia-600 text-white"
          startContent={!isDownloading && <Download size={18} />}
        >
          {isDownloading ? "Starting..." : "Download Now"}
        </Button>
      </div>
    </>
  );
};
