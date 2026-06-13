import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikedVideosTC } from "../../store/thunks/interactions/fetchLikedVideos";
import SearchResultCard from "../../components/videos/cards/SearchResultCard";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const isShortDuration = (durationStr) => {
  if (!durationStr) return false;
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return false;

  const hours = parseInt(match[1] || 0, 10);
  const minutes = parseInt(match[2] || 0, 10);
  const seconds = parseInt(match[3] || 0, 10);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return totalSeconds > 0 && totalSeconds <= 60;
};

const LikedVideos = () => {
  const dispatch = useDispatch();
  const loaderRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState("all");

  const { likedVideos, loading, errors, nextPageToken } = useSelector(
    (state) => state.interactionsSlice,
  );

  useEffect(() => {
    document.title = "Понравившиеся видео";
    if (likedVideos.length === 0) {
      dispatch(fetchLikedVideosTC());
    }
  }, [dispatch, likedVideos.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && nextPageToken && !loading.likedVideos) {
          dispatch(fetchLikedVideosTC(nextPageToken));
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
  }, [dispatch, nextPageToken, loading.likedVideos]);

  const filteredVideos = useMemo(() => {
    return likedVideos.filter((video) => {
      const duration = video?.contentDetails?.duration;
      const isShort = isShortDuration(duration);

      if (activeFilter === "shorts") return isShort;
      if (activeFilter === "videos") return !isShort;
      return true;
    });
  }, [likedVideos, activeFilter]);

  return (
    <div className="flex flex-col gap-4 w-full py-4 min-h-screen px-3 sm:px-6">
      {}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Понравившиеся видео{" "}
          <span className="text-zinc-400 text-base sm:text-lg font-normal">
            ({filteredVideos.length})
          </span>
        </h1>

        {}
        <div className="flex gap-2">
          {[
            { id: "all", label: "Все" },
            { id: "videos", label: "Видео" },
            { id: "shorts", label: "Shorts" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === tab.id
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {}
      {errors.likedVideos && !loading.likedVideos && (
        <p className="text-red-400 p-4 text-center">
          Ошибка загрузки: {errors.likedVideos}
        </p>
      )}

      {}
      {loading.likedVideos && likedVideos.length === 0 && (
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

      {}
      {!loading.likedVideos &&
        !errors.likedVideos &&
        filteredVideos.length === 0 && (
          <p className="text-gray-400 p-10 text-center text-sm bg-zinc-900 rounded-xl">
            В этой категории ничего не найдено.
          </p>
        )}

      {}
      <div className="flex flex-col gap-3">
        {filteredVideos.map((video) => (
          <SearchResultCard key={video.id} video={video} />
        ))}
      </div>

      {}
      {loading.likedVideos && likedVideos.length > 0 && (
        <Flex justify="center" align="center" className="py-4">
          <Spin
            indicator={
              <LoadingOutlined
                spin
                style={{ color: "#ffffff", fontSize: 24 }}
              />
            }
          />
        </Flex>
      )}

      {}
      {nextPageToken && !loading.likedVideos && (
        <div ref={loaderRef} className="h-10 w-full" />
      )}
    </div>
  );
};

export default LikedVideos;
