import { Link } from "react-router-dom";

const SearchResultCard = ({ video }) => {
  const { snippet } = video;
  const id = video?.id;
  const videoId = id?.videoId ?? id;
  const thumbnail = snippet?.thumbnails?.medium?.url;
  const title = snippet?.title;
  const channel = snippet?.channelTitle;
  const description = snippet?.description;
  const publishedAt = new Date(snippet?.publishedAt).toLocaleDateString(
    "ru-RU",
  );

  return (
    <Link to={`/watch/${videoId}`} className="block">
      <div className="flex gap-4 cursor-pointer hover:bg-[#1a1a1a] rounded-xl p-2 transition-colors">
        <img
          src={thumbnail}
          alt={title}
          className="w-64 h-36 object-cover rounded-xl shrink-0"
        />
        <div className="flex flex-col gap-1 pt-1">
          <h3 className="text-white font-medium text-base line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-400 text-xs">
            <Link
            to={`/channel/${snippet.channelId}`}
            onClick={(e) => e.stopPropagation()}
            className="text-gray-400 text-sm mt-1 block hover:text-white transition-colors"
          >
            {channel}
          </Link> · {publishedAt}
          </p>
          <p className="text-gray-500 text-sm line-clamp-2 mt-1">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
