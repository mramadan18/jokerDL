import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import { FolderOpen, RotateCcw } from "lucide-react";
import { useSettings } from "../../../hooks/useSettings";
import { useEffect, useState } from "react";

export const GeneralSettings = () => {
  const { settings, loading, updateSettings, getDefaults, selectDirectory } =
    useSettings();
  const [localPath, setLocalPath] = useState("");
  const [localMaxConcurrent, setLocalMaxConcurrent] = useState("3");

  useEffect(() => {
    if (settings) {
      setLocalPath(settings.downloadPath);
      setLocalMaxConcurrent(settings.maxConcurrentDownloads.toString());
    }
  }, [settings]);

  const handleResetPath = async () => {
    const defaults = await getDefaults();
    if (defaults) {
      setLocalPath(defaults.downloadPath);
      await updateSettings({ downloadPath: defaults.downloadPath });
    }
  };

  const handlePathSelect = async () => {
    const path = await selectDirectory();
    if (path) {
      setLocalPath(path);
      await updateSettings({ downloadPath: path });
    }
  };

  const handleMaxConcurrentChange = async (val: string) => {
    setLocalMaxConcurrent(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 1 && num <= 5) {
      await updateSettings({ maxConcurrentDownloads: num });
    }
  };

  const handleOnExistsChange = async (keys: any) => {
    const val = Array.from(keys)[0] as any;
    await updateSettings({ onFileExists: val });
  };

  if (loading || !settings) {
    return (
      <Card className="shadow-sm">
        <CardBody className="gap-4">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="font-bold text-lg px-6 pt-6">General</CardHeader>
      <CardBody className="px-6 pb-6 pt-2 flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-default-600">
            Download Path
          </label>
          <div className="flex gap-2">
            <Input
              readOnly
              value={localPath}
              onChange={(e) => setLocalPath(e.target.value)}
              onBlur={() => updateSettings({ downloadPath: localPath })}
              className="flex-1"
              placeholder="Select download folder..."
            />
            <Button isIconOnly variant="flat" onPress={handlePathSelect}>
              <FolderOpen size={20} />
            </Button>
            <Button
              isIconOnly
              variant="flat"
              color="danger"
              onPress={handleResetPath}
              title="Reset to default"
            >
              <RotateCcw size={18} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="font-medium text-sm">
                Max Concurrent Downloads
              </span>
              <span className="text-xs text-default-400">
                Limit simultaneous downloads
              </span>
            </div>
            <Input
              type="number"
              value={localMaxConcurrent}
              onValueChange={handleMaxConcurrentChange}
              className="w-full"
              min={1}
              max={5}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="font-medium text-sm">When File Exists</span>
              <span className="text-xs text-default-400">
                Action to take if file already exists
              </span>
            </div>
            <Select
              selectedKeys={[settings.onFileExists]}
              disallowEmptySelection
              onSelectionChange={handleOnExistsChange}
              aria-label="When file exists"
            >
              <SelectItem key="rename" textValue="Rename">
                Rename (Add index)
              </SelectItem>
              <SelectItem key="overwrite" textValue="Overwrite">
                Overwrite
              </SelectItem>
              <SelectItem key="skip" textValue="Skip">
                Skip
              </SelectItem>
            </Select>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 gap-4">
          <Select label="Default Quality" defaultSelectedKeys={["1080p"]}>
            <SelectItem key="4k">4K (Ultra HD)</SelectItem>
            <SelectItem key="1080p">1080p (Full HD)</SelectItem>
            <SelectItem key="720p">720p (HD)</SelectItem>
          </Select>
          <Select label="Default Format" defaultSelectedKeys={["mp4"]}>
            <SelectItem key="mp4">MP4</SelectItem>
            <SelectItem key="mkv">MKV</SelectItem>
            <SelectItem key="mp3">MP3</SelectItem>
          </Select>
        </div> */}
      </CardBody>
    </Card>
  );
};
