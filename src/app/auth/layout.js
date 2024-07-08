"use client";
import Providers from "@/redux/Providers";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

const layoutAuth = ({ children }) => {
  return (
    <NextUIProvider>
      <Providers>{children}</Providers>
      <Toaster />
    </NextUIProvider>
  );
};

export default layoutAuth;
