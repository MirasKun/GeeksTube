import { useState } from "react";
import YouTubeHeader from "../components/YouTubeHeader";
import Sidebar from "../components/Sidebar";
import HomePage from '../components/Video/HomePage'

const App = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((s) => s.sidebarSlice.isOpen);

  return (
    <div className="flex flex-col h-screen bg-[#0F0F0F] overflow-hidden font-sans">
      <YouTubeHeader toggleSidebar={() => dispatch(toggleSidebar())} />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isOpen} />
        <main className="flex-1 overflow-y-auto text-white p-4">
          <HomePage/>
        </main>
      </div>
    </div>
  );
};

export default App;
