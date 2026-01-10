import { Input, Button, Card, CardBody, Chip } from "@heroui/react";
import { Link2, Download } from "lucide-react";
interface UrlInputCardProps {
  url: string;
  isLoading: boolean;
  platform: { name: string; icon: string } | null;
  onUrlChange: (value: string) => void;
  onFetch: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const UrlInputCard = ({
  url,
  isLoading,
  platform,
  onUrlChange,
  onFetch,
  onKeyPress,
}: UrlInputCardProps) => {
  return (
    <Card className="p-4 mb-8 shadow-xl border-none bg-background/50 backdrop-blur-md">
      <CardBody className="flex flex-row gap-4 items-start">
        <Input
          type="url"
          placeholder="Paste video URL here..."
          value={url}
          onValueChange={onUrlChange}
          onKeyDown={onKeyPress}
          startContent={<Link2 className="text-violet-500" />}
          endContent={
            platform && (
              <Chip size="sm" color="secondary" variant="flat">
                {platform.name}
              </Chip>
            )
          }
          size="lg"
          className="flex-1"
          classNames={{
            input: "text-lg",
            inputWrapper:
              "h-14 bg-default-100/50 hover:bg-default-200/50 transition-colors",
          }}
        />
        <Button
          size="lg"
          isLoading={isLoading}
          isDisabled={!url.trim() || !url.startsWith("http") || isLoading}
          onPress={onFetch}
          className="h-14 px-8 font-bold bg-linear-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          endContent={!isLoading && <Download size={20} />}
        >
          {isLoading ? "Fetching..." : "Fetch Info"}
        </Button>
      </CardBody>
    </Card>
  );
};
