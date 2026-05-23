import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { message } from "antd";

const isNetworkError = (error) =>
  error.code === "auth/network-request-failed" || !navigator.onLine;

export const loginUserTC = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      message.success("Вы успешно вошли");
      return { email: userCredential.user.email, uid: userCredential.user.uid };
    } catch (error) {
      if (isNetworkError(error)) {
        message.error("Нет подключения к интернету");
      } else if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        message.error("Неверный email или пароль");
      } else if (error.code === "auth/invalid-email") {
        message.error("Некорректный email");
      } else if (error.code === "auth/too-many-requests") {
        message.error("Слишком много попыток. Попробуйте позже");
      } else if (error.code === "auth/user-disabled") {
        message.error("Аккаунт заблокирован");
      } else {
        message.error("Не удалось войти. Попробуйте ещё раз");
      }
      return rejectWithValue(error.code);
    }
  },
);

export const registerUserTC = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      message.success("Аккаунт успешно создан");
      return { email: userCredential.user.email, uid: userCredential.user.uid };
    } catch (error) {
      if (isNetworkError(error)) {
        message.error("Нет подключения к интернету");
      } else if (error.code === "auth/email-already-in-use") {
        message.error("Этот email уже зарегистрирован");
      } else if (error.code === "auth/invalid-email") {
        message.error("Некорректный email");
      } else if (error.code === "auth/weak-password") {
        message.error("Пароль слишком простой");
      } else if (error.code === "auth/too-many-requests") {
        message.error("Слишком много попыток. Попробуйте позже");
      } else {
        message.error("Не удалось создать аккаунт. Попробуйте ещё раз");
      }
      return rejectWithValue(error.code);
    }
  },
);

export const logoutUserTC = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      message.success("Вы вышли из аккаунта");
    } catch (error) {
      if (isNetworkError(error)) {
        message.error("Нет подключения к интернету");
      } else {
        message.error("Не удалось выйти. Попробуйте ещё раз");
      }
      return rejectWithValue(error.code);
    }
  },
);
