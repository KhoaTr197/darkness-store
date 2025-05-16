"use client";

import { useEffect, useRef } from "react";

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  text?: string;
  bgColor?: string;
  textColor?: string;
}

const PlaceholderImage = ({
  width = 500,
  height = 500,
  text = "Product Image",
  bgColor = "#e2e8f0",
  textColor = "#334155"
}: PlaceholderImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw text
    ctx.fillStyle = textColor;
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2);

    // Draw border
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);
  }, [width, height, text, bgColor, textColor]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-auto"
    />
  );
};

export default PlaceholderImage; 