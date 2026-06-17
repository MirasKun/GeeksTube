import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../store/slices/spec/sidebarSlice";
import Logo from "./Logo";
import SearchBar from "./interactive/SearchBar";
import NavActions from "./interactive/NavActions";

const YouTubeHeader = () => {
  const dispatch = useDispatch();

  return (
      <header className="flex flex-col ">
        <div className="flex items-center justify-between px-4 h-14">
          <Logo onToggleSidebar={() => dispatch(toggleSidebar())} />
          <SearchBar />
          <NavActions />
        </div>
      </header>
  );
};

export default YouTubeHeader;
