import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex } from "antd";
import { IMAGES } from "../../constants";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { notification, Space } from "antd";
import { login, loginTemp, loginWithMs } from "./api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { openNotificationWithIcon } from "../../helper";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useDispatch } from "react-redux";

const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const { instance } = useMsal();
  console.log(email);

  const onFinish = async (values) => {
    try {
      const response = await loginTemp(values.username, values.password);
      console.log(response.data.user);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.accessToken);

      navigate("/home");
    } catch (error) {
      openNotificationWithIcon(
        api,
        "Đăng nhập không thành công",
        error.response.data.error.message
      );
    }
  };
  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup({
        scopes: ["User.Read"],
        prompt: "select_account",
      });
      
      const loginResponse = await loginWithMs(
        response.account.username,
        response.uniqueId
      );
      console.log(loginResponse);
      
      const user = loginResponse.data.user;

      if (user.status == "active") {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", loginResponse.data.accessToken);
        navigate("/home");
      } else if (user.status == "pending")
        navigate("/update-user", {
          state: {
            user: user,
            name: response.account.name,
            accessToken: loginResponse.data.accessToken,
          },
        });
    } catch (error) {
      console.log("Login failed:", error);
    }
  };
  const handleCLose = () => {
    setIsOpen(false);
  };
  return (
    <>
      {contextHolder}
      {
        isOpen ? (
          <div className="p-10">
        <div className="border flex flex-col justify-center items-center space-y-5 shadow-2xl rounded-xl bg-white">
          <div>
            <img src={IMAGES.LOGO} width={250} />
          </div>
          <div>
            <Form
              name="login"
              initialValues={{
                remember: true,
              }}
              style={{
                maxWidth: 500,
                width: 300,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                initialValue={email}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Form.Item>
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Link to={"/update-password"}>
                    Quên Mật khẩu?
                  </Link>
                  <Link to={"/register"} className="font-bold">
                    Đăng ký
                  </Link>
                </Flex>
              </Form.Item>

              <Form.Item className="mb-3">
                <Button block type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
              <p className="mb-3 font-medium">Hoặc</p>
              <Form.Item>
                <Button block type="primary" onClick={handleLogin}>
                  Đăng nhập với Outlook{" "}
                  <span className="text-xl">
                    {PiMicrosoftOutlookLogoFill()}
                  </span>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
        ) : (
          <div className="bg-gray-100">
              <div className="flex flex-col items-center justify-center bg-white p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Chào bạn, đây là đồ án của sinh viên: Phạm Đức Nhân - Nguyễn Nhật Sang</h1>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full justify-center">
                  <a
                    onClick={() => setIsOpen(true)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition flex items-center justify-center w-full sm:w-auto text-center"
                  >
                    Ghé thăm Website
                  </a>
                  <a
                    href="https://lib.iuh.edu.vn/thong-bao/thong-bao-v-v-bao-tri-thu-vien-so-dh-cong-nghiep-tp-ho-chi-minh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition flex items-center justify-center w-full sm:w-auto text-center"
                  >
                    Truy cập Trang thư viện chính thức
                  </a>
                </div>
              </div>
              </div>
        )
      }
    </>
  );
};

export default Login;
