import { ListVideo } from "lucide-react";
import {
  UrlInputCard as SharedUrlInputCard,
  UrlInputCardProps,
} from "../../shared/UrlInputCard";

// Re-export with playlist-specific defaults
export const UrlInputCard: React.FC<
  Omit<
    UrlInputCardProps,
    "placeholder" | "startIcon" | "buttonText" | "loadingText"
  >
> = (props) => (
  <SharedUrlInputCard
    {...props}
    placeholder="Paste playlist URL..."
    startIcon={<ListVideo className="text-primary" />}
    buttonText="Fetch List"
    loadingText="Fetching..."
  />
);
