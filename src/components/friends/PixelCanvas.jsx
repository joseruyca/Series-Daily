"use client";

import { useEffect, useRef, useState } from "react";

const PIXEL_STEPS = [34, 26, 18, 12, 8, 1];

export default function PixelCanvas({ src, attemptsUsed, reveal }) {
  const canvasRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !src) return;

    const ctx = canvas.getContext("2d");
    const image = new window.Image();

    image.onload = () => {
      setHasError(false);

      const width = 900;
      const height = Math.round(width * (image.naturalHeight / image.naturalWidth));

      canvas.width = width;
      canvas.height = height;

      const pixelSize = reveal
        ? 1
        : PIXEL_STEPS[Math.min(attemptsUsed, PIXEL_STEPS.length - 1)];

      ctx.clearRect(0, 0, width, height);

      if (pixelSize === 1) {
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(image, 0, 0, width, height);
        return;
      }

      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");

      tempCanvas.width = Math.max(1, Math.floor(width / pixelSize));
      tempCanvas.height = Math.max(1, Math.floor(height / pixelSize));

      tempCtx.drawImage(image, 0, 0, tempCanvas.width, tempCanvas.height);

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, width, height);
    };

    image.onerror = () => {
      setHasError(true);
    };

    image.src = src;
  }, [src, attemptsUsed, reveal]);

  if (hasError) {
    return (
      <div className="pixel-fallback">
        Añade la imagen diaria en public/pixel/friends para ver este modo.
      </div>
    );
  }

  return <canvas ref={canvasRef} className="pixel-canvas" />;
}