import React, { useEffect, useState } from "react";

interface HeartItem {
  id: number;
  left: string;
  delay: string;
  duration: string;
  scale: number;
  opacity: number;
  size: string;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartItem[]>([]);

  useEffect(() => {
    // Generate initial set of romantic hearts
    const initialHearts: HeartItem[] = Array.from({ length: 15 }).map((_, i) => createHeart(i));
    setHearts(initialHearts);

    // Slowly cycle hearts to keep background alive
    const interval = setInterval(() => {
      setHearts((prev) => {
        // Keep to max 25 elements to prevent memory/cpu issues
        const kept = prev.slice(-20);
        return [...kept, createHeart(Date.now())];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const createHeart = (id: number): HeartItem => {
    const leftVal = Math.random() * 95; // 0% to 95%
    const delayVal = Math.random() * 5; // 0s to 5s
    const durationVal = 10 + Math.random() * 15; // 10s to 25s
    const scaleVal = 0.5 + Math.random() * 1.0; // 0.6 to 1.5
    const opacityVal = 0.2 + Math.random() * 0.4; // 0.2 to 0.6
    const sizes = ["14px", "18px", "22px", "26px"];
    const sizeVal = sizes[Math.floor(Math.random() * sizes.length)];
    
    return {
      id,
      left: `${leftVal}%`,
      delay: `${delayVal}s`,
      duration: `${durationVal}s`,
      scale: scaleVal,
      opacity: opacityVal,
      size: sizeVal,
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={
            {
              "--heart-left": heart.left,
              "--heart-delay": heart.delay,
              "--heart-duration": heart.duration,
              "--heart-scale": heart.scale,
              "--heart-opacity": heart.opacity,
              "--heart-size": heart.size,
            } as React.CSSProperties
          }
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
