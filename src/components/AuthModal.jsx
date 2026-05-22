import { useState } from "react";
import {
  Modal,
  Input,
  Button,
  Form,
  Tabs,
  message,
  ConfigProvider,
  theme,
} from "antd";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const AuthModal = ({ isOpen, onClose }) => {
  const [authLoading, setAuthLoading] = useState(false);

  const handleLogin = async (values) => {
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      message.success("Вы успешно вошли");
      onClose();
    } catch (error) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found"
      ) {
        message.error("Неверный email или пароль");
      } else {
        message.error(`Ошибка входа: ${error.code}`);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (values) => {
    setAuthLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      message.success("Аккаунт успешно создан");
      onClose();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        message.error("Этот email уже зарегистрирован");
      } else {
        message.error(`Ошибка регистрации: ${error.code}`);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const tabItems = [
    {
      key: "login",
      label: "Вход",
      children: (
        <Form onFinish={handleLogin} layout="vertical" requiredMark={false}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Введите корректный email",
              },
            ]}
          >
            <Input placeholder="example@gmail.com" size="large" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, min: 6, message: "Минимум 6 символов" }]}
          >
            <Input.Password placeholder="Пароль" size="large" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={authLoading}
            className="rounded-lg font-medium mt-4 h-11 text-base border-none flex items-center justify-center"
          >
            Войти
          </Button>
        </Form>
      ),
    },
    {
      key: "register",
      label: "Регистрация",
      children: (
        <Form onFinish={handleRegister} layout="vertical" requiredMark={false}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Введите корректный email",
              },
            ]}
          >
            <Input placeholder="example@gmail.com" size="large" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, min: 6, message: "Минимум 6 символов" }]}
          >
            <Input.Password placeholder="Придумайте пароль" size="large" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={authLoading}
            className="rounded-lg font-medium mt-4 h-11 text-base border-none flex items-center justify-center"
          >
            Зарегистрироваться
          </Button>
        </Form>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#FF0033",
          colorBgBase: "#0f0f0f",
          colorBgContainer: "#1f1f1f",
          colorBorder: "#303030",
          colorText: "#ffffff",
        },
        components: {
          Form: {
            itemMarginBottom: 16,
          },
          Modal: {
            headerBg: "#0f0f0f",
            contentBg: "#0f0f0f",
            borderRadiusLG: 12,
          },
        },
      }}
    >
      <Modal
        title={null}
        open={isOpen}
        onCancel={onClose}
        footer={null}
        destroyOnHidden
        centered
        width={440}
        styles={{ body: { padding: 0 } }}
      >
        {}
        <div className="p-6 rounded-xl border-4 border-neutral-800 bg-[#0f0f0f] shadow-2xl shadow-black/80">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Авторизация</h2>
          </div>

          <Tabs defaultActiveKey="login" items={tabItems} className="mt-2" />
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AuthModal;
