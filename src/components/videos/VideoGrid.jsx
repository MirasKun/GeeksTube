import { useSelector } from "react-redux";
import VideoCard from "./cards/VideoCard";
import { useLocation } from "react-router-dom";

const VideoGrid = ({ videos: videoItems, loading: isLoading, error: gridError }) => {
  const location = useLocation();
  const { videos, loading, error } = useSelector(
    (state) => state.recomendedSlice,
  );
  const renderedVideos = videoItems ?? videos;
  const renderedLoading = isLoading ?? loading;
  const renderedError = gridError ?? error;

  if (renderedLoading && renderedVideos.length === 0) return <h1>Loading</h1>;
  if (renderedError && renderedVideos.length === 0) return <h1>Error</h1>;

  if (location.pathname === "/") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
        {renderedVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 gap-4">
        {renderedVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    );
  }
};

export default VideoGrid;
