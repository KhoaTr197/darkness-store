"use client"

import { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import CustomComponentsProps from "@/_lib/types/component";

const Banner = ({
  id,
  className,
  children,
  gradient = {
    from: "#000",
    to: "#000"
  },
}: CustomComponentsProps & {
  gradient?: {
    from: string;
    to: string
  }
}) => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const handleBannerClose = () => {
    setIsBannerVisible(!isBannerVisible)
  }

  return (
    <div id={id} className={`${isBannerVisible ? 'fixed' : 'hidden'} top-[var(--bannerHeight)] left-0 right-0 z-50 isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1`}>
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {children}
      </div>
      <div className="flex flex-1 justify-end">
        <button onClick={handleBannerClose} type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
          <HiMiniXMark aria-hidden="true" className="size-5 text-gray-900" />
        </button>
      </div>
    </div>
  )
}
export default Banner