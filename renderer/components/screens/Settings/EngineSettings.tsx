import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Chip,
  Button,
} from "@heroui/react";
import { Check, AlertCircle, RefreshCw } from "lucide-react";

interface EngineSettingsProps {
  binaryInfo: { path: string; version: string | null } | null;
  isUpdating: boolean;
  updateStatus: "idle" | "success" | "error";
  updateError: string | null;
  onUpdate: () => void;
}

export const EngineSettings = ({
  binaryInfo,
  isUpdating,
  updateStatus,
  updateError,
  onUpdate,
}: EngineSettingsProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="font-bold text-lg px-6 pt-6">
        yt-dlp Engine
      </CardHeader>
      <CardBody className="px-6 pb-6 pt-2 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm">yt-dlp Version</span>
            <span className="text-xs text-default-400">
              The core engine that powers video downloads
            </span>
          </div>
          <div className="flex items-center gap-3">
            {binaryInfo?.version ? (
              <Chip size="sm" variant="flat" color="success">
                v{binaryInfo.version}
              </Chip>
            ) : (
              <Chip size="sm" variant="flat" color="warning">
                Not installed
              </Chip>
            )}
          </div>
        </div>

        <Divider />

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm">Update yt-dlp</span>
            <span className="text-xs text-default-400">
              Download the latest version to fix parsing issues
            </span>
          </div>
          <div className="flex items-center gap-2">
            {updateStatus === "success" && (
              <Chip
                size="sm"
                color="success"
                variant="flat"
                startContent={<Check size={14} />}
              >
                Updated!
              </Chip>
            )}
            {updateStatus === "error" && (
              <Chip
                size="sm"
                color="danger"
                variant="flat"
                startContent={<AlertCircle size={14} />}
              >
                {updateError || "Failed"}
              </Chip>
            )}
            <Button
              size="sm"
              color="primary"
              variant="flat"
              onPress={onUpdate}
              isLoading={isUpdating}
              startContent={!isUpdating && <RefreshCw size={16} />}
            >
              {isUpdating ? "Updating..." : "Update Now"}
            </Button>
          </div>
        </div>

        {binaryInfo?.path && (
          <>
            <Divider />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-default-400">Binary location:</span>
              <code className="text-xs text-default-500 bg-default-100 px-2 py-1 rounded break-all">
                {binaryInfo.path}
              </code>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};
