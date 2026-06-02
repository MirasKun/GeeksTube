import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchShortsTC } from "../store/thunks/fetchShorts";
import { resetShorts } from "../store/slices/shortsSlice";

const Shorts = () => {
  const dispatch = useDispatch();
  const loaderRef = useRef(null);
  const [searchParams] = useSearchParams();
  const activeQuery = searchParams.get("search_query")?.trim() || "shorts";

  const { shorts, loading, error, nextPageToken } = useSelector(
    (state) => state.shortsSlice,
  );

  useEffect(() => {
    dispatch(resetShorts());
    dispatch(fetchShortsTC({ query: activeQuery }));
  }, [activeQuery, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && nextPageToken && !loading) {
          dispatch(
            fetchShortsTC({
              pageToken: nextPageToken,
              query: activeQuery,
            }),
          );
        }
      },
      {
        rootMargin: "350px",
        threshold: 0,
      },
    );

    const loaderElement = loaderRef.current;
    if (loaderElement) observer.observe(loaderElement);

    return () => {
      if (loaderElement) observer.unobserve(loaderElement);
    };
  }, [activeQuery, dispatch, nextPageToken, loading]);

  return (
    <div className="mx-auto w-full max-w-screen-2xl pb-10 text-white">
      <div className="mb-6 flex flex-col gap-2 px-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
            Shorts
          </h1>
        </div>
      </div>

      {shorts.length === 0 && !loading && !error ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/60">
          Пока нет shorts.
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {shorts.map((video) => {
          const videoId = video.id?.videoId ?? video.id;
          const { snippet } = video;
          const thumbnail =
            snippet?.thumbnails?.high?.url ||
            snippet?.thumbnails?.medium?.url ||
            snippet?.thumbnails?.default?.url ||
            "";
          const publishedAt = snippet?.publishedAt
            ? new Date(snippet.publishedAt).toLocaleDateString("ru-RU")
            : "";

          return (
            <div
              key={videoId}
              className="cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#171717] transition-transform duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-[#1d1d1d]"
            >
              <div className="relative aspect-9/16 w-full bg-black">
                <img
                  src={thumbnail}
                  alt={snippet?.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs text-white/60">{publishedAt}</p>
                  <h2 className="mt-2 line-clamp-2 text-base font-semibold text-white">
                    {snippet?.title}
                  </h2>
                  <p className="mt-2 text-sm text-white/80">
                    {snippet?.channelTitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {loading && shorts.length === 0 && (
        <p className="py-6 text-center text-white/55">Загрузка ...</p>
      )}

      {loading && shorts.length > 0 && (
        <p className="py-6 text-center text-white/55">Загружаем ...</p>
      )}

      {error && <p className="py-6 text-center text-red-400">{error}</p>}

      <div ref={loaderRef} className="h-10" />
    </div>
  );
};

export default Shorts;
