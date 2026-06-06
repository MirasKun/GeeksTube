import { useSelector } from "react-redux";
import VideoCard from "./cards/VideoCard";
import { useLocation } from "react-router-dom";

const VideoGrid = () => {
  const location = useLocation();
  const { videos, loading, error } = useSelector(
    (state) => state.recomendedSlice,
  );

  if (loading && videos.length === 0) return <h1>Loading</h1>;
  if (error && videos.length === 0) return <h1>Error</h1>;

  if (location.pathname === "/") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 gap-4 p-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    );
  }
};

export default VideoGrid;
