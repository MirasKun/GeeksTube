import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SidebarItem from "./item/SidebarItem";
import AccordionItem from "./item/AccordionItem";
import { fetchSubscribedChannelsTC } from "../../store/thunks/interactions/fetchSubscribedChannels";

const MAIN_TABS = [
  { name: "Главная", label: "Главная", icon: "Home", path: "/" },
  { name: "Shorts", label: "Shorts", icon: "Shorts", path: "/shorts" },
];

const SECONDARY_TABS = [
  { name: "История", label: "История", icon: "History", path: "/history" },
  {
    name: "Смотреть позже",
    label: "Смотреть позже",
    icon: "WatchLater",
    path: "/watch-later",
  },
  {
    name: "Понравившиеся",
    label: "Понравившиеся",
    icon: "Liked",
    path: "/liked-videos",
  },
];

const SIDEBAR_SUBSCRIPTIONS_LIMIT = 9;

const SubscriptionSkeleton = () => (
  <div className="flex flex-col gap-1 px-2 py-1">
    {Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className="flex h-10 items-center gap-3 rounded-xl px-2"
      >
        <span className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-zinc-800" />
        <span className="h-3 w-28 animate-pulse rounded bg-zinc-800" />
      </div>
    ))}
  </div>
);

const SubscriptionChannelItem = ({ channel }) => {
  const title = channel.title || "Канал";

  return (
    <NavLink
      to={`/channel/${channel.id}`}
      title={title}
      className={({ isActive }) =>
        `group flex h-10 items-center gap-3 rounded-xl px-3 text-sm transition-colors ${
          isActive
            ? "bg-white/15 text-white font-medium"
            : "text-zinc-300 hover:bg-white/5"
        }`
      }
    >
      <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-zinc-800">
        {channel.avatar ? (
          <img
            src={channel.avatar}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-[11px] font-semibold uppercase text-white">
            {title[0]}
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1 truncate">{title}</span>
    </NavLink>
  );
};

const SubscriptionsPanel = ({
  isOpen,
  isExpanded,
  channels,
  isLoading,
  error,
  hasToken,
  user,
}) => {
  const [showAll, setShowAll] = useState(false);

  if (!isOpen || !isExpanded) return null;

  if (!user || !hasToken) {
    return (
      <p className="px-4 py-2 text-xs leading-5 text-zinc-400">
        Войдите в Google, чтобы увидеть каналы из ваших подписок.
      </p>
    );
  }

  if (isLoading && channels.length === 0) {
    return <SubscriptionSkeleton />;
  }

  if (error) {
    return (
      <p className="px-4 py-2 text-xs leading-5 text-red-300">
        Не удалось загрузить подписки
      </p>
    );
  }

  if (channels.length === 0) {
    return (
      <p className="px-4 py-2 text-xs leading-5 text-zinc-400">
        У вас пока нет подписок.
      </p>
    );
  }

  const visibleChannels = showAll
    ? channels
    : channels.slice(0, SIDEBAR_SUBSCRIPTIONS_LIMIT);
  const hasHiddenChannels = channels.length > SIDEBAR_SUBSCRIPTIONS_LIMIT;

  return (
    <div className="mt-1 flex flex-col gap-1">
      {visibleChannels.map((channel) => (
        <SubscriptionChannelItem
          key={channel.id}
          channel={channel}
        />
      ))}
      {hasHiddenChannels && (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm text-zinc-300 transition-colors hover:bg-white/5"
        >
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center transition-transform ${
              showAll ? "rotate-180" : ""
            }`}
          >
            <img
              src="/sidebar/Arrow.svg"
              alt=""
              className="h-4 w-4"
            />
          </span>
          <span>{showAll ? "Свернуть" : "Показать ещё"}</span>
        </button>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("");
  const [isSubscriptionsOpen, setIsSubscriptionsOpen] = useState(false);
  const { user } = useSelector((state) => state.authSlice);
  const {
    subscribedChannels,
    loading: interactionsLoading,
    errors: interactionsErrors,
  } = useSelector((state) => state.interactionsSlice);
  const hasGoogleToken = Boolean(localStorage.getItem("youtube_google_token"));

  useEffect(() => {
    if (!user || !hasGoogleToken || subscribedChannels.length > 0) return;
    dispatch(fetchSubscribedChannelsTC());
  }, [dispatch, hasGoogleToken, subscribedChannels.length, user]);

  const handleDropdownClick = (tabName, isOpenState, setIsOpenState) => {
    setActiveTab(tabName);
    setIsOpenState(!isOpenState);
  };

  return (
    <aside
      className={`h-full bg-[#0f0f0f] text-white flex flex-col font-sans select-none overflow-y-auto transition-all duration-300 ease-in-out ${
        isOpen ? "w-60 px-3" : "w-20 px-1"
      } py-4 [ms-overflow-style:none] [scrollbar-:none] [&::-webkit-scrollbar]:hidden`}
    >
      <div className="flex flex-col gap-1 mb-4">
        {MAIN_TABS.map((tab) => (
          <SidebarItem
            key={tab.name}
            label={tab.label}
            iconName={tab.icon}
            isOpen={isOpen}
            to={tab.path}
            end={tab.path === "/"}
          />
        ))}
      </div>

      <hr className="border-zinc-800 my-2" />

      <div className="flex flex-col gap-1 my-2">
        {SECONDARY_TABS.map((tab) => (
          <SidebarItem
            key={tab.name}
            label={tab.label}
            iconName={tab.icon}
            isOpen={isOpen}
            to={tab.path}
          />
        ))}
      </div>

      <hr className="border-zinc-800 my-2" />

      <div className="flex flex-col gap-1 my-2">
        <AccordionItem
          name="Subscriptions"
          label="Подписки"
          iconName="Subscriptions"
          isActive={activeTab === "Subscriptions"}
          isOpen={isOpen}
          isExpanded={isSubscriptionsOpen}
          onClick={() =>
            handleDropdownClick(
              "Subscriptions",
              isSubscriptionsOpen,
              setIsSubscriptionsOpen,
            )
          }
        />
        <SubscriptionsPanel
          isOpen={isOpen}
          isExpanded={isSubscriptionsOpen}
          channels={subscribedChannels}
          isLoading={interactionsLoading.subscribedChannels}
          error={interactionsErrors.subscribedChannels}
          hasToken={hasGoogleToken}
          user={user}
        />
      </div>
      <hr className="border-zinc-800 my-2" />
    </aside>
  );
};

export default Sidebar;
