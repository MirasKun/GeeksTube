import { useState } from "react";

const Sidebar = ({ isOpen }) => {
  const [activeTab, setActiveTab] = useState("Home");

  const [isPlaylistsOpen, setIsPlaylistsOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isSubscriptionsOpen, setIsSubscriptionsOpen] = useState(false);

  const getTabClass = (tabName) => {
    const baseClass = `flex items-center w-full rounded-xl font-sans text-sm transition-all duration-200 cursor-pointer ${
      isOpen ? "gap-5 px-4 py-2.5 justify-start" : "justify-center py-3"
    }`;

    return activeTab === tabName
      ? `${baseClass} bg-red-600/15 text-white font-medium`
      : `${baseClass} text-zinc-300 hover:bg-white/5 font-normal`;
  };

  const getIconSrc = (tabName, defaultIconName) => {
    if (activeTab === tabName) {
      return tabName === "Home"
        ? "/sidebar/selected/Home.svg"
        : `/sidebar/selected/${defaultIconName}.svg`;
    }
    return tabName === "Home"
      ? "/sidebar/Home.svg"
      : `/sidebar/${defaultIconName}.svg`;
  };

  const getArrowSrc = (tabName) => {
    return activeTab === tabName
      ? "/sidebar/selected/Arrow.svg"
      : "/sidebar/Arrow.svg";
  };

  const handleDropdownClick = (tabName, isOpenState, setIsOpenState) => {
    setActiveTab(tabName);
    setIsOpenState(!isOpenState);
  };

  return (
    <aside
      className={`h-full bg-[#0f0f0f] text-white flex flex-col font-sans select-none overflow-y-auto transition-all duration-300 ease-in-out ${
        isOpen ? "w-60 px-3" : "w-20 px-1"
      } py-4 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
    >
      {}
      <div className="flex flex-col gap-1 mb-4">
        <button
          onClick={() => setActiveTab("Home")}
          className={getTabClass("Home")}
        >
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src={getIconSrc("Home", "Home")}
              alt="Home"
              className="w-full h-full object-contain"
            />
          </span>
          <span className={isOpen ? "block" : "hidden"}>Home</span>
        </button>

        <button
          onClick={() => setActiveTab("Explore")}
          className={getTabClass("Explore")}
        >
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src={getIconSrc("Explore", "Explore")}
              alt="Explore"
              className="w-full h-full object-contain"
            />
          </span>
          <span className={isOpen ? "block" : "hidden"}>Explore</span>
        </button>

        <button
          onClick={() => setActiveTab("Shorts")}
          className={getTabClass("Shorts")}
        >
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src={getIconSrc("Shorts", "Shorts")}
              alt="Shorts"
              className="w-full h-full object-contain"
            />
          </span>
          <span className={isOpen ? "block" : "hidden"}>Shorts</span>
        </button>

        <button
          onClick={() => setActiveTab("TV Mode")}
          className={getTabClass("TV Mode")}
        >
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src={getIconSrc("TV Mode", "TVMode")}
              alt="TV Mode"
              className="w-full h-full object-contain"
            />
          </span>
          <span className={isOpen ? "block" : "hidden"}>TV Mode</span>
        </button>
      </div>

      <hr className="border-zinc-800 my-2" />

      {}
      <div className="flex flex-col gap-1 my-2">
        <button
          onClick={() => setActiveTab("History")}
          className={getTabClass("History")}
        >
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src={getIconSrc("History", "History")}
              alt="History"
              className="w-full h-full object-contain"
            />
          </span>
          <span className={isOpen ? "block" : "hidden"}>History</span>
        </button>

        <button
          onClick={() => setActiveTab("Watch Later")}
          className={getTabClass("Watch Later")}
        >
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src={getIconSrc("Watch Later", "WatchLater")}
              alt="Watch Later"
              className="w-full h-full object-contain"
            />
          </span>
          <span className={isOpen ? "block" : "hidden"}>Watch Later</span>
        </button>

        <button
          onClick={() => setActiveTab("Liked Videos")}
          className={getTabClass("Liked Videos")}
        >
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src={getIconSrc("Liked Videos", "Liked")}
              alt="Liked Videos"
              className="w-full h-full object-contain"
            />
          </span>
          <span className={isOpen ? "block" : "hidden"}>Liked Videos</span>
        </button>

        {}
        <button
          onClick={() =>
            handleDropdownClick(
              "Playlists",
              isPlaylistsOpen,
              setIsPlaylistsOpen,
            )
          }
          className={`${getTabClass("Playlists")} ${isOpen ? "justify-between" : ""}`}
        >
          <div className="flex items-center gap-5">
            <span className="w-5 h-5 flex items-center justify-center shrink-0">
              <img
                src={getIconSrc("Playlists", "Playlists")}
                alt="Playlists"
                className="w-full h-full object-contain"
              />
            </span>
            <span className={isOpen ? "block" : "hidden"}>Playlists</span>
          </div>
          <span
            className={`w-4 h-4 items-center justify-center shrink-0 transition-transform duration-300 ${
              isOpen ? "flex" : "hidden"
            } ${isPlaylistsOpen ? "rotate-180" : ""}`}
          >
            <img
              src={getArrowSrc("Playlists")}
              alt="Arrow"
              className="w-full h-full object-contain"
            />
          </span>
        </button>
      </div>

      <hr className="border-zinc-800 my-2" />

      {}
      <div className="flex flex-col gap-1 my-2">
        {}
        <button
          onClick={() =>
            handleDropdownClick(
              "Collections",
              isCollectionsOpen,
              setIsCollectionsOpen,
            )
          }
          className={`${getTabClass("Collections")} ${isOpen ? "justify-between" : ""}`}
        >
          <div className="flex items-center gap-5">
            <span className="w-5 h-5 flex items-center justify-center shrink-0">
              <img
                src={getIconSrc("Collections", "collections")}
                alt="Collections"
                className="w-full h-full object-contain"
              />
            </span>
            <span className={isOpen ? "block" : "hidden"}>Collections</span>
          </div>
          <span
            className={`w-4 h-4 items-center justify-center shrink-0 transition-transform duration-300 ${
              isOpen ? "flex" : "hidden"
            } ${isCollectionsOpen ? "rotate-180" : ""}`}
          >
            <img
              src={getArrowSrc("Collections")}
              alt="Arrow"
              className="w-full h-full object-contain"
            />
          </span>
        </button>

        {}
        <button
          onClick={() =>
            handleDropdownClick(
              "Subscriptions",
              isSubscriptionsOpen,
              setIsSubscriptionsOpen,
            )
          }
          className={`${getTabClass("Subscriptions")} ${isOpen ? "justify-between" : ""}`}
        >
          <div className="flex items-center gap-5">
            <span className="w-5 h-5 flex items-center justify-center shrink-0">
              <img
                src={getIconSrc("Subscriptions", "Subscriptions")}
                alt="Subscriptions"
                className="w-full h-full object-contain"
              />
            </span>
            <span className={isOpen ? "block" : "hidden"}>Subscriptions</span>
          </div>
          <span
            className={`w-4 h-4 items-center justify-center shrink-0 transition-transform duration-300 ${
              isOpen ? "flex" : "hidden"
            } ${isSubscriptionsOpen ? "rotate-180" : ""}`}
          >
            <img
              src={getArrowSrc("Subscriptions")}
              alt="Arrow"
              className="w-full h-full object-contain"
            />
          </span>
        </button>
      </div>
      <hr className="border-zinc-800 my-2" />
    </aside>
  );
};

export default Sidebar;
