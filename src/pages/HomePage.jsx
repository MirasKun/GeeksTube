import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecomendedVideosTC } from "../store/thunks/fetchRecomended";
import VideoGrid from "../components/videos/VideoGrid";

const HomePage = () => {
  const dispatch = useDispatch();
  const loaderRef = useRef(null);

  const { videos, loading, error, nextPageToken } = useSelector(
    (state) => state.recomendedSlice,
  );

  useEffect(() => {
    if (videos.length === 0) {
      dispatch(fetchRecomendedVideosTC());
    }
  }, [dispatch, videos.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && nextPageToken && !loading) {
          dispatch(fetchRecomendedVideosTC(nextPageToken));
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      },
    );

    const loaderElement = loaderRef.current;

    if (loaderElement) {
      observer.observe(loaderElement);
    }

    return () => {
      if (loaderElement) {
        observer.unobserve(loaderElement);
      }
    };
  }, [dispatch, nextPageToken, loading]);

  return (
    <div>
      <VideoGrid />

      {loading && videos.length === 0 && <h1>Loading</h1>}

      {loading && videos.length > 0 && (
        <Flex justify="center" align="center">
          <Spin  indicator={<LoadingOutlined spin style={{color: "#ffffff"}}/>} />
        </Flex>
      )}

      {error && (
        <p className="text-center text-red-400 py-4">
          Ошибка загрузки видео
        </p>
      )}

      <div ref={loaderRef} className="h-10" />
    </div>
  );
};

export default HomePage;
