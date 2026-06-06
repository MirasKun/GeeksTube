import { Link } from "react-router-dom";

const SearchResultCard = ({ video }) => {
  const snippet = video?.snippet;
  const id = video?.id;
  const videoId = id?.videoId ?? id;

  if (!snippet || !videoId) return null;

  const channelId = snippet.channelId;
  const thumbnail =
    snippet.thumbnails?.medium?.url ||
    snippet.thumbnails?.default?.url;
  const title = snippet?.title;
  const channel = snippet?.channelTitle;
  const description = snippet?.description;

  return (
    <div className="flex gap-4 rounded-xl p-2 transition-colors hover:bg-[#1a1a1a]">
      <Link to={`/watch/${videoId}`} className="shrink-0">
        <img
          src={thumbnail}
          alt={title}
          className="h-36 w-64 rounded-xl object-cover"
        />
      </Link>
      <div className="flex flex-col gap-1 pt-1">
        <Link to={`/watch/${videoId}`}>
          <h3 className="line-clamp-2 text-base font-medium text-white hover:text-white/90">
            {title}
          </h3>
        </Link>
        <p className="text-xs text-gray-400">
          {channelId ? (
            <Link
              to={`/channel/${channelId}`}
              className="hover:text-white transition-colors"
            >
              {channel}
            </Link>
          ) : (
            channel
          )}
        </p>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default SearchResultCard;
