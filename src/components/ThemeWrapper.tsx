import { ReactNode } from "react";
import { ThemeName } from "../types";

interface ThemeWrapperProps {
  theme: ThemeName;
  children: ReactNode;
}

export interface ThemeColors {
  mainBg: string;
  textColor: string;
  subText: string;
  cardBg: string;
  accentBg: string;
  accentText: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  inputBg: string;
  navActive: string;
  navInactive: string;
  glowColor: string;
}

export const getThemeColors = (theme: ThemeName): ThemeColors => {
  switch (theme) {
    case "elegant-white":
      return {
        mainBg: "bg-gradient-to-tr from-[#fbfbfa] via-[#f7f7f6] to-[#ebdcd5]",
        textColor: "text-[#2c2724]",
        subText: "text-[#70635c]",
        cardBg: "bg-white/90 border-[#eae4e0]/50 shadow-sm",
        accentBg: "bg-[#bfa594] hover:bg-[#ad9382] text-white",
        accentText: "text-[#9d7d66]",
        badgeBg: "bg-[#f5ece7]",
        badgeBorder: "border-[#eaddd5]",
        badgeText: "text-[#8e6e58]",
        inputBg: "bg-[#faf9f8]",
        navActive: "text-[#8e6e58]",
        navInactive: "text-[#b2a69f]",
        glowColor: "rgba(191, 165, 148, 0.2)"
      };
    case "midnight-love":
      return {
        mainBg: "bg-gradient-to-tr from-[#020308] via-[#0b0c16] to-[#1a152d]",
        textColor: "text-[#f1f0f5]",
        subText: "text-[#a4a0ba]",
        cardBg: "bg-[#121324]/80 border-[#2a2846]/60 shadow-lg shadow-black/10",
        accentBg: "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white",
        accentText: "text-[#d1c8f7]",
        badgeBg: "bg-[#181a3a]",
        badgeBorder: "border-[#2d2f62]",
        badgeText: "text-purple-300",
        inputBg: "bg-[#0b0c16]",
        navActive: "text-purple-300",
        navInactive: "text-[#55527a]",
        glowColor: "rgba(168, 85, 247, 0.3)"
      };
    case "lavender-dream":
      return {
        mainBg: "bg-gradient-to-tr from-[#f5f3ff] via-[#ede9fe] to-[#fae8ff]",
        textColor: "text-[#3b3252]",
        subText: "text-[#73688a]",
        cardBg: "bg-white/85 border-[#e0dafc]/50 shadow-sm",
        accentBg: "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white",
        accentText: "text-[#8b5cf6]",
        badgeBg: "bg-[#f3f0ff]",
        badgeBorder: "border-[#ddd4fc]",
        badgeText: "text-purple-700",
        inputBg: "bg-[#faf9ff]",
        navActive: "text-[#8b5cf6]",
        navInactive: "text-[#9f96b6]",
        glowColor: "rgba(139, 92, 246, 0.2)"
      };
    case "rose-gold-premium":
      return {
        mainBg: "bg-gradient-to-tr from-[#fbf5f2] via-[#f7e3d9] to-[#ebd2c7]",
        textColor: "text-[#4e3831]",
        subText: "text-[#8d7269]",
        cardBg: "bg-white/80 border-[#f2ded5]/60 shadow-sm",
        accentBg: "bg-[#c39081] hover:bg-[#b58071] text-white",
        accentText: "text-[#c39081]",
        badgeBg: "bg-[#fdf7f5]",
        badgeBorder: "border-[#eed6cd]",
        badgeText: "text-[#aa6f5e]",
        inputBg: "bg-[#fdfcfb]",
        navActive: "text-[#aa6f5e]",
        navInactive: "text-[#cbb3a9]",
        glowColor: "rgba(195, 144, 129, 0.2)"
      };
    case "pink-romance":
    default:
      return {
        mainBg: "bg-[#FCF8F6]",
        textColor: "text-gray-800",
        subText: "text-gray-500",
        cardBg: "bg-white border-[#F3E8E2]/60 shadow-sm",
        accentBg: "bg-[#FBCFE8] hover:bg-[#F9A8D4] text-white transition-all duration-300",
        accentText: "text-[#D68D9A]",
        badgeBg: "bg-[#FFF4F2]",
        badgeBorder: "border-[#F3E8E2]",
        badgeText: "text-[#E9967A]",
        inputBg: "bg-white",
        navActive: "text-[#D68D9A]",
        navInactive: "text-gray-400 hover:text-[#D68D9A]",
        glowColor: "rgba(251, 207, 232, 0.2)"
      };
  }
};

export default function ThemeWrapper({ theme, children }: ThemeWrapperProps) {
  const colors = getThemeColors(theme);
  
  return (
    <div className={`min-h-screen transition-colors duration-500 pb-20 ${colors.mainBg} ${colors.textColor}`}>
      {children}
    </div>
  );
}
