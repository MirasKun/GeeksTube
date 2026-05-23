import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import AuthModal from "./AuthModal";
import "../app/styles/App.css";

const YouTubeHeader = () => {
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
    {
      /По cвоей cути - заглушка по левой кнопной мыши, вмеcто уведомления можно будет добавить переход на профиль/;
    }
    message.info({
      content: "Это вы",
      duration: 2,
      style: { marginTop: "10px" },
    });
  };

  const handleRightClick = async (e) => {
    {
      /Выход из аккаунта по правой кнопкой мыши можно будет cделать выход через cтраницу профиля или оcтавить так/;
    }
    e.preventDefault();
    try {
      await signOut(auth);
      message.success("Вы успешно вышли из аккаунта (через ПКМ)");
    } catch {
      message.error("Не удалось выйти");
    }
  };

  return (
    <>
      <div className="w-full h-20.25 bg-[#0F0F0F]">
        <header className="flex-col items-center">
          <div className="flex items-center justify-between px-4 h-14">
            {}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-700">
                <img
                  src="/BurgerMenu.svg"
                  alt="Burger Menu"
                  className="w-6 h-6"
                />
              </button>
              <div className="flex items-center gap-1">
                <img
                  src="/YouTube_Logo.svg"
                  alt="YouTube"
                  className="w-8 h-8"
                />
                <h1 className="text-white text-xl font-semibold">YouTube</h1>
              </div>
            </div>

            {}
            <div className="flex items-center w-150">
              <div className="flex items-center w-full border border-gray-600 rounded-full px-4 h-10 gap-1.5">
                <img src="/Search-YouTube.svg" alt="" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent text-white outline-none"
                />
                <button className="p-1">
                  <img src="/Vois_YouTube.svg" alt="" />
                </button>
              </div>
            </div>

            {}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-700 text-white text-xl">
                <img src="/Create_YouTube.svg" alt="" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-700 text-white text-xl">
                <img src="/Bell_YouTube.svg" alt="Bell" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-700 text-white text-xl">
                <img src="/Settings_YouTube.svg" alt="" />
              </button>

              {}
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

          {}
          <div className="flex">
            <div className="flex px-4 py-2 gap-3">
              <button className="px-3 py-1 rounded-lg bg-white text-black hover:bg-gray-200">
                Все
              </button>
              <button className="px-3 py-1 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
                Музыка
              </button>
              <button className="px-3 py-1 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
                Рэп
              </button>
              <button className="px-3 py-1 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
                Анимация
              </button>
              <button className="px-3 py-1 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
                Недавно опубликованные
              </button>
              <button className="px-3 py-1 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
                Просмотрено
              </button>
              <button className="px-3 py-1 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
                Новое для вас
              </button>
            </div>
          </div>
        </header>
      </div>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <main></main>
    </>
  );
};

export default YouTubeHeader;
