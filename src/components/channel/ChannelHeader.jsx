import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCount, formatSubscribers } from "../../lib/formatYouTube";
import { toggleChannelSubscription } from "../../store/slices/channelSlice";


const ChannelHeader = ({ channel }) => {
  const dispatch = useDispatch();
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);


  const subscribedChannelIds = useSelector(
    (state) => state.channelSlice.subscribedChannelIds,
  );

  if (!channel) return null;

  const { snippet, statistics, id } = channel;
  const avatarUrl =
    snippet?.thumbnails?.high?.url || snippet?.thumbnails?.default?.url;
  const title = snippet?.title ?? "Канал";
  const customUrl = snippet?.customUrl;
  const description = snippet?.description ?? "";
  const isSubscribed = subscribedChannelIds.includes(id);
  const videoCount = statistics?.videoCount;
  const subscriberCount = statistics?.subscriberCount;

  const shortDescription =
    description.length > 80 && !descriptionExpanded
      ? `${description.slice(0, 80)}`
      : description;

  return (
    <header className="px-4 pb-2 pt-6 md:px-8">
      <div className="flex gap-6">
        <img
          src={avatarUrl}
          alt={title}
          className="h-[136px] w-[136px] shrink-0 rounded-full bg-zinc-800 object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[36px] font-bold leading-tight text-white">
              {title}
            </h1>
          </div>

          <p className="mt-1 text-sm text-[#aaaaaa]">
            {customUrl && <span>{customUrl} • </span>}
            {formatSubscribers(subscriberCount)}
            {videoCount != null && <> • {formatCount(videoCount)} видео</>}
          </p>

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

          <div className="mt-4">
            {isSubscribed ? (
              <button
                type="button"
                onClick={() => dispatch(toggleChannelSubscription(id))}
                className="inline-flex items-center gap-3 rounded-full bg-[#272727] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3f3f3f]"
              >
                <span>Вы подписаны</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => dispatch(toggleChannelSubscription(id))}
                className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                Подписаться
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChannelHeader;
