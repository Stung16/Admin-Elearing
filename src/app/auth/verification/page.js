"use client";
import Cookies from "js-cookie";
import React, { useEffect, useLayoutEffect, useState } from "react";

import { FaAngleLeft } from "react-icons/fa6";
import Link from "next/link";
import { reCode, verifycode } from "@/services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { usersSlice } from "@/redux/slice/usersSlice";
import Loading from "@/components/Loadings/Loading";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import Client from "@/config/Client";
import { EmailCustom } from "@/utils/helpers";
import toast from "react-hot-toast";

const { upadateLoading } = usersSlice.actions;

const verificationPage = () => {
  const router = useRouter();
  const loading = useSelector((state) => state.usersData.loading);
  const userName = useSelector((state) => state.usersData.email);
  const dispatch = useDispatch();
  const [canClick, setCanClick] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [form, setForm] = useState({
    code: "",
  });

  useEffect(() => {
    let timer = null;
    if (!canClick) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(timer);
            setCanClick(true);
            return 60;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [canClick]);

  const handleClick = async () => {
    if (!canClick) {
      return;
    } else {
      try {
        const res = await reCode({ email: userName });
        if (res?.data?.status !== 200) {
          toast.error("An error has occurred!!!Please check or log in again!");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error has occurred!!!Please check or log in again!");
      }
    }
    setCanClick(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(upadateLoading(true));
      const { data } = await verifycode(form);
      if (data.status === 200) {
        Cookies.set("accessToken", data?.data?.accessToken, {
          expires: 60 * 60 * 24 * 7,
        });
        Cookies.set("refreshToken", data?.data?.refreshToken, {
          expires: 60 * 60 * 24 * 30,
        });
        Client.setToken(data?.data?.accessToken);
        return router.push("/users");
      }
    } catch (error) {
    } finally {
      dispatch(upadateLoading(false));
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!userName) {
      return router.push("/auth/login");
    }
  }, [userName, router, dispatch]);
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#e1e1e1] dark:bg-gray-950">
      <div className="dark:bg-gray-900  py-20 px-3 rounded-lg relative">
        <Link href={"/auth/login"} className="absolute top-5">
          <FaAngleLeft className="translate-x-1 w-9 h-9 text-white p-2 rounded-full bg-[#4a9aef]" />
        </Link>
        <div className="container mx-auto">
          <div className="max-w-[600px] mx-auto md:max-w-[500px]">
            <div className="w-full">
              <div className=" h-64 py-3 rounded text-center">
                <h1 className="text-2xl font-bold text-white">
                  Xác minh 2 bước
                </h1>
                <div className="flex flex-col mt-4 px-10">
                  <span className="text-white">
                    Chúng tôi vừa gửi một tin nhắn văn bản có một mã xác minh
                    tới email:
                  </span>
                  <span className="font-bold text-white">
                    {EmailCustom(userName)}
                  </span>
                </div>
                <div
                  id="otp"
                  className="flex flex-row justify-center text-center w-[300px] mx-auto mt-5"
                >
                  <form onSubmit={handleSubmit}>
                    <div className="flex items-center">
                      <input
                        className="m-2 border h-10  p-3 rounded outline-none"
                        type="password"
                        name="code"
                        onChange={handleChange}
                        placeholder="Nhập mã xác thực"
                      />
                      <Button type="submit" className="bg-[#757575] text-white">
                        Xác nhận
                      </Button>
                    </div>
                  </form>
                </div>
                <div className="flex justify-center text-center mt-5 ">
                  <div
                    onClick={handleClick}
                    disabled={!canClick}
                    className={`flex items-center font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 select-none border px-3 py-2 ${
                      canClick
                        ? "cursor-pointer"
                        : " cursor-not-allowed bg-indigo-400 "
                    }`}
                  >
                    {canClick ? "Gửi lại mã" : `Gửi lại mã sau ${countdown}s`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default verificationPage;
