import { Select, SelectItem } from "@heroui/react";

interface QualityFormatSelectorsProps {
  selectedQuality: string;
  selectedFormat: string;
  currentFormats: Array<{ key: string; label: string }>;
  availableQualities: Array<{ key: string; label: string }>;
  onQualityChange: (quality: any) => void;
  onFormatChange: (format: string) => void;
}

export const QualityFormatSelectors = ({
  selectedQuality,
  selectedFormat,
  currentFormats,
  availableQualities,
  onQualityChange,
  onFormatChange,
}: QualityFormatSelectorsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Select
        label="Quality"
        selectedKeys={[selectedQuality]}
        disallowEmptySelection
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0];
          onQualityChange(value);
        }}
        size="sm"
        variant="bordered"
      >
        {availableQualities.map((q) => (
          <SelectItem key={q.key} className="text-foreground">
            {q.label}
          </SelectItem>
        ))}
      </Select>

      <Select
        label="Format"
        selectedKeys={[selectedFormat]}
        disallowEmptySelection
        onSelectionChange={(keys) =>
          onFormatChange(Array.from(keys)[0] as string)
        }
        size="sm"
        variant="bordered"
      >
        {currentFormats.map((f) => (
          <SelectItem key={f.key} className="text-foreground">
            {f.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
