import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, message } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { logoutUserTC } from "../../store/thunks/auth";
import AuthModal from "../auth/AuthModal";
import "../../app/styles/App.css";

const YouTubeHeader = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Все");

  const filters = ["Все", "Музыка", "Новое для вас"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLeftClick = useCallback(() => {
    message.info({
      content: "Это вы",
      duration: 2,
      style: { marginTop: "10px" },
    });
  }, []);

  const handleRightClick = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logoutUserTC());
    },
    [dispatch],
  );

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <div className="w-full shrink-0 bg-[#0F0F0F]">
        <header className="flex flex-col">
          <div className="flex items-center justify-between px-4 h-14">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-gray-700"
              >
                <img
                  src="/header/BurgerMenu.svg"
                  alt="Burger Menu"
                  className="w-6 h-6"
                />
              </button>
              <div className="flex items-center gap-1">
                <img
                  src="/header/YouTube.svg"
                  alt="YouTube"
                  className="w-8 h-8"
                />
                <h1 className="text-white text-xl font-semibold">YouTube</h1>
              </div>
            </div>

            <div className="flex items-center w-150">
              <div className="flex items-center w-full border border-gray-600 rounded-full px-4 h-10 gap-1.5">
                <img src="/header/Search.svg" alt="" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent text-white outline-none"
                />
                <button className="p-1">
                  <img src="/header/Voice.svg" alt="" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-700 text-white text-xl">
                <img src="/header/Create.svg" alt="" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-700 text-white text-xl">
                <img src="/header/Bell.svg" alt="Bell" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-700 text-white text-xl">
                <img src="/header/Settings.svg" alt="" />
              </button>

              {loading ? (
                <div className="text-gray-500 text-xs w-8 h-8 flex items-center justify-center">
                  ...
                </div>
              ) : user ? (
                <div
                  onClick={handleLeftClick}
                  onContextMenu={handleRightClick}
                  title="ЛКМ: статус / ПКМ: выйти"
                  style={{ backgroundColor: "#FF0033" }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold cursor-pointer transition-colors uppercase select-none hover:opacity-90"
                >
                  {user.email ? user.email[0] : "U"}
                </div>
              ) : (
                <Button
                  type="primary"
                  onClick={handleOpenModal}
                  style={{ backgroundColor: "#FF0033" }}
                  className="border-none rounded-full h-8 font-medium px-4 hover:!bg-[#E0002D]"
                >
                  Войти
                </Button>
              )}
            </div>
          </div>

          <div className="flex">
            <div className="flex px-4 py-2 gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    activeFilter === filter
                      ? "bg-white text-black"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </header>
      </div>

      <AuthModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default YouTubeHeader;
