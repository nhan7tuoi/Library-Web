import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="h-svh w-full flex justify-center items-center">
      {/* <div className="w-1/3">
        <Outlet/>
      </div> */}
                    <div className="flex items-center justify-center w-screen h-screen  p-4">
                <div className="bg-white shadow-lg rounded-2xl p-6 text-center max-w-md">
                  <h1 className="text-2xl font-bold text-gray-800">Chúng tôi đang bảo trì</h1>
                  <p className="text-gray-600 mt-2">
                    Trang web hiện đang được bảo trì để nâng cấp hệ thống. Vui lòng quay lại sau.
                  </p>
                  <div className="mt-4 animate-pulse">
                    <svg
                      className="w-12 h-12 text-yellow-500 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m0-4h.01M12 2a10 10 0 1 1-10 10A10 10 0 0 1 12 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm mt-4">Cảm ơn bạn đã kiên nhẫn!</p>
                  <a href="https://www.facebook.com/nhan7tuoi" className="text-blue-500 mt-4 text-ellipsis">
                  {'-> Liên hệ <-'}
                  </a>
                </div>
              </div>
    </div>
  );
};

export default AuthLayout;
