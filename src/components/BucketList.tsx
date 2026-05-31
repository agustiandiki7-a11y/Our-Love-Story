import React, { useState } from "react";
import { BucketItem, ThemeName } from "../types";
import { getThemeColors } from "./ThemeWrapper";
import { Check, Plus, Heart, Target, Sparkles, Award, Trash2 } from "lucide-react";

interface BucketListProps {
  theme: ThemeName;
  bucketList: BucketItem[];
  onAddItem: (item: BucketItem) => void;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export default function BucketList({
  theme,
  bucketList,
  onAddItem,
  onToggleItem,
  onDeleteItem
}: BucketListProps) {
  const colors = getThemeColors(theme);
  const [newTitle, setNewTitle] = useState("");

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddItem({
      id: `bucket-${Date.now()}`,
      title: newTitle.trim(),
      isCompleted: false
    });
    setNewTitle("");
  };

  // Math completion counts
  const total = bucketList.length;
  const completed = bucketList.filter((item) => item.isCompleted).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-6 pb-6 text-left">
      
      {/* SECTION HEADER */}
      <div>
        <h2 className="font-serif text-2xl font-bold tracking-tight">🌹 Our Bucket List</h2>
        <p className={`text-xs ${colors.subText}`}>Daftar impian romantis, petualangan, dan harapan jalinan kasih kalian.</p>
      </div>

      {/* DREAMS PROGRESS CONTAINER */}
      <div className={`p-5 rounded-3xl ${colors.cardBg} border shadow-sm relative overflow-hidden transition-all duration-300`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-400/5 rounded-full filter blur-xl" />
        
        <div className="flex justify-between items-center mb-2.5">
          <div className="flex items-center gap-1.5">
            <Target className="w-4.5 h-4.5 text-rose-500" />
            <span className="text-xs font-serif font-bold text-stone-900">Dreams Completed Together</span>
          </div>
          <span className="font-mono text-sm font-bold text-rose-500">{completed} / {total} ({percentage}%)</span>
        </div>

        {/* Outer progress track */}
        <div className="w-full h-3 bg-pink-50 dark:bg-[#1a152d] border border-pink-100 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="mt-4 flex items-center gap-2 bg-pink-50/35 border border-pink-100/30 p-2.5 rounded-xl text-[10px] text-stone-500 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
          <span>
            {percentage === 100 
              ? "Luar biasa! Semua mimpi cinta telah digapai berdua! 💍" 
              : `Terus berpegangan tangan ya sayang! Sisa ${total - completed} petualangan menanti kalian.`}
          </span>
        </div>
      </div>

      {/* QUICK ADD NEW ITEM FIELD */}
      <form onSubmit={handleAddItem} className="flex gap-2">
        <input
          type="text"
          placeholder="Tuliskan petualangan impian baru kalian..."
          value={newTitle}
          maxLength={80}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-white border border-stone-200 rounded-2xl text-xs focus:outline-none focus:border-rose-300"
        />
        <button
          type="submit"
          className={`px-4 rounded-2xl font-bold flex items-center justify-center ${colors.accentBg} shadow-sm active:scale-95 transition-all cursor-pointer`}
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </form>

      {/* BUCKET LIST ITEMS CHECKLISTS COLUMN */}
      <div className="space-y-2.5">
        {bucketList.map((item) => (
          <div
            key={item.id}
            onClick={() => onToggleItem(item.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
              item.isCompleted 
                ? "bg-rose-50/25 border-pink-100 opacity-80" 
                : "bg-white border-stone-200/50 hover:border-pink-300/30"
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Checkbox custom core */}
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                item.isCompleted 
                  ? "bg-rose-500 border-rose-500 text-white shadow-sm" 
                  : "border-stone-300 bg-white"
              }`}>
                {item.isCompleted && <Check className="w-4 h-4 stroke-[3px]" />}
              </div>

              <span className={`text-xs font-serif font-medium truncate ${
                item.isCompleted 
                  ? "line-through text-stone-400 capitalize" 
                  : "text-stone-850"
              }`}>
                {item.title}
              </span>
            </div>

            {/* Actions for trash */}
            <div className="flex items-center gap-2">
              {item.isCompleted && (
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#aa6f5e] uppercase bg-pink-100/30 px-1.5 py-0.5 rounded">
                  Achieved
                </span>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Hapus impian ini?")) {
                    onDeleteItem(item.id);
                  }
                }}
                className="p-1 text-stone-300 hover:text-red-500 active:scale-75 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}

        {bucketList.length === 0 && (
          <div className="p-8 text-center rounded-2xl border border-dashed text-stone-400">
            <span className="text-2xl">🌹</span>
            <p className="text-xs text-stone-500 mt-2 italic font-serif">Belum ada daftar impian cinta terekam.</p>
          </div>
        )}
      </div>

    </div>
  );
}
