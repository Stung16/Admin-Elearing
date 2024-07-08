"use client";
import Providers from "@/redux/Providers";
import React from "react";
import "../../styles/main.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/SideBar";

const layoutAdmin = ({ children }) => {
  return (
    <NextUIProvider>
      <Providers>
        <div className="w-screen h-screen">
          <SideBar />
          <div className={`w-[calc(100%-256px)]   absolute  top-0 right-0`}>
            <Header />
            <div className="px-7 pt-5">{children}</div>
          </div>
        </div>
      </Providers>
    </NextUIProvider>
  );
};

export default layoutAdmin;
