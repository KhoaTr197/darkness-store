

import { FaCircleCheck, FaTriangleExclamation, FaCircleXmark, FaCircleInfo } from "react-icons/fa6";

export const TOAST_ICONS = {
  success: <FaCircleCheck />,
  warning: <FaTriangleExclamation />,
  error: <FaCircleXmark />,
  info: <FaCircleInfo />,
  default: <FaCircleInfo />,
}

export const TOAST_THEME = {
  default: "bg-gray-500",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
  info: "bg-blue-500",
}