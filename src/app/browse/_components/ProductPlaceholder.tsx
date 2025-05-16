"use client";

import { useEffect, useRef } from 'react';

interface ProductPlaceholderProps {
  width?: number;
  height?: number;
  text?: string;
  bgColor?: string;
  textColor?: string;
}

const ProductPlaceholder = ({
  width = 300,
  height = 300,
  text = "Product Image",
  bgColor = "#1a1c1e",
  textColor = "#8f00ff"
}: ProductPlaceholderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw border
    ctx.strokeStyle = 'rgba(143, 0, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // Draw diagonal lines pattern
    ctx.strokeStyle = 'rgba(143, 0, 255, 0.05)';
    ctx.lineWidth = 1;
    
    const gap = 20;
    for (let i = -width; i < width * 2; i += gap) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + width, height);
      ctx.stroke();
    }

    // Draw a circle with the product initial
    const centerX = width / 2;
    const centerY = height / 2 - 20;
    const radius = 40;

    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(143, 0, 255, 0.1)';
    ctx.fill();
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw product initial
    const initial = text.charAt(0);
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initial, centerX, centerY);

    // Draw product name
    const maxWidth = width - 40;
    const words = text.split(' ');
    let line = '';
    const lines = [];
    
    // Break text into lines that fit
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && i > 0) {
        lines.push(line);
        line = words[i] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    
    // Render text lines
    ctx.font = '14px Arial';
    ctx.fillStyle = textColor;
    
    let y = centerY + radius + 30;
    for (let i = 0; i < lines.length && i < 2; i++) {
      ctx.fillText(lines[i], centerX, y);
      y += 20;
    }
    
    // If there are more lines than can fit, add ellipsis
    if (lines.length > 2) {
      ctx.fillText('...', centerX, y);
    }

  }, [width, height, text, bgColor, textColor]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-cover"
      style={{ aspectRatio: width / height }}
    />
  );
};

export default ProductPlaceholder; 