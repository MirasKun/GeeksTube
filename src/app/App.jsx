import { useDispatch, useSelector } from "react-redux";
import YouTubeHeader from '../components/header/YouTubeHeader';
import Sidebar from "../components/sidebar/Sidebar";
import { toggleSidebar } from "../store/slices/sidebarSlice";
import VideoGrid from '../components/videos/VideoGrid'

const App = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((s) => s.sidebarSlice.isOpen);

  return (
    <div className="flex flex-col h-screen bg-[#0F0F0F] overflow-hidden font-sans">
      <YouTubeHeader toggleSidebar={() => dispatch(toggleSidebar())} />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isOpen} />
        <main className="flex-1 overflow-y-auto text-white p-4">
          <VideoGrid/>
        </main>
      </div>
    </div>
  );
};

export default App;
