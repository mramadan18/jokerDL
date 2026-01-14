import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { FolderOpen } from "lucide-react";

export const GeneralSettings = () => {
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
              defaultValue="C:\Users\Admin\Downloads\VideoDownloader"
              className="flex-1"
            />
            <Button isIconOnly variant="flat">
              <FolderOpen size={20} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="flex items-center justify-between">
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
            defaultValue="3"
            className="w-24"
            min={1}
            max={10}
          />
        </div>
      </CardBody>
    </Card>
  );
};
