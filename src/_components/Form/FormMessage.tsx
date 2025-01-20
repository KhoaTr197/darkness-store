import React from 'react'

export type FormMessageProps = {
  type: "success" | "error";
  message: string;
}

const FormMessage = ({
  type,
  message
}: FormMessageProps) => {
  const bgStyle = {
    success: "bg-green-500",
    error: "bg-red-500"
  }

  return (
    <div
      className={"w-full p-4 rounded-lg mb-6 font-semibold tracking-wider text-white " + bgStyle[type]}
    >
      {message}
    </div>
  )
}

export default FormMessage