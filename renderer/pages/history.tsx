import { Spinner } from "@heroui/react";
import { useHistory } from "../hooks/useHistory";
import {
  HistoryHeader,
  HistoryEmptyState,
  HistoryList,
} from "../components/screens/History";

const HistoryPage = () => {
  const {
    history,
    isLoading,
    searchQuery,
    setSearchQuery,
    deleteRecord,
    clearHistory,
    openFile,
    openFolder,
  } = useHistory();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spinner size="lg" color="primary" label="Loading history..." />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      <HistoryHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearHistory={clearHistory}
        hasItems={history.length > 0}
      />

      {history.length === 0 ? (
        <HistoryEmptyState />
      ) : (
        <HistoryList
          history={history}
          onOpenFile={openFile}
          onOpenFolder={openFolder}
          onDelete={deleteRecord}
        />
      )}
    </div>
  );
};

export default HistoryPage;
