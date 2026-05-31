interface AudioWaveProps {
  isPlaying: boolean;
  color: string;
}

export default function AudioWave({ isPlaying, color }: AudioWaveProps) {
  const bars = Array.from({ length: 18 });

  return (
    <div className="flex items-end gap-1 h-12 px-4 justify-center">
      {bars.map((_, i) => {
        // Create custom staggered heights and speeds
        const randomHeight = 10 + Math.random() * 30;
        const animationDelay = `${i * 0.1}s`;
        const animationDuration = `${0.6 + Math.random() * 0.8}s`;

        return (
          <div
            key={i}
            className="w-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: color,
              height: isPlaying ? `${randomHeight}px` : "4px",
              animation: isPlaying ? "wave 1.2s ease-in-out infinite" : "none",
              animationDelay: isPlaying ? animationDelay : "0s",
              animationDuration: isPlaying ? animationDuration : "1s",
            }}
          />
        );
      })}

      <style>{`
        @keyframes wave {
          0%, 100% {
            height: 6px;
          }
          50% {
            height: 36px;
          }
        }
      `}</style>
    </div>
  );
}
