import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  const { snippet, statistics } = video;
  const thumbnail = snippet.thumbnails.medium.url;
  const title = snippet.title;
  const channelName = snippet.channelTitle;
  const views = Number(statistics.viewCount).toLocaleString();

  return (
    <Link to={`/watch/${video.id}`} className="block">
      <div className="cursor-pointer transition-colors duration-600 sm:p-2 sm:hover:bg-zinc-600 rounded-xl">
        <img src={thumbnail} alt={title} className="w-full rounded-lg" />
        <div className="mt-2">
          <h3 className="text-white font-medium text-sm line-clamp-2">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{channelName}</p>
          <p className="text-gray-400 text-sm">{views} просмотров</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
