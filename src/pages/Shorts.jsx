import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchShortsTC } from "../store/thunks/fetchShorts";
import { resetShorts } from "../store/slices/shortsSlice";
import ShortsPlayer from "./ShortsPlayer";

const Shorts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const activeQuery = searchParams.get("search_query")?.trim() || "shorts";
  
  const { shorts, loading, error, nextPageToken } = useSelector(
    (state) => state.shortsSlice,
  );

  const video = shorts[currentIndex];
  const videoId = video?.id?.videoId ?? video?.id;
  
  useEffect(() => {
    dispatch(resetShorts());
    dispatch(fetchShortsTC({ query: activeQuery }));
  }, [activeQuery, dispatch]);

  useEffect(() => {
    if (currentIndex >= shorts.length - 3 && nextPageToken && !loading) {
      dispatch(fetchShortsTC({ pageToken: nextPageToken, query: activeQuery }));
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < shorts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <ShortsPlayer
        video={video}
        videoId={videoId}
        currentIndex={currentIndex}
        total={shorts.length}
        onNext={handleNext}
        onPrev={handlePrev}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Shorts;
