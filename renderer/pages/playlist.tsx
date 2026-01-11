import { useState, useMemo } from "react";
import {
  PlaylistHeader,
  UrlInputCard,
  PlaylistToolbar,
  PlaylistVideoList,
  PlaylistFooter,
} from "../components/screens/Playlists";
import { useVideoInfo } from "../hooks/useDownload";
import { detectPlatform } from "../utils/formatters";

const PlaylistPage = () => {
  const [url, setUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const { videoInfo, isLoading, error, extract } = useVideoInfo();

  const playlistItems = videoInfo?.playlist?.videos || [];
  const platform = useMemo(() => detectPlatform(url), [url]);

  const filteredItems = useMemo(() => {
    return playlistItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [playlistItems, searchQuery]);

  const handleFetch = async () => {
    if (!url) return;
    const result = await extract(url);
    if (result.success && result.data?.playlist) {
      // Select all by default
      setSelected(result.data.playlist.videos.map((i) => i.id));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFetch();
    }
  };

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const toggleSelectAll = () => {
    const filteredIds = filteredItems.map((i) => i.id);
    const areAllFilteredSelected = filteredIds.every((id) =>
      selected.includes(id)
    );

    if (areAllFilteredSelected) {
      setSelected(selected.filter((id) => !filteredIds.includes(id)));
    } else {
      const newSelected = [...new Set([...selected, ...filteredIds])];
      setSelected(newSelected);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-6 mb-6">
        <PlaylistHeader />
        <UrlInputCard
          url={url}
          onUrlChange={setUrl}
          onFetch={handleFetch}
          isLoading={isLoading}
          platform={platform}
          onKeyPress={handleKeyPress}
        />
      </div>

      {error && (
        <div className="p-4 mb-6 bg-danger-50 text-danger rounded-xl border border-danger-100">
          {error}
        </div>
      )}

      {videoInfo && videoInfo.playlist && (
        <div className="flex-1 min-h-0 flex flex-col gap-4 animate-appearance-in">
          <PlaylistToolbar
            selectedCount={
              selected.filter((id) => playlistItems.find((i) => i.id === id))
                .length
            }
            totalCount={playlistItems.length}
            onToggleSelectAll={toggleSelectAll}
            isAllSelected={
              filteredItems.length > 0 &&
              filteredItems.every((i) => selected.includes(i.id))
            }
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <PlaylistVideoList
            items={filteredItems}
            selectedItems={selected}
            onToggleItem={toggleSelect}
          />

          <PlaylistFooter selectedCount={selected.length} />
        </div>
      )}

      {videoInfo && !videoInfo.playlist && !isLoading && (
        <div className="text-center py-12 text-default-500">
          This URL doesn't seem to be a playlist or doesn't have any items.
        </div>
      )}
    </div>
  );
};

export default PlaylistPage;
