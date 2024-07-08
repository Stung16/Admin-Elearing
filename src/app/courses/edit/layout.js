"use client";
import Providers from "@/redux/Providers";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import SideBarCourse from "@/components/Addcourse/sideBarCourse";

const layoutCourse = ({ children }) => {
  return (
    <NextUIProvider>
      <Providers>
        <div className="min-h-screen flex  ">
          <SideBarCourse />
          <div className="app-content w-full py-0 pr-10 pl-5 overflow-x-hidden overflow-y-auto scroll-smooth">
            {children}
          </div>
        </div>
      </Providers>
    </NextUIProvider>
  );
};

export default layoutCourse;
