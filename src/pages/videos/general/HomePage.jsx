import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecomendedVideosTC } from "../../../store/thunks/general/fetchRecomended";
import VideoGrid from "../../../components/videos/VideoGrid";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
      {/* Обманка для ботов */}
      <h1 className="sr-only">
        GeeksTube - платформа для просмотра и обмена видео
      </h1>

      <VideoGrid />
      {loading && videos.length === 0 && (
        <Flex justify="center" align="center" className="py-20">
          <Spin
            indicator={
              <LoadingOutlined
                spin
                style={{ color: "#ffffff", fontSize: 32 }}
              />
            }
          />
        </Flex>
      )}

      {loading && videos.length > 0 && (
        <Flex justify="center" align="center" className="py-4">
          <Spin
            indicator={<LoadingOutlined spin style={{ color: "#ffffff" }} />}
          />
        </Flex>
      )}

      {error && (
        <p className="text-center text-red-400 py-4">{error}</p>
      )}

      <div ref={loaderRef} className="h-10" />
    </div>
  );
};

export default HomePage;
