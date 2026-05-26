import YouTubeHeader from "./YouTubeHeader";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <YouTubeHeader />
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-white dark:bg-zinc-900 p-4">
          <Outlet/>
        </main>
    </div>
  );
};

export default Layout;
