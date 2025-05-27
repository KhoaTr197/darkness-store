import React from "react";

interface LoaderProps {
  className?: string;
  size?: number;
}

const Loader = ({
  className = "",
  size = 32,
}: LoaderProps) => {
  return (
    <span
      className={`inline-block ${className} size-[${size}px]`}
      role="status"
      aria-label="Loading"
    >
      <svg
        viewBox="0 0 50 50"
        className={`block animate-spin motion-safe:animate-spin motion-reduce:animate-spin`}
        width={size}
        height={size}
      >
        <circle
          className="opacity-20"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#fff"
          strokeWidth="6"
        />
        <path
          className="opacity-100"
          fill="none"
          d="M25 5a20 20 0 0 1 20 20"
          stroke="#fff"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};

export default Loader;