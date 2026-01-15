import { Input, Button } from "@heroui/react";
import { Search, Trash2 } from "lucide-react";

interface HistoryHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearHistory: () => void;
  hasItems: boolean;
}

export const HistoryHeader = ({
  searchQuery,
  onSearchChange,
  onClearHistory,
  hasItems,
}: HistoryHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-4xl font-black bg-linear-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">
          History
        </h1>
        <p className="text-default-500 text-sm">Manage your past downloads</p>
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <Input
          placeholder="Search filenames..."
          startContent={<Search size={16} className="text-default-400" />}
          value={searchQuery}
          onValueChange={onSearchChange}
          className="w-full md:w-64"
          variant="faded"
          radius="lg"
        />
        {hasItems && (
          <Button
            color="danger"
            variant="flat"
            startContent={<Trash2 size={16} />}
            onPress={onClearHistory}
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};
