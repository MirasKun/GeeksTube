import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import YouTubeHeader from "../components/header/YouTubeHeader";
import Sidebar from "../components/sidebar/Sidebar";
import Explore from "../pages/Explore";
import HomePage from "../pages/HomePage";
import SearchResultsPage from "../pages/SearchResultsPage";
import Watch from "../pages/Watch";
import TVMode from "../pages/TVMode";
import { toggleSidebar } from "../store/slices/sidebarSlice";

const App = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((s) => s.sidebarSlice.isOpen);
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-[#0F0F0F] overflow-hidden font-sans">
      <YouTubeHeader toggleSidebar={() => dispatch(toggleSidebar())} />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isOpen} />
        <main className="flex-1 overflow-y-auto text-white p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<SearchResultsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
