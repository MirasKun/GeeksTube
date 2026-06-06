import { useParams, Link } from "react-router-dom";
import VideoPlayer from "../components/players/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchVideoByIdTC } from "../store/thunks/spec/fetchVideoById";
import { formatSubscribers } from "../lib/formatYouTube";
import { fetchChannelHomeTC } from "../store/thunks/channelThunks";


const Watch = () => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { video } = useSelector((s) => s.videoByIdSlice);
  const { channel } = useSelector((state) => state.channelSlice);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const channelId = video?.snippet?.channelId;

  useEffect(() => {
    if (channelId) {
      dispatch(fetchChannelHomeTC(channelId));
    }
  }, [channelId, dispatch]);

  useEffect(() => {
    dispatch(fetchVideoByIdTC(videoId));
  }, [dispatch, videoId]);

  if (!video) {
    return <div>Loading...</div>;
  }

  const videoTitle = video?.snippet?.title;
  const channelTitle = video?.snippet?.channelTitle;
  const likeCount = video?.statistics?.likeCount;
  const viewCount = video?.statistics?.viewCount;
  const description = video?.snippet?.description;
  const avatarUrl =
    video?.snippet?.thumbnails?.high?.url ||
    video?.snippet?.thumbnails?.default?.url;

  const shortDescription =
    description?.length > 80 && !descriptionExpanded
      ? `${description.slice(0, 80)}`
      : description;

  console.log(video);
  return (
    <div>
      <div className="w-full max-w-450 px-4 py-6">
        <div className="flex gap-6">
          <div className="w-960">
            <VideoPlayer videoId={videoId} />

            <h1 className="mt-4 text-xl text-white">{videoTitle}</h1>
            <div className="mt-3 flex items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <Link
                  to={`/channel/${video?.snippet.channelId}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-400 text-sm mt-1 block hover:text-white transition-colors flex gap-3 items-center"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center ">
                    <img
                      src={avatarUrl}
                      alt={videoTitle}
                      className="h-11 w-11 rounded-full bg-zinc-800 object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white">{channelTitle}</p>
                    <p>
                      {formatSubscribers(channel?.statistics?.subscriberCount)}
                    </p>
                  </div>
                </Link>

                <button className="bg-white text-black px-4 py-2 rounded-full">
                  Подписаться
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-zinc-800 gap-1.5 px-5 py-2 rounded-full">
                  <button className="flex items-center gap-2 text-white">
                    <img
                      className="w-7 h-7"
                      src="/Watch/Like_YouTube.svg"
                      alt="Like"
                    />
                    <p className="font-bold text-[15px]">{likeCount}</p>
                  </button>
                  <div className="w-px h-5 bg-zinc-500" />
                  <button className="flex items-center text-white">
                    <img
                      className="w-7 h-7"
                      src="/Watch/Dislike_YouTube.svg"
                      alt="dislike"
                    />
                  </button>
                </div>
                <div className="flex items-center bg-zinc-800 gap-1 px-3 py-2.5 rounded-full">
                  <button className="flex items-center gap-1 text-white">
                    <img
                      className="w-6 h-6"
                      src="/Watch/Share_YouTube.svg"
                      alt=""
                    />
                    <p className=" font-bold">Поделиться</p>
                  </button>
                </div>
                <div className="flex items-center bg-zinc-800 gap-1 px-3 py-2.5 rounded-full">
                  <button className="flex items-center gap-1 text-white">
                    <img src="/Watch/Save_YouTube.svg" alt="Save" />
                    <p className=" font-bold">Сохранить</p>
                  </button>
                </div>
                <div className="flex items-center bg-zinc-800 gap-1.5 px-3 py-2 rounded-full">
                  <button className="flex items-center ">
                    <img
                      className="w-7 h-7"
                      src="/Watch/Burger..._YouTube.svg"
                      alt="Burger"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-zinc-900 p-4 text-sm text-gray-200">
              <p>{viewCount} просмотров</p>

              {description && (
                <p className="mt-2 text-sm text-[#ffffff]">
                  {shortDescription}
                  {description.length > 80 && !descriptionExpanded && "..."}
                  {description.length > 80 && (
                    <button
                      type="button"
                      onClick={() => setDescriptionExpanded((v) => !v)}
                      className="ml-1 font-medium text-[#aaaaaa] hover:text-[#eeeeee]"
                    >
                      {descriptionExpanded ? "свернуть" : "ещё"}
                    </button>
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="w-400">
            <h2 className="mb-3 text-white">Рекомендации</h2>

            <div>
              <div className="flex gap-3">
                <div className="w-40 h-23 bg-zinc-800 rounded-lg" />
                <div>
                  <p className="text-sm text-white">Другое интересное видео</p>
                  <p className="mt-1 text-xs text-gray-400">Канал</p>
                  <div>
                    <p className="text-xs text-gray-400">67 тыс. просмотров</p>
                    <p className="text-xs text-gray-400">5 лет назад</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
