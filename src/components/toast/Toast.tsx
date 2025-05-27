"use client";

import React, { useEffect, useState } from "react";
import { TOAST_ICONS, TOAST_THEME } from "./config";
import { ToastContentProps } from "react-toastify/unstyled";
// -----------------------

interface MyToastProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

const Toast = ({ closeToast, data, toastProps }: ToastContentProps<MyToastProps>) => {
  const Icon = TOAST_ICONS[toastProps.type];
  return (
    <div className="w-full">
      <div className="flex w-full gap-2">
        <div className="pt-1">{Icon && React.cloneElement(Icon, { size: 24 })}</div>
        <div className="flex-1">
          <h3 className="font-semibold capitalize">{data.title}</h3>
          <p className="text-sm break-words">{data.message}</p>
        </div>
        <button
          onClick={closeToast}
          className="ml-2 text-white hover:text-gray-600 self-start"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Toast;