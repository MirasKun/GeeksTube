import { useEffect, useRef } from "react";
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
import { toggleSidebar } from "../store/slices/spec/sidebarSlice";
import ChannelPage from "../pages/channel/ChannelPage";

const App = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((s) => s.sidebarSlice.isOpen);
  const location = useLocation();
  const mainRef = useRef(null);

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

  // Скроллим main контейнер наверх при каждой смене маршрута
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen bg-[#0F0F0F] overflow-hidden font-sans">
      <YouTubeHeader toggleSidebar={() => dispatch(toggleSidebar())} />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isOpen} />
        <main ref={mainRef} className="flex-1 overflow-y-auto text-white p-4">
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<History />} />
            <Route path="/liked-videos" element={<LikedVideos />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/watch/:videoId" element={<Watch />} />
            <Route path="/results" element={<SearchResultsPage />} />
            <Route path="/channel/:channelId" element={<ChannelPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
