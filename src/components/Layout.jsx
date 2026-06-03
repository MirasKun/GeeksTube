import YouTubeHeader from "./YouTubeHeader";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0F0F0F]">
      <YouTubeHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-zinc-900 p-4 content-visibility-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
