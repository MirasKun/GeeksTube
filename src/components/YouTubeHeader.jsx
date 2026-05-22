import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import AuthModal from "./AuthModal";
import "../app/styles/App.css";

const YouTubeHeader = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLeftClick = () => {
    message.info({
      content: "Это вы",
      duration: 2,
      style: { marginTop: "10px" },
    });
  };

  const handleRightClick = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      message.success("Вы вышли из аккаунта (через ПКМ)");
    } catch {
      message.error("Не удалось выйти");
    }
  };

  return (
    <>
      {}
      <header className="w-full flex-col items-center bg-black">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            {}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
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
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer transition-colors uppercase select-none"
              >
                {user.email ? user.email[0] : "U"}
              </div>
            ) : (
              <Button
                type="primary"
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 border-none rounded-full h-8 font-medium px-4"
              >
                Войти
              </Button>
            )}
          </div>
        </div>

        <div className="flex">
          <div className="flex px-4 py-2 gap-3">
            <button className="px-3 py-1 rounded-lg bg-white text-black hover:bg-gray-200">
              Все
            </button>
            <button className="px-3 py-1 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
              Музыка
            </button>
            {}
            <button className="px-3 py-1 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
              Новое для вас
            </button>
          </div>
        </div>
      </header>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default YouTubeHeader;
