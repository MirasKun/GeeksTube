import { useSelector } from "react-redux";
import WatchVideoCard from "./WatchVideoCard";

const WatchVideoGrid = () => {
  const { videos, loading, error } = useSelector(
    (state) => state.recomendedSlice,
  );

  if (loading && videos.length === 0) return <h1>Loading</h1>;
  if (error && videos.length === 0) return <h1>Error</h1>;

  return (
    <div className="grid grid-cols-1 gap-1 p-4">
      {videos.map((video) => (
        <WatchVideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default WatchVideoGrid;
