import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchShortsTC } from "../../../store/thunks/general/fetchShorts";
import { resetShorts } from "../../../store/slices/general/shortsSlice";
import ShortsPlayer from "../../../components/players/ShortsPlayer";

const Shorts = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const activeQuery = searchParams.get("search_query")?.trim() || "shorts";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevQuery, setPrevQuery] = useState(activeQuery);

  const { shorts, loading, error, nextPageToken } = useSelector(
    (state) => state.shortsSlice,
  );
  if (activeQuery !== prevQuery) {
    setCurrentIndex(0);
    setPrevQuery(activeQuery);
  }

  useEffect(() => {
    dispatch(resetShorts());
    dispatch(fetchShortsTC({ query: activeQuery }));
  }, [activeQuery, dispatch]);

  useEffect(() => {
    if (
      shorts.length > 0 &&
      currentIndex >= shorts.length - 3 &&
      nextPageToken &&
      !loading
    ) {
      dispatch(fetchShortsTC({ pageToken: nextPageToken, query: activeQuery }));
    }
  }, [
    currentIndex,
    shorts.length,
    nextPageToken,
    loading,
    activeQuery,
    dispatch,
  ]);

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

  const video = shorts[currentIndex];
  const videoId = video?.id?.videoId ?? video?.id;

  return (
    <div>
      <h1 className="sr-only">
        GeeksTube Shorts — Короткие вертикальные видеоролики
      </h1>

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
