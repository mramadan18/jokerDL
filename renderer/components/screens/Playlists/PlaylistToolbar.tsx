import { Button, Input } from "@heroui/react";
import { CheckSquare, Square, Search } from "lucide-react";

interface PlaylistToolbarProps {
  selectedCount: number;
  totalCount: number;
  onToggleSelectAll: () => void;
  isAllSelected: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const PlaylistToolbar: React.FC<PlaylistToolbarProps> = ({
  selectedCount,
  totalCount,
  onToggleSelectAll,
  isAllSelected,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-4">
        <Button
          size="sm"
          variant="light"
          onPress={onToggleSelectAll}
          startContent={
            isAllSelected ? <CheckSquare size={18} /> : <Square size={18} />
          }
        >
          {isAllSelected ? "Deselect All" : "Select All"}
        </Button>
        <span className="text-small text-default-500">
          {selectedCount} / {totalCount} items selected
        </span>
      </div>
      <div>
        <Input
          size="sm"
          placeholder="Filter items..."
          value={searchQuery}
          onValueChange={onSearchChange}
          startContent={<Search size={14} />}
          className="w-64"
          isClearable
        />
      </div>
    </div>
  );
};
