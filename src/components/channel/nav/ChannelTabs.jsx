import { useDispatch, useSelector } from "react-redux";
import {
  clearChannelSearch,
  setChannelSearchQuery,
  setChannelTab,
} from "../../../store/slices/channelSlice";

const TABS = [
  { id: "home", label: "Главная" },
  { id: "videos", label: "Видео" },
];

const ChannelTabs = ({ onSearch }) => {
  const dispatch = useDispatch();
  const { activeTab, searchQuery } = useSelector((state) => state.channelSlice);

  const handleTabClick = (tabId) => {
    if (tabId === "search") {
      dispatch(setChannelTab("search"));
      return;
    }

    dispatch(setChannelTab(tabId));
    dispatch(clearChannelSearch());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <div className="top-0 z-20 border-b border-white/10 bg-[#0f0f0f] px-4 md:px-8">
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`relative shrink-0 py-3 text-sm font-medium transition-colors ${
                isActive ? "text-white" : "text-[#aaaaaa] hover:text-white"
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
              )}
            </button>
          );
        })}
      </div>

      {activeTab === "search" && (
        <form onSubmit={handleSubmit} className="flex gap-2 pb-4">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => dispatch(setChannelSearchQuery(e.target.value))}
            placeholder="Поиск по каналу"
            className="flex-1 rounded-full border border-[#303030] bg-[#121212] px-4 py-2 text-sm text-white outline-none focus:border-[#3f3f3f]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#272727] px-4 py-2 text-sm font-medium text-white hover:bg-[#3f3f3f]"
          >
            Найти
          </button>
        </form>
      )}
    </div>
  );
};

export default ChannelTabs;
