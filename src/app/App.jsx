import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import YouTubeHeader from "../components/header/YouTubeHeader";
import Sidebar from "../components/sidebar/Sidebar";
import HomePage from "../pages/HomePage";
import History from "../pages/History";
import LikedVideos from "../pages/LikedVideos";
import Shorts from "../pages/Shorts";
import Watch from "../pages/Watch";
import SearchResultsPage from "../pages/SearchResultsPage";
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
          <div key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/history" element={<History />} />
              <Route path="/liked-videos" element={<LikedVideos />} />
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/watch/:videoId" element={<Watch />} />
              <Route path="/results" element={<SearchResultsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
