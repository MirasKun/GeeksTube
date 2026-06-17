import { useCallback } from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { loginWithGoogle, logoutUser } from "../../../store/thunks/auth";

const NavActions = () => {
  const { user, loading: authLoading } = useSelector((s) => s.authSlice);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  const handleRightClick = useCallback(async (e) => {
    e.preventDefault();
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, []);

  return (
    <div className="flex items-center gap-0 sm:gap-1">
      <a
        href="https://studio.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 sm:p-2 rounded-full hover:bg-gray-700 shrink-0"
        title="Творческая студия YouTube"
      >
        <img src="/header/Create.svg" alt="Studio" className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>

      <button className="p-1.5 sm:p-2 rounded-full hover:bg-gray-700 shrink-0">
        <img src="/header/Bell.svg" alt="Bell" className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button className="p-1.5 sm:p-2 rounded-full hover:bg-gray-700 shrink-0">
        <img src="/header/Settings.svg" alt="Settings" className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {authLoading ? (
        <div className="text-gray-500 text-xs w-8 h-8 flex items-center justify-center">
          ...
        </div>
      ) : user ? (
        <div
          onContextMenu={handleRightClick}
          title="ЛКМ: статус / ПКМ: выйти"
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold cursor-pointer uppercase select-none hover:opacity-90 overflow-hidden shrink-0"
        >
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div
              style={{ backgroundColor: "#FF0033" }}
              className="w-full h-full flex items-center justify-center"
            >
              {user.displayName?.[0] || user.email?.[0] || "U"}
            </div>
          )}
        </div>
      ) : (
        <Button
          type="primary"
          onClick={handleLogin}
          style={{ backgroundColor: "#FF0033" }}
          className="border-none rounded-full text-xs sm:text-sm px-2 sm:px-4"
        >
          Войти
        </Button>
      )}
    </div>
  );
};

export default NavActions;
