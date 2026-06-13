import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { setUser, clearUser, setLoading } from "../store/slices/authSlice";
import YouTubeHeader from "../components/header/YouTubeHeader";
import Sidebar from "../components/sidebar/Sidebar";
import HomePage from "../pages/videos/general/HomePage";
import History from "../pages/saved/History";
import LikedVideos from "../pages/saved/LikedVideos";
import Shorts from "../pages/videos/shorts/Shorts";
import Watch from "../pages/videos/Watch";
import SearchResultsPage from "../pages/videos/search/SearchResultsPage";
import { toggleSidebar, closeSidebar } from "../store/slices/spec/sidebarSlice";
import ChannelPage from "../pages/channel/ChannelPage";
import FilterBar from "../components/header/interactive/FilterBar";

const App = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((s) => s.sidebarSlice.isOpen);
  const location = useLocation();
  const mainRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) dispatch(closeSidebar());
  }, [isMobile, dispatch]);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen bg-[#0F0F0F] overflow-hidden font-sans">
      <YouTubeHeader />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {isMobile ? (
          isOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-30"
                onClick={() => dispatch(closeSidebar())}
              />
              <div className="fixed left-0 top-12 sm:top-14 bottom-0 z-40">
                <Sidebar isOpen={true} />
              </div>
            </>
          )
        ) : (
          <Sidebar isOpen={isOpen} />
        )}
        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto flex flex-col text-white p-2 lg:p-4 gap-4"
        >
          <FilterBar />
          <div key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/history" element={<History />} />
              <Route path="/liked-videos" element={<LikedVideos />} />
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/watch/:videoId" element={<Watch />} />
              <Route path="/results" element={<SearchResultsPage />} />
              <Route path="/channel/:channelId" element={<ChannelPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
