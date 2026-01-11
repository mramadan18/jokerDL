import { Card, CardBody, Input, Button } from "@heroui/react";
import { ListVideo } from "lucide-react";

interface UrlInputCardProps {
  url: string;
  setUrl: (url: string) => void;
  onFetch: () => void;
}

export const UrlInputCard: React.FC<UrlInputCardProps> = ({
  url,
  setUrl,
  onFetch,
}) => {
  return (
    <Card className="p-2 shadow-sm">
      <CardBody className="flex flex-row gap-3">
        <Input
          placeholder="Paste playlist URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          startContent={<ListVideo className="text-default-400" />}
          size="lg"
          className="flex-1"
        />
        <Button
          color="primary"
          size="lg"
          className="font-semibold"
          onPress={onFetch}
        >
          Fetch List
        </Button>
      </CardBody>
    </Card>
  );
};
