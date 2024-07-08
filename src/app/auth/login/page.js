"use client";
import { login } from "@/services/auth.service";
import React, { useState } from "react";
import { usersSlice } from "@/redux/slice/usersSlice";
const { upadateLoading,upadateEmail } = usersSlice.actions;
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/Loadings/Loading";

const page = () => {
  const router = useRouter();
  const loading = useSelector((state) => state.usersData.loading);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(upadateLoading(true));
      const { data } = await login(form);
      if (data.status === 200) {
        dispatch(upadateEmail(form.email))
        return router.push("/auth/verification");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(upadateLoading(false));
      setForm({
        email: "",
        password: "",
      });
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md w-[500px]">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
            Welcome Back!
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center mt-10 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default page;
