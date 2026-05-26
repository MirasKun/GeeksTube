import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import YouTubeHeader from "../components/header/YouTubeHeader";
import Sidebar from "../components/sidebar/Sidebar";
import HomePage from "../pages/HomePage";
import Watch from "../pages/Watch"
import SearchResultsPage from "../pages/SearchResultsPage";
import { toggleSidebar } from "../store/slices/sidebarSlice";

const App = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((s) => s.sidebarSlice.isOpen);

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden font-sans">
      <YouTubeHeader toggleSidebar={() => dispatch(toggleSidebar())} />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isOpen} />
        <main className="flex-1 overflow-y-auto text-white p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/watch/:videoId" element={<Watch />} />
            <Route path="/results" element={<SearchResultsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
