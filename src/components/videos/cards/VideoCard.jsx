import { useCallback, memo } from "react";
import { Link } from "react-router-dom";

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
    <div className="cursor-pointer transition-colors duration-300 sm:p-2 sm:hover:bg-zinc-700 rounded-xl flex flex-col justify-between scale-90">
      {}
      <Link
        to={`/watch/${video.id}`}
        onClick={saveToHistory}
        className="block group"
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full rounded-lg object-cover aspect-video"
          loading="lazy"
        />
        <h3 className="mt-2 text-white font-medium text-sm line-clamp-2 group-hover:text-white transition-colors">
          {title}
        </h3>
      </Link>
      <div className="mt-1">
        <Link
          to={`/channel/${snippet.channelId}`}
          className="text-gray-400 text-sm hover:text-white transition-colors block w-fit"
        >
          {channelName}
        </Link>
        <p className="text-gray-400 text-sm mt-0.5">{views} просмотров</p>
      </div>
    </div>
  );
});

VideoCard.displayName = "VideoCard";
export default VideoCard;
