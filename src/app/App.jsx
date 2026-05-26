import { useState } from "react";
import YouTubeHeader from "../components/header/YouTubeHeader";
import Sidebar from "../components/sidebar/Sidebar";
import HomePage from "../pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Watch from "../pages/Watch"

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden font-sans">
      <YouTubeHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />

        <main className="flex-1 overflow-y-auto text-white p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/watch/:videoId" element={<Watch />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
