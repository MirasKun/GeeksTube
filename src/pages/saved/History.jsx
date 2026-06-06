import { useState, useMemo, useEffect } from "react";
import VideoCard from "../../components/videos/cards/VideoCard";

const History = () => {
  useEffect(() => {
    document.title = "История просмотров";
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [historyItems, setHistoryItems] = useState(() => {
    const data = localStorage.getItem("watch_history");
    return data ? JSON.parse(data) : [];
  });

  const [activeTab, setActiveTab] = useState("Videos");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");

  const formatDateGroup = (isoString) => {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const options = { day: "numeric", month: "short", year: "numeric" };

    if (date.toDateString() === today.toDateString()) {
      return `Today - ${date.toLocaleDateString("en-GB", options)}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday - ${date.toLocaleDateString("en-GB", options)}`;
    } else {
      return date.toLocaleDateString("en-GB", options);
    }
  };

  const groupedVideos = useMemo(() => {
    let filtered = historyItems.filter(
      (video) =>
        video.snippet?.title
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        video.snippet?.channelTitle
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );

    if (sortOrder === "Oldest") {
      filtered = [...filtered].sort(
        (a, b) => new Date(a.watchedAt) - new Date(b.watchedAt),
      );
    } else {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.watchedAt) - new Date(a.watchedAt),
      );
    }

    const sections = {};
    filtered.forEach((video) => {
      const label = formatDateGroup(video.watchedAt);
      if (!sections[label]) sections[label] = [];
      sections[label].push(video);
    });

    return Object.entries(sections);
  }, [historyItems, sortOrder, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen text-white bg-[#0F0F0F]">
      <h1 className="text-2xl font-bold mb-6">History</h1>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {["Видео", "Посты", "Прямой эфир", "Shorts", "Комментарии"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-white text-black"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setSortOrder("Newest")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                sortOrder === "Newest"
                  ? "bg-zinc-700 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Новейшие
            </button>
            <button
              onClick={() => setSortOrder("Oldest")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                sortOrder === "Oldest"
                  ? "bg-zinc-700 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Старые
            </button>
          </div>

          <button className="px-3 py-1.5 bg-zinc-800 text-xs rounded-lg text-gray-300 hover:bg-zinc-700">
            Диапозон дат: все даты
          </button>

          <div className="flex items-center bg-zinc-800 rounded-lg p-1 gap-1">
            <div className="p-1 bg-zinc-700 rounded cursor-pointer">
              <svg
                className="w-4 h-4 fill-current text-white"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
              </svg>
            </div>
            <div className="p-1 cursor-pointer hover:bg-zinc-700 rounded">
              <svg
                className="w-4 h-4 fill-current text-gray-400"
                viewBox="0 0 24 24"
              >
                <path d="M4 5h16v2H4zm0 6h16v2H4zm0 6h16v2H4z" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Поиск в истории"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border border-zinc-700 rounded-full text-sm pl-4 pr-8 py-1.5 w-56 focus:outline-none focus:border-zinc-500 text-zinc-200"
            />
          </div>
        </div>
      </div>

      {groupedVideos.length === 0 ? (
        <div className="text-zinc-500 text-center py-20 text-sm">
          История просмотров пуста или совпадений не найдено
        </div>
      ) : (
        <div className="relative pl-8 border-l border-zinc-800 ml-4 flex flex-col gap-8">
          {groupedVideos.map(([dateLabel, videos]) => (
            <div key={dateLabel} className="relative">
              <div className="absolute -left-[38px] top-1.5 w-4 h-4 rounded-full bg-[#0F0F0F] border-2 border-red-600" />
              <h2 className="text-sm font-semibold text-zinc-400 mb-4">
                {dateLabel}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map((video) => (
                  <VideoCard
                    key={`${video.id}-${video.watchedAt}`}
                    video={video}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
