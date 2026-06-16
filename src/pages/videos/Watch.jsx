import { useParams, useNavigate } from "react-router-dom";
import VideoPlayer from "../../components/players/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import WatchVideoGrid from "../../components/videos/WatchVideoGrid";
import { fetchVideoByIdTC } from "../../store/thunks/spec/video/fetchVideoById";
import { Link } from "react-router-dom";
import { formatSubscribers } from "../../lib/formatYouTube";
import { fetchChannelHomeTC } from "../../store/thunks/spec/channel/channelThunks";
import CommentsSection from "../../components/videos/CommentsSection";
import { fetchVideoRatingTC } from "../../store/thunks/interactions/fetchVideoRating";
import { rateVideoTC } from "../../store/thunks/interactions/rateVideo";
import { checkSubscriptionTC } from "../../store/thunks/interactions/checkSubscription";
import { toggleSubscriptionTC } from "../../store/thunks/interactions/toggleSubscription";
import { addToWatchLaterTC } from "../../store/thunks/spec/watchLater/addToWatchLaterTC";
import WatchLater from "../saved/WatchLater";

const Watch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { video } = useSelector((s) => s.videoByIdSlice);
  const { channel } = useSelector((state) => state.channelSlice);

  const watchLaterVideos = useSelector((state) => state.watchLater.videos);

  console.log("Watch Later:", watchLaterVideos);

  const { currentRating, isSubscribed, subscriptionId } = useSelector(
    (state) => state.interactionsSlice,
  );

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const channelId = video?.snippet?.channelId;

  const token = localStorage.getItem("youtube_google_token");

  useEffect(() => {
    if (channelId) {
      dispatch(fetchChannelHomeTC(channelId));

      if (token) {
        dispatch(checkSubscriptionTC(channelId));
      }
    }
  }, [channelId, dispatch, token]);

  useEffect(() => {
    dispatch(fetchVideoByIdTC(videoId));

    if (token) {
      dispatch(fetchVideoRatingTC(videoId));
    }
  }, [dispatch, videoId, token]);

  const videoTitle = video?.snippet?.title;
  const channelTitle = video?.snippet?.channelTitle;
  const originalLikeCount = Number(video?.statistics?.likeCount || 0);
  const viewCount = video?.statistics?.viewCount;
  const description = video?.snippet?.description;
  const avatarUrl =
    video?.snippet?.thumbnails?.high?.url ||
    video?.snippet?.thumbnails?.default?.url;

  const shortDescription =
    description?.length > 80 && !descriptionExpanded
      ? `${description.slice(0, 80)}`
      : description;

  let displayLikeCount = originalLikeCount;
  if (currentRating === "like") {
    displayLikeCount = originalLikeCount + 1;
  }

  const handleLike = () => {
    const nextRating = currentRating === "like" ? "none" : "like";
    dispatch(rateVideoTC({ videoId, rating: nextRating }));
  };

  const handleDislike = () => {
    const nextRating = currentRating === "dislike" ? "none" : "dislike";
    dispatch(rateVideoTC({ videoId, rating: nextRating }));
  };

  const handleSubscribe = () => {
    if (!channelId) return;
    dispatch(toggleSubscriptionTC({ channelId, isSubscribed, subscriptionId }));
  };

  return (
    <div className="max-w-full">
      <h1 className="sr-only">Просмотр видео {videoTitle} - GeeksTube</h1>
      <div className="w-full">
        <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
          <div className="flex-1 min-w-0">
            <VideoPlayer videoId={videoId} />

            <h1 className="mt-4 text-lg sm:text-xl text-white">{videoTitle}</h1>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 sm:justify-between">
              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  to={`/channel/${video?.snippet?.channelId}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-400 text-sm hover:text-white transition-colors flex gap-3 items-center"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <img
                      src={avatarUrl}
                      alt={videoTitle}
                      className="h-11 w-11 rounded-full bg-zinc-800 object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white text-sm sm:text-base">{channelTitle}</p>
                    <p className="text-xs sm:text-sm">
                      {formatSubscribers(channel?.statistics?.subscriberCount)}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={handleSubscribe}
                  className={`px-3 sm:px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                    isSubscribed
                      ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                      : "bg-white text-black hover:bg-zinc-200"
                  }`}
                >
                  {isSubscribed ? "Вы подписаны" : "Подписаться"}
                </button>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <div className="flex items-center bg-zinc-800 gap-1 sm:gap-1.5 px-3 sm:px-5 py-2 rounded-full">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-1 sm:gap-2 transition-colors ${
                      currentRating === "like"
                        ? "text-blue-400"
                        : "text-white hover:text-gray-300"
                    }`}
                  >
                    <img
                      className={`w-5 h-5 sm:w-7 sm:h-7 ${currentRating === "like" ? "brightness-150" : ""}`}
                      src="/Watch/Like_YouTube.svg"
                      alt="Like"
                    />
                    <p className="font-bold text-xs sm:text-[15px]">{displayLikeCount}</p>
                  </button>

                  <div className="w-px h-5 bg-zinc-500" />

                  <button
                    onClick={handleDislike}
                    className={`flex items-center transition-colors ${
                      currentRating === "dislike"
                        ? "text-red-400"
                        : "text-white hover:text-gray-300"
                    }`}
                  >
                    <img
                      className={`w-5 h-5 sm:w-7 sm:h-7 ${currentRating === "dislike" ? "brightness-150" : ""}`}
                      src="/Watch/Dislike_YouTube.svg"
                      alt="dislike"
                    />
                  </button>
                </div>

                <div className="flex items-center bg-zinc-800 gap-1 px-2 sm:px-3 py-2 sm:py-2.5 rounded-full">
                  <button className="flex items-center gap-1 text-white">
                    <img className="w-5 h-5 sm:w-6 sm:h-6" src="/Watch/Share_YouTube.svg" alt="" />
                    <p className="font-bold text-xs sm:text-sm hidden sm:block">Поделиться</p>
                  </button>
                </div>
                <div className="flex items-center bg-zinc-800 gap-1 px-3 py-2.5 rounded-full hover:bg-white/20 active:scale-97">
                  <button
                    onClick={() => dispatch(addToWatchLaterTC())}
                    className="flex items-center gap-1 text-white"
                  >
                    <img src="/Watch/Watch_later_YouTube.svg" alt="Save" />
                    <p className=" font-bold">Смотреть позже</p>
                  </button>
                </div>
                <div className="flex items-center bg-zinc-800 gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 rounded-full">
                  <button className="flex items-center">
                    <img className="w-5 h-5 sm:w-7 sm:h-7" src="/Watch/Burger..._YouTube.svg" alt="Burger" />
                  </button>
                </div> 
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-zinc-900 p-3 sm:p-4 text-sm text-gray-200">
              <p className="text-xs sm:text-sm">{viewCount} просмотров</p>

              {description && (
                <p className="mt-2 text-xs sm:text-sm text-[#ffffff]">
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

            <CommentsSection
              videoId={videoId}
              initialCommentCount={video?.statistics?.commentCount}
            />
          </div>

          <div className="w-full xl:w-[400px] shrink-0">
            <h2 className="mb-3 text-white text-sm sm:text-base">Рекомендации</h2>

            <div className="grid grid-cols-1">
              <WatchVideoGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
