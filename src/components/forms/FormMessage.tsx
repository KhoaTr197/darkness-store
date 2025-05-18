import React from 'react'

export type FormMessageProps = {
  type: "success" | "error";
  message: string;
};
/**
 * @component
 * @description
 * Renders a form message with a success or error style.
 *
 * @param {string} type - Type of the message (success or error).
 * @param {string} message - Message to display.
 * @returns {React.ReactNode} - Rendered form message.
 */
const FormMessage = ({
  type,
  message
}: FormMessageProps) => {
  const bgStyle = {
    success: "bg-green-500",
    error: "bg-red-500"
  };

  return (
    <div
      className={"w-full p-4 rounded-lg mb-6 font-semibold tracking-wider text-white " + bgStyle[type]}
    >
      {message}
    </div>
  )
}

export default FormMessage;