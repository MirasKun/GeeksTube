import { Form, Input, Button } from "antd";

const AuthForm = ({ form, onFinish, authLoading, isRegister }) => {
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
    >
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
        rules={[
          { required: true, message: "Введите пароль" },
          ...(isRegister ? [{ min: 6, message: "Минимум 6 символов" }] : []),
        ]}
      >
        <Input.Password
          placeholder={isRegister ? "Придумайте пароль" : "Пароль"}
          size="large"
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        loading={authLoading}
        className="rounded-lg font-medium mt-4 h-11 text-base border-none flex items-center justify-center"
      >
        {isRegister ? "Зарегистрироваться" : "Войти"}
      </Button>
    </Form>
  );
};

export default AuthForm;
