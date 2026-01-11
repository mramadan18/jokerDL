import { Checkbox, Image } from "@heroui/react";

interface PlaylistItemProps {
  item: {
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
  };
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const PlaylistItem: React.FC<PlaylistItemProps> = ({
  item,
  isSelected,
  onToggle,
}) => {
  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer ${
        isSelected ? "bg-primary/10" : "hover:bg-default-200/50"
      }`}
      onClick={() => onToggle(item.id)}
    >
      <Checkbox
        isSelected={isSelected}
        onValueChange={() => onToggle(item.id)}
      />
      <div className="w-24 h-14 bg-black/20 rounded-lg overflow-hidden relative flex-none">
        <Image
          src={item.thumbnail}
          className="object-cover w-full h-full"
          alt="thumb"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{item.title}</h4>
        <span className="text-xs text-default-400">{item.duration}</span>
      </div>
      <div className="w-px h-8 bg-divider mx-2" />
      <div className="text-xs font-semibold text-default-500 uppercase">
        Media
      </div>
    </div>
  );
};
