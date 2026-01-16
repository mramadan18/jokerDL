import { Card, CardBody, Button } from "@heroui/react";
import { Download, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { APP_CONFIG } from "../../../config/app-config";
import { useUpdate } from "../../../hooks/useUpdate";

export const AboutSettings = () => {
  const { status, progress, checkForUpdate, installUpdate } = useUpdate();

  const getStatusIcon = () => {
    switch (status.status) {
      case "checking":
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case "available":
        return <Download className="w-4 h-4" />;
      case "up-to-date":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "downloaded":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-danger" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status.status) {
      case "available":
        return "primary";
      case "downloaded":
        return "success";
      case "error":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="shadow-xl bg-linear-to-br from-brand-cyan/10 to-brand-purple/10 border-brand-cyan/20">
      <CardBody className="p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-linear-to-br from-brand-cyan to-brand-purple rounded-2xl flex items-center justify-center shadow-lg shadow-brand-cyan/20 mb-4">
          <Download className="text-white w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black bg-linear-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">
          {APP_CONFIG.name}
        </h2>
        <p className="text-xs font-bold text-primary/60 tracking-widest uppercase mb-4">
          Version {APP_CONFIG.version} (Stable)
        </p>
        <p className="text-default-500 max-w-sm mb-6">
          {APP_CONFIG.description}
        </p>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4">
            <Button
              size="sm"
              variant="flat"
              color="secondary"
              onPress={() => window.open(APP_CONFIG.links.website, "_blank")}
            >
              Website
            </Button>

            {status.status === "downloaded" ? (
              <Button
                size="sm"
                variant="shadow"
                color="success"
                onPress={installUpdate}
                startContent={<RefreshCw className="w-4 h-4" />}
              >
                Restart to Update
              </Button>
            ) : (
              <Button
                size="sm"
                variant="flat"
                color={getStatusColor()}
                onPress={checkForUpdate}
                isLoading={status.status === "checking"}
                startContent={
                  !status.status.includes("checking") && getStatusIcon()
                }
              >
                {status.status === "available"
                  ? "Download Update"
                  : status.status === "checking"
                  ? "Checking..."
                  : status.status === "error"
                  ? "Retry Check"
                  : "Check Updates"}
              </Button>
            )}
          </div>

          {status.message && (
            <p
              className={`text-sm ${
                status.status === "error" ? "text-danger" : "text-default-500"
              }`}
            >
              {status.message}
            </p>
          )}

          {progress && status.status === "available" && (
            <div className="w-full max-w-xs mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Downloading...</span>
                <span>{Math.round(progress.percent)}%</span>
              </div>
              <div className="w-full bg-default-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-brand-cyan h-full transition-all duration-300"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
