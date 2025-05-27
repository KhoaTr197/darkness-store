import { toast, ToastOptions } from "react-toastify";
import Toast from "./Toast";

interface ToastFn {
  success: (title: string, message: string, duration?: number) => void;
  warning: (title: string, message: string, duration?: number) => void;
  error: (title: string, message: string, duration?: number) => void;
  info: (title: string, message: string, duration?: number) => void;
}

let DEFAULT_TOAST_OPTIONS: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  theme: "colored",
  icon: false,
};

export const myToast: ToastFn = {
  success: (title, message, duration = 5000) => {
    toast.success(Toast, {
      ...DEFAULT_TOAST_OPTIONS,
      data: { title, message },
      autoClose: duration,
    });
  },
  warning: (title, message, duration = 5000) => {
    toast.warning(Toast, {
      ...DEFAULT_TOAST_OPTIONS,
      data: { title, message },
      autoClose: duration,
    });
  },
  error: (title, message, duration = 5000) => {
    toast.error(Toast, {
      ...DEFAULT_TOAST_OPTIONS,
      data: { title, message },
      autoClose: duration,
    });
  },
  info: (title, message, duration = 5000) => {
    toast.info(Toast, {
      ...DEFAULT_TOAST_OPTIONS,
      data: { title, message },
      autoClose: duration,
    });
  },

}