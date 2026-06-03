import { useState } from "react";
import SidebarItem from "./SidebarItem";
import AccordionItem from "./AccordionItem";

const MAIN_TABS = [
  { name: "Home", label: "Home", icon: "Home", path: "/" },
  { name: "Shorts", label: "Shorts", icon: "Shorts", path: "/shorts" },
];

const SECONDARY_TABS = [
  { name: "History", label: "History", icon: "History", path: "/history" },
  {
    name: "Watch Later",
    label: "Watch Later",
    icon: "WatchLater",
    path: "/watch/:videoId",
  },
  {
    name: "Liked Videos",
    label: "Liked Videos",
    icon: "Liked",
    path: "/liked-videos",
  },
];

const Sidebar = ({ isOpen }) => {
  const [activeTab, setActiveTab] = useState("");
  const [isPlaylistsOpen, setIsPlaylistsOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isSubscriptionsOpen, setIsSubscriptionsOpen] = useState(false);

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

        <AccordionItem
          name="Playlists"
          label="Playlists"
          iconName="Playlists"
          isActive={activeTab === "Playlists"}
          isOpen={isOpen}
          isExpanded={isPlaylistsOpen}
          onClick={() =>
            handleDropdownClick(
              "Playlists",
              isPlaylistsOpen,
              setIsPlaylistsOpen,
            )
          }
        />
      </div>

      <hr className="border-zinc-800 my-2" />

      <div className="flex flex-col gap-1 my-2">
        <AccordionItem
          name="Collections"
          label="Collections"
          iconName="collections"
          isActive={activeTab === "Collections"}
          isOpen={isOpen}
          isExpanded={isCollectionsOpen}
          onClick={() =>
            handleDropdownClick(
              "Collections",
              isCollectionsOpen,
              setIsCollectionsOpen,
            )
          }
        />

        <AccordionItem
          name="Subscriptions"
          label="Subscriptions"
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
      </div>
      <hr className="border-zinc-800 my-2" />
    </aside>
  );
};

export default Sidebar;
