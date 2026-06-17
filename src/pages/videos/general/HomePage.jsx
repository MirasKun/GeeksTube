import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecomendedVideosTC } from "../../../store/thunks/general/fetchRecomended";
import { fetchCategoryVideosTC } from "../../../store/thunks/general/fetchCategoryVideos";
import VideoGrid from "../../../components/videos/VideoGrid";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { VIDEO_CATEGORY_KEYS } from "../../../constants/videoCategories";

const HomePage = () => {
  const dispatch = useDispatch();
  const loaderRef = useRef(null);

  const { videos, loading, error, nextPageToken } = useSelector(
    (state) => state.recomendedSlice,
  );
  const categoryVideosState = useSelector((state) => state.categoryVideosSlice);
  const isAllCategory =
    categoryVideosState.activeCategory === VIDEO_CATEGORY_KEYS.ALL;
  const currentVideos = isAllCategory ? videos : categoryVideosState.videos;
  const currentLoading = isAllCategory ? loading : categoryVideosState.loading;
  const currentError = isAllCategory ? error : categoryVideosState.error;
  const currentNextPageToken = isAllCategory
    ? nextPageToken
    : categoryVideosState.nextPageToken;

  useEffect(() => {
    if (isAllCategory && videos.length === 0) {
      dispatch(fetchRecomendedVideosTC());
    }

    if (!isAllCategory && categoryVideosState.videos.length === 0) {
      dispatch(
        fetchCategoryVideosTC({
          categoryKey: categoryVideosState.activeCategory,
        }),
      );
    }
  }, [
    dispatch,
    isAllCategory,
    videos.length,
    categoryVideosState.activeCategory,
    categoryVideosState.videos.length,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || !currentNextPageToken || currentLoading) {
          return;
        }

        if (isAllCategory) {
          dispatch(fetchRecomendedVideosTC(currentNextPageToken));
          return;
        }

        dispatch(
          fetchCategoryVideosTC({
            categoryKey: categoryVideosState.activeCategory,
            pageToken: currentNextPageToken,
          }),
        );
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
  }, [
    dispatch,
    isAllCategory,
    currentNextPageToken,
    currentLoading,
    categoryVideosState.activeCategory,
  ]);

  return (
    <div>
      <h1 className="sr-only">
        GeeksTube - платформа для просмотра и обмена видео
      </h1>

      <VideoGrid
        videos={currentVideos}
        loading={currentLoading}
        error={currentError}
      />
      {currentLoading && currentVideos.length === 0 && (
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

      {currentLoading && currentVideos.length > 0 && (
        <Flex justify="center" align="center" className="py-4">
          <Spin
            indicator={<LoadingOutlined spin style={{ color: "#ffffff" }} />}
          />
        </Flex>
      )}

      {currentError && (
        <p className="text-center text-red-400 py-4">{currentError}</p>
      )}

      <div ref={loaderRef} className="h-10" />
    </div>
  );
};

export default HomePage;
