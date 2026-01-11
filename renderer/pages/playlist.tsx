import { useState } from "react";
import {
  PlaylistHeader,
  UrlInputCard,
  PlaylistToolbar,
  PlaylistVideoList,
  PlaylistFooter,
} from "../components/screens/Playlists";

const PlaylistPage = () => {
  const [url, setUrl] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  // Mock Data
  const playlistItems = Array.from({ length: 15 }).map((_, i) => ({
    id: `vid-${i}`,
    title: `Playlist Video Tutorial #${i + 1} - Advanced Course`,
    duration: "10:24",
    thumbnail: "https://nextui.org/images/hero-card.jpeg",
  }));

  const handleFetch = () => {
    if (!url) return;
    setIsFetched(true);
    // Select all by default
    setSelected(playlistItems.map((i) => i.id));
  };

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selected.length === playlistItems.length) {
      setSelected([]);
    } else {
      setSelected(playlistItems.map((i) => i.id));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-6 mb-6">
        <PlaylistHeader />
        <UrlInputCard url={url} setUrl={setUrl} onFetch={handleFetch} />
      </div>

      {isFetched && (
        <div className="flex-1 min-h-0 flex flex-col gap-4 animate-appearance-in">
          <PlaylistToolbar
            selectedCount={selected.length}
            totalCount={playlistItems.length}
            onToggleSelectAll={toggleSelectAll}
            isAllSelected={selected.length === playlistItems.length}
          />

          <PlaylistVideoList
            items={playlistItems}
            selectedItems={selected}
            onToggleItem={toggleSelect}
          />

          <PlaylistFooter selectedCount={selected.length} />
        </div>
      )}
    </div>
  );
};

export default PlaylistPage;
