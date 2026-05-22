import { useState } from "react";
import YouTubeHeader from "../components/YouTubeHeader";
import Sidebar from "../components/Sidebar";
import HomePage from '../components/Video/HomePage'

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden font-sans">
      {}
      <YouTubeHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {}
      <div className="flex flex-1 overflow-hidden">
        {}
        <Sidebar isOpen={isSidebarOpen} />

        {}
        <main className="flex-1 overflow-y-auto text-white p-4">
          <HomePage/>
        </main>
      </div>
    </div>
  );
};

export default App;
