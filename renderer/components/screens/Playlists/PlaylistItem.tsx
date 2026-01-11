import { Checkbox, Image, Button, Tooltip } from "@heroui/react";
import { formatDuration } from "../../../utils/formatters";
import { ExternalLink } from "lucide-react";

interface PlaylistItemProps {
  item: {
    id: string;
    title: string;
    duration: number | null;
    thumbnail: string | null;
    url: string;
  };
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const PlaylistItem: React.FC<PlaylistItemProps> = ({
  item,
  isSelected,
  onToggle,
}) => {
  const handleOpenBrowser = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent toggling the checkbox
    window.ipc.invoke("shell:open-external", item.url);
  };

  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer group ${
        isSelected ? "bg-primary/10" : "hover:bg-default-200/50"
      }`}
      onClick={() => onToggle(item.id)}
    >
      <Checkbox
        isSelected={isSelected}
        onValueChange={() => onToggle(item.id)}
      />
      <div className="w-24 h-14 bg-black/20 rounded-lg overflow-hidden relative flex-none">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            className="object-cover w-full h-full"
            alt="thumb"
          />
        ) : (
          <div className="w-full h-full bg-default-200 flex items-center justify-center">
            <span className="text-tiny text-default-400">No Thumb</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{item.title}</h4>
        <span className="text-xs text-default-400">
          {formatDuration(item.duration)}
        </span>
      </div>
      <div className="w-px h-8 bg-divider mx-2" />
      <Tooltip content="Open in Browser" delay={1000}>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          className="text-default-400 hover:text-primary transition-colors"
          onClick={handleOpenBrowser}
        >
          <ExternalLink size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};
