import { useEffect, useState } from "react";
import { ThemeColors } from "./ThemeWrapper";

interface LoveCounterProps {
  anniversaryDate: string;
  colors: ThemeColors;
}

interface TimePassed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function LoveCounter({ anniversaryDate, colors }: LoveCounterProps) {
  const [timePassed, setTimePassed] = useState<TimePassed>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(anniversaryDate + "T00:00:00");
      const now = new Date();
      let diffMs = now.getTime() - start.getTime();

      if (diffMs < 0) {
        setTimePassed({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Exact division math for years & months
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();

      if (days < 0) {
        months -= 1;
        // Get total days in the previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      // Hours, minutes, seconds from the actual current clock
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setTimePassed({
        years,
        months,
        days,
        hours,
        minutes,
        seconds
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [anniversaryDate]);

  return (
    <div className={`rounded-[32px] p-6 sm:p-8 ${colors.cardBg} border relative overflow-hidden transition-all duration-300 shadow-sm`}>
      {/* Glassmorphism decorative blur circles */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#FBCFE8] opacity-20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#D4C4FB] opacity-20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <span className={`text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold ${colors.accentText} mb-5`}>Together Forever</span>
        
        <div className="flex items-baseline justify-center gap-3 sm:gap-5">
          <div className="text-center">
            <span className="text-4xl sm:text-5xl font-serif text-stone-800 dark:text-stone-100 font-semibold">{timePassed.years.toString().padStart(2, '0')}</span>
            <p className="text-[9px] sm:text-[10px] text-stone-400 uppercase tracking-widest mt-1.5">Year{timePassed.years !== 1 ? 's' : ''}</p>
          </div>
          <div className="text-center">
            <span className="text-4xl sm:text-5xl font-serif text-stone-800 dark:text-stone-100 font-semibold">{timePassed.months.toString().padStart(2, '0')}</span>
            <p className="text-[9px] sm:text-[10px] text-stone-400 uppercase tracking-widest mt-1.5 font-sans">Month{timePassed.months !== 1 ? 's' : ''}</p>
          </div>
          <div className="text-center">
            <span className="text-4xl sm:text-5xl font-serif text-stone-800 dark:text-stone-100 font-semibold">{timePassed.days.toString().padStart(2, '0')}</span>
            <p className="text-[9px] sm:text-[10px] text-stone-400 uppercase tracking-widest mt-1.5 font-sans">Day{timePassed.days !== 1 ? 's' : ''}</p>
          </div>
          <div className="text-center">
            <span className="text-4xl sm:text-5xl font-serif text-stone-800 dark:text-stone-100 font-semibold">{timePassed.hours.toString().padStart(2, '0')}</span>
            <p className="text-[9px] sm:text-[10px] text-stone-400 uppercase tracking-widest mt-1.5 font-sans">Hour{timePassed.hours !== 1 ? 's' : ''}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-stone-400">
          <span>{timePassed.minutes.toString().padStart(2, '0')}m</span>
          <span>:</span>
          <span className="animate-pulse text-rose-400 font-bold">{timePassed.seconds.toString().padStart(2, '0')}s</span>
          <span className="text-stone-300">|</span>
          <span>sejak 18 Okt 2024</span>
        </div>

        <p className={`mt-5 italic font-serif ${colors.badgeText} text-md sm:text-lg text-center`}>
          "And still counting our forever..."
        </p>
      </div>
    </div>
  );
}
