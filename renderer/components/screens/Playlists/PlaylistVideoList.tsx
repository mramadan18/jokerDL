import { Card, ScrollShadow } from "@heroui/react";
import { PlaylistItem } from "./PlaylistItem";
import { PlaylistVideoEntry } from "../../../types/download";
import { SearchX } from "lucide-react";

interface PlaylistVideoListProps {
  items: PlaylistVideoEntry[];
  selectedItems: string[];
  onToggleItem: (id: string) => void;
}

export const PlaylistVideoList: React.FC<PlaylistVideoListProps> = ({
  items,
  selectedItems,
  onToggleItem,
}) => {
  return (
    <Card className="flex-1 border-none shadow-sm bg-default-50/50 max-h-96 overflow-hidden">
      <ScrollShadow className="h-full p-2">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-1">
            {items.map((item) => (
              <PlaylistItem
                key={item.id}
                item={item}
                isSelected={selectedItems.includes(item.id)}
                onToggle={onToggleItem}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-3 bg-default-100 rounded-full mb-3">
              <SearchX size={24} className="text-default-400" />
            </div>
            <p className="text-default-500 font-medium">No results found</p>
            <p className="text-tiny text-default-400">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </ScrollShadow>
    </Card>
  );
};
