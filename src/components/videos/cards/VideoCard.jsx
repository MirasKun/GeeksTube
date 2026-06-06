import { useCallback } from "react";
import { Link } from "react-router-dom";
import { memo } from "react";

const VideoCard = memo(({ video }) => {
  const { snippet, statistics } = video;
  const thumbnail =
    snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url;
  const title = snippet.title;
  const channelName = snippet.channelTitle;
  const views = statistics?.viewCount
    ? Number(statistics.viewCount).toLocaleString()
    : "0";

  const saveToHistory = useCallback(() => {
    const currentHistory = localStorage.getItem("watch_history");
    const history = currentHistory ? JSON.parse(currentHistory) : [];
    const updated = [
      { ...video, watchedAt: new Date().toISOString() },
      ...history.filter((item) => item.id !== video.id),
    ];
    localStorage.setItem("watch_history", JSON.stringify(updated));
  }, [video]);
  if (!video) return null;

  return (
    <Link to={`/watch/${video.id}`} className="block" onClick={saveToHistory}>
      <div className="cursor-pointer transition-colors duration-300 sm:p-2 sm:hover:bg-zinc-800 rounded-xl">
        <img
          src={thumbnail}
          alt={title}
          className="w-full rounded-lg object-cover aspect-video"
          loading="lazy"
        />
        <div className="mt-2">
          <h3 className="text-white font-medium text-sm line-clamp-2">
            {title}
          </h3>
          <Link
            to={`/channel/${snippet.channelId}`}
            onClick={(e) => e.stopPropagation()}
            className="text-gray-400 text-sm mt-1 block hover:text-white transition-colors"
          >
            {channelName}
          </Link>
          <p className="text-gray-400 text-sm">{views} просмотров</p>
        </div>
      </div>
    </Link>
  );
});

VideoCard.displayName = "VideoCard";

export default VideoCard;
