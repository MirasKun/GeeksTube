import { useCallback, useMemo } from "react";
import { Modal, Tabs, Form, ConfigProvider, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUserTC, registerUserTC } from "../../store/thunks/auth";
import AuthForm from "./AuthForm";

const AuthModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const { loading: authLoading } = useSelector((state) => state.authSlice);

  const handleLogin = useCallback(
    (values) => {
      dispatch(loginUserTC(values)).then((result) => {
        if (!result.error) {
          loginForm.resetFields();
          onClose();
        }
      });
    },
    [dispatch, loginForm, onClose],
  );

  const handleRegister = useCallback(
    (values) => {
      dispatch(registerUserTC(values)).then((result) => {
        if (!result.error) {
          registerForm.resetFields();
          onClose();
        }
      });
    },
    [dispatch, registerForm, onClose],
  );

  const handleTabChange = useCallback(() => {
    loginForm.resetFields();
    registerForm.resetFields();
  }, [loginForm, registerForm]);

  const tabItems = useMemo(
    () => [
      {
        key: "login",
        label: "Вход",
        children: (
          <AuthForm
            form={loginForm}
            onFinish={handleLogin}
            authLoading={authLoading}
            isRegister={false}
          />
        ),
      },
      {
        key: "register",
        label: "Регистрация",
        children: (
          <AuthForm
            form={registerForm}
            onFinish={handleRegister}
            authLoading={authLoading}
            isRegister={true}
          />
        ),
      },
    ],
    [loginForm, registerForm, handleLogin, handleRegister, authLoading],
  );

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
          Form: { itemMarginBottom: 16 },
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
        <div className="p-6 rounded-xl border-4 border-neutral-800 bg-[#0f0f0f] shadow-2xl shadow-black/80">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Авторизация</h2>
          </div>
          <Tabs
            defaultActiveKey="login"
            items={tabItems}
            className="mt-2"
            onChange={handleTabChange}
          />
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AuthModal;
