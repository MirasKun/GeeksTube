import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import { message } from "antd";

/**
 * Авторизация через Google popup.
 * Сохраняет access_token в localStorage и возвращает данные пользователя.
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    if (accessToken) {
      localStorage.setItem("youtube_google_token", accessToken);
    }

    message.success("Вы успешно вошли через Google");

    return {
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      uid: result.user.uid,
      accessToken,
    };
  } catch (error) {
    console.error("Google auth error:", error.code, error.message);

    if (error.code === "auth/popup-closed-by-user") {
      return null;
    }

    if (error.code === "auth/network-request-failed" || !navigator.onLine) {
      message.error("Нет подключения к интернету");
    } else if (error.code === "auth/cancelled-popup-request") {
      return null;
    } else {
      message.error("Не удалось войти через Google");
    }

    throw error;
  }
};

/**
 * Выход из аккаунта.
 * Удаляет токен из localStorage и делает signOut в Firebase.
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("youtube_google_token");
    message.success("Вы вышли из аккаунта");
  } catch (error) {
    if (error.code === "auth/network-request-failed" || !navigator.onLine) {
      message.error("Нет подключения к интернету");
    } else {
      message.error("Не удалось выйти. Попробуйте ещё раз");
    }
    throw error;
  }
};
