import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { formatViews } from "../../../lib/formatYouTube";

const ChannelVideoCard = memo(({ video, compact = false }) => {
  const snippet = video?.snippet;
  const viewCount = video?.statistics?.viewCount;
  const videoId = video?.id?.videoId ?? video?.id;

  const saveToHistory = useCallback(() => {
    if (!videoId) return;
    const currentHistory = localStorage.getItem("watch_history");
    const history = currentHistory ? JSON.parse(currentHistory) : [];
    const updated = [
      { ...video, watchedAt: new Date().toISOString() },
      ...history.filter((item) => (item.id?.videoId ?? item.id) !== videoId),
    ];
    localStorage.setItem("watch_history", JSON.stringify(updated));
  }, [video, videoId]);

  if (!snippet || !videoId) return null;

  const thumbnail =
    snippet.thumbnails?.medium?.url ||
    snippet.thumbnails?.high?.url ||
    snippet.thumbnails?.default?.url;

  return (
    <Link
      to={`/watch/${videoId}`}
      onClick={saveToHistory}
      className={`group block shrink-0 ${compact ? "w-56 sm:w-72" : "w-full"}`}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={snippet.title}
            className="aspect-video w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="aspect-video w-full bg-zinc-700" />
        )}
      </div>

      <div className="mt-2 min-w-0">
        <h3 className="line-clamp-2 text-sm font-medium text-white group-hover:text-white/90">
          {snippet.title}
        </h3>
        <p className="mt-1 text-xs text-[#aaaaaa]">{formatViews(viewCount)}</p>
      </div>
    </Link>
  );
});

ChannelVideoCard.displayName = "ChannelVideoCard";

export default ChannelVideoCard;
