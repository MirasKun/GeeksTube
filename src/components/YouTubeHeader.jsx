import React from "react";
import "../app/styles/App.css";

const YouTubeHeader = () => {
  return (
    <>
      <div className="w-full h-screen bg-black">
        <header className="flex-col items-center">
          <div className="flex items-center justify-between px-4 h-14">
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
                <h1 className="text-white text-xl">YouTube</h1>
              </div>
            </div>

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

            <div className="flex items-center gap-px">
              <button className="p-2 rounded-full hover:bg-gray-700 text-white text-xl">
                <img src="/Create_YouTube.svg" alt="" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-700 text-white text-xl">
                <img src="/Bell_YouTube.svg" alt="Bell" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-700 text-white text-xl">
                <img src="/Settings_YouTube.svg" alt="" />
              </button>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                67
              </div>
            </div>
          </div>
          {/* Навигация */}
          <div className="flex">
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
          </div>
        </header>
      </div>
      <main></main>
    </>
  );
};

export default YouTubeHeader;
