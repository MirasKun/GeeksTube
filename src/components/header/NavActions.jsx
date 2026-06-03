import { useCallback, useEffect, useState } from "react";
import { Button, message } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { loginWithGoogle, logoutUser } from "../../store/thunks/auth";

const NavActions = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLeftClick = useCallback(() => {
    message.info({
      content: "Это вы",
      duration: 2,
      style: { marginTop: "10px" },
    });
  }, []);

  const handleRightClick = useCallback(async (e) => {
    e.preventDefault();
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, []);

  return (
    <div className="flex items-center gap-2">
      <a
        href="https://studio.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full hover:bg-gray-700 block shrink-0"
        title="Творческая студия YouTube"
      >
        <img src="/header/Create.svg" alt="Studio" />
      </a>

      <button className="p-2 rounded-full hover:bg-gray-700">
        <img src="/header/Bell.svg" alt="Bell" />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-700">
        <img src="/header/Settings.svg" alt="Settings" />
      </button>

      {authLoading ? (
        <div className="text-gray-500 text-xs w-8 h-8 flex items-center justify-center">
          ...
        </div>
      ) : user ? (
        <div
          onClick={handleLeftClick}
          onContextMenu={handleRightClick}
          title="ЛКМ: статус / ПКМ: выйти"
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold cursor-pointer uppercase select-none hover:opacity-90 overflow-hidden"
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
          className="border-none rounded-full"
        >
          Войти
        </Button>
      )}
    </div>
  );
};

export default NavActions;
