import React from "react";
import { Card, ScrollShadow } from "@heroui/react";
import { PlaylistItem } from "./PlaylistItem";

interface PlaylistVideoListProps {
  items: any[];
  selectedItems: string[];
  onToggleItem: (id: string) => void;
}

export const PlaylistVideoList: React.FC<PlaylistVideoListProps> = ({
  items,
  selectedItems,
  onToggleItem,
}) => {
  return (
    <Card className="flex-1 border-none shadow-sm bg-default-50/50">
      <ScrollShadow className="h-full p-2">
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
      </ScrollShadow>
    </Card>
  );
};
