import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ChannelHeader from "../../components/channel/nav/ChannelHeader";
import ChannelTabs from "../../components/channel/nav/ChannelTabs";
import ChannelVideoRow from "../../components/channel/layout/ChannelVideoRow";
import ChannelVideoCard from "../../components/channel/layout/ChannelVideoCard";
import {
  hydrateSubscriptions,
  resetChannelState,
  setChannelTab,
  setVideosView,
} from "../../store/slices/channelSlice";
import {
  fetchChannelHomeTC,
  fetchChannelVideosTC,
  searchInChannelTC,
} from "../../store/thunks/spec/channel/channelThunks";

const ChannelPage = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const loaderRef = useRef(null);
  const onScrollEndRef = useRef(() => {});

  const {
    channel,
    activeTab,
    videosView,
    forYouVideos,
    popularVideos,
    allVideos,
    uploadsPlaylistId,
    searchResults,
    searchQuery,
    searchError,
    loading,
    nextPageToken,
    error,
    videosError,
  } = useSelector((state) => state.channelSlice);

  useEffect(() => {
    onScrollEndRef.current = () => {
      if (!channelId) return;

      const canLoadVideos =
        (activeTab === "home" ||
          (activeTab === "videos" && videosView === "latest")) &&
        allVideos.length > 0 &&
        nextPageToken.videos &&
        !loading.videos;

      if (canLoadVideos) {
        dispatch(
          fetchChannelVideosTC({
            pageToken: nextPageToken.videos,
            uploadsPlaylistId,
          }),
        );
        return;
      }

      if (
        activeTab === "search" &&
        searchResults.length > 0 &&
        nextPageToken.search &&
        !loading.search
      ) {
        dispatch(
          searchInChannelTC({
            channelId,
            query: searchQuery,
            pageToken: nextPageToken.search,
          }),
        );
      }
    };
  }, [
    activeTab,
    videosView,
    allVideos,
    nextPageToken,
    loading,
    searchResults,
    searchQuery,
    channelId,
    dispatch,
    uploadsPlaylistId,
  ]);
  useEffect(() => {
    dispatch(hydrateSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    if (!channelId) return;
    dispatch(resetChannelState());
    dispatch(fetchChannelHomeTC(channelId));
  }, [channelId, dispatch]);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onScrollEndRef.current();
      },
      { rootMargin: "200px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [channelId, activeTab, videosView]);

  const handleSearch = (query) => {
    if (!channelId || !query.trim()) return;
    dispatch(setChannelTab("search"));
    dispatch(searchInChannelTC({ channelId, query }));
  };

  const videosForGrid =
    videosView === "popular"
      ? [...allVideos].sort(
          (a, b) =>
            Number(b.statistics?.viewCount || 0) -
            Number(a.statistics?.viewCount || 0),
        )
      : allVideos;

  const showVideosLoader = loading.videos && videosForGrid.length === 0;

  if (loading.channel && !channel) {
    return (
      <Flex justify="center" align="center" className="min-h-[50vh]">
        <Spin
          indicator={<LoadingOutlined spin style={{ color: "#ffffff" }} />}
        />
      </Flex>
    );
  }

  if (error && !channel) {
    return (
      <p className="py-16 text-center text-red-400">
        {typeof error === "string" ? error : "Не удалось загрузить канал"}
      </p>
    );
  }

  return (
    <div className="-m-4 min-h-full bg-[#0f0f0f] text-white">
      <h1 className="sr-only">Канал {channel?.snippet?.title} - GeeksTube</h1>
      <ChannelHeader channel={channel} />
      <ChannelTabs onSearch={handleSearch} />

      <div className="px-4 py-6 md:px-8">
        {activeTab === "home" && (
          <>
            <ChannelVideoRow
              title="Для вас"
              videos={forYouVideos}
              loading={loading.videos && forYouVideos.length === 0}
              emptyText="Видео не найдены"
            />
            <ChannelVideoRow
              title="Популярные"
              videos={popularVideos}
              loading={loading.videos && popularVideos.length === 0}
              emptyText="Видео не найдены"
            />
            {!loading.videos && allVideos.length === 0 && (
              <p
                className={`py-6 text-center ${videosError ? "text-red-400" : "text-[#aaaaaa]"}`}
              >
                {videosError || "На этом канале пока нет доступных видео"}
              </p>
            )}
          </>
        )}

        {activeTab === "videos" && (
          <>
            <h2 className="mb-2 text-xl font-semibold">Видео</h2>
            <div className="mb-6 flex gap-2">
              <button
                type="button"
                onClick={() => dispatch(setVideosView("latest"))}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  videosView === "latest"
                    ? "bg-white text-black"
                    : "bg-[#272727] text-white hover:bg-[#3f3f3f]"
                }`}
              >
                Все
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatch(setVideosView("popular"));
                  dispatch(setChannelTab("videos"));
                }}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  videosView === "popular"
                    ? "bg-white text-black"
                    : "bg-[#272727] text-white hover:bg-[#3f3f3f]"
                }`}
              >
                Популярные
              </button>
            </div>

            {videosForGrid.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {videosForGrid.map((video) => (
                  <ChannelVideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              !showVideosLoader && (
                <p className="py-8 text-center text-[#aaaaaa]">
                  {videosError || "Видео не найдены"}
                </p>
              )
            )}

            {showVideosLoader && (
              <Flex justify="center" className="py-6">
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ color: "#ffffff" }} />
                  }
                />
              </Flex>
            )}
          </>
        )}

        {activeTab === "search" && (
          <>
            <h2 className="mb-6 text-xl font-semibold">
              {searchQuery ? `Результаты: «${searchQuery}»` : "Поиск по каналу"}
            </h2>
            {!searchQuery && <p className="mb-4 text-sm text-[#aaaaaa]"></p>}
            {searchResults.length > 0 && (
              <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {searchResults.map((video) => (
                  <ChannelVideoCard key={video.id} video={video} />
                ))}
              </div>
            )}
            {searchError && (
              <p className="py-4 text-center text-red-400">{searchError}</p>
            )}
            {searchQuery &&
              !loading.search &&
              !searchError &&
              searchResults.length === 0 && (
                <p className="py-8 text-center text-[#aaaaaa]">
                  Ничего не найдено
                </p>
              )}
            {loading.search && (
              <Flex justify="center" className="py-6">
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ color: "#ffffff" }} />
                  }
                />
              </Flex>
            )}
          </>
        )}

        {(activeTab === "videos" ||
          activeTab === "search" ||
          activeTab === "home") && <div ref={loaderRef} className="h-8" />}
      </div>
    </div>
  );
};

export default ChannelPage;
