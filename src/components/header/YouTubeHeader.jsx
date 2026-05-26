import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../store/slices/sidebarSlice";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavActions from "./NavActions";
import FilterBar from "./FilterBar";

const YouTubeHeader = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full shrink-0 bg-[#0F0F0F]">
      <header className="flex flex-col">
        <div className="flex items-center justify-between px-4 h-14">
          <Logo onToggleSidebar={() => dispatch(toggleSidebar())} />
          <SearchBar />
          <NavActions />
        </div>
        <FilterBar />
      </header>
    </div>
  );
};

export default YouTubeHeader;
