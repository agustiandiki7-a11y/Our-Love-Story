import React, { useState } from "react";
import { TimelineEvent, ThemeName } from "../types";
import { getThemeColors } from "./ThemeWrapper";
import { Calendar, Heart, MessageSquare, Compass, Gift, Star, Award, Sparkles, Plus, Image, Trash2, X } from "lucide-react";

interface TimelineProps {
  theme: ThemeName;
  timeline: TimelineEvent[];
  onAddEvent: (event: TimelineEvent) => void;
  onDeleteEvent: (id: string) => void;
}

export default function Timeline({
  theme,
  timeline,
  onAddEvent,
  onDeleteEvent
}: TimelineProps) {
  const colors = getThemeColors(theme);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [iconType, setIconType] = useState<'chat' | 'heart' | 'ring' | 'plane' | 'cake' | 'star' | 'camera'>('heart');

  // Map icons helper
  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'chat':
        return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      case 'ring':
        return <Award className="w-4 h-4 text-yellow-500 animate-spin" style={{ animationDuration: '6s' }} />;
      case 'plane':
        return <Compass className="w-4 h-4 text-blue-500" />;
      case 'cake':
        return <Gift className="w-4 h-4 text-purple-500" />;
      case 'star':
        return <Star className="w-4 h-4 text-amber-500" />;
      case 'camera':
        return <Plus className="w-4 h-4 text-indigo-500" />;
      case 'heart':
      default:
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />;
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Harap isikan judul dan deskripsi momen cinta.");
      return;
    }

    const newEv: TimelineEvent = {
      id: `ev-${Date.now()}`,
      title,
      date,
      description,
      imageUrl: imageUrl.trim() ? imageUrl.trim() : undefined,
      iconType
    };

    onAddEvent(newEv);
    setIsAdding(false);

    // Reset fields
    setTitle("");
    setDescription("");
    setImageUrl("");
    setIconType("heart");
  };

  // Sort events chronologically by date
  const sortedEvents = [...timeline].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6 pb-6">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold tracking-tight">🕰 Timeline Perjalanan</h2>
          <p className={`text-xs ${colors.subText}`}>Nostalgia milestones indah cinta kita dari waktu ke waktu.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className={`p-3 rounded-full ${colors.accentBg} shadow-md active:scale-95 transition-all cursor-pointer`}
          title="Tambah Milestones Baru"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {sortedEvents.length === 0 ? (
        <div className={`p-8 rounded-2xl ${colors.cardBg} border border-dashed text-center`}>
          <span className="text-2xl">🕰</span>
          <p className="text-xs text-stone-500 mt-2 font-serif italic">Belum ada linimasa terdaftar. Klik "+" untuk mengabadikan momen pertama kalian!</p>
        </div>
      ) : (
        /* VERTICAL TIMELINE CONTAINER */
        <div className="relative pl-6 border-l-2 border-pink-100/60 dark:border-indigo-900/40 ml-4 space-y-8 py-3 animate-fade-in text-left">
          {sortedEvents.map((ev, index) => (
            <div key={ev.id} className="relative group">
              
              {/* Dot Icon indicator on the line */}
              <div className="absolute -left-[37px] top-1.5 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-rose-300 shadow-sm flex items-center justify-center z-10 scale-100 group-hover:scale-110 active:scale-90 transition-all">
                {getMilestoneIcon(ev.iconType)}
              </div>

              {/* Card body */}
              <div className={`rounded-3xl p-5 border ${colors.cardBg} shadow-sm group-hover:shadow hover:border-pink-300/40 transition-all relative`}>
                
                {/* Trash option */}
                <button
                  onClick={() => {
                    if (confirm("Hapus momen berharga ini dari catatan sejarah hubungan?")) {
                      onDeleteEvent(ev.id);
                    }
                  }}
                  className="absolute top-4 right-4 text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Event header */}
                <span className="text-[10px] font-mono font-bold tracking-wider text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md">
                  Momen #{index + 1}
                </span>

                <h3 className="font-serif text-base font-bold text-stone-900 mt-2">{ev.title}</h3>

                <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-mono mt-1 mb-3">
                  <Calendar className="w-3 h-3 text-rose-400" />
                  <span>{ev.date}</span>
                </div>

                {ev.imageUrl && (
                  <div className="rounded-xl overflow-hidden shadow-inner max-h-48 mb-3.5 border">
                    <img src={ev.imageUrl} alt={ev.title} className="w-full object-cover" />
                  </div>
                )}

                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {ev.description}
                </p>

              </div>
              
            </div>
          ))}
        </div>
      )}

      {/* OVERLAY ADD TIMELINE MODAL */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 border border-pink-100 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => setIsAdding(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <span className="text-2xl">🕰</span>
              <h3 className="font-serif text-lg font-bold mt-1 text-rose-500">Abadikan Sejarah Cinta</h3>
              <p className="text-[11px] text-stone-500">Tambahkan batu pijakan / milestone jalinan kasih sayang.</p>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              
              {/* Type Category Icon */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Simbol Milestone / Ikon:</label>
                <div className="grid grid-cols-7 gap-1">
                  {[
                    { id: 'chat', emoji: '💬', title: 'First Chat' },
                    { id: 'heart', emoji: '❤️', title: 'First Sight' },
                    { id: 'ring', emoji: '💍', title: 'Jadian/Tunangan' },
                    { id: 'plane', emoji: '✈️', title: 'Liburan' },
                    { id: 'cake', emoji: '🎂', title: 'Hadiah/Ultah' },
                    { id: 'star', emoji: '✨', title: 'Impian Bersama' },
                    { id: 'camera', emoji: '📸', title: 'Foto Spesial' }
                  ].map((ic) => (
                    <button
                      key={ic.id}
                      type="button"
                      onClick={() => setIconType(ic.id as any)}
                      title={ic.title}
                      className={`py-2 rounded-lg border text-base flex flex-col items-center justify-center transition-all cursor-pointer ${
                        iconType === ic.id 
                          ? 'border-rose-400 bg-rose-50 ring-1 ring-rose-300' 
                          : 'border-stone-100 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <span>{ic.emoji}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Field */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Nama Kejadian</label>
                <input
                  type="text"
                  placeholder="Contoh: Kejutan Valentine, Makan Malam..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={55}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Tanggal Terjadi</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300 font-mono"
                  required
                />
              </div>

              {/* Image URL optional */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Foto Memuat URL (Opsional)</label>
                <input
                  type="url"
                  placeholder="Masukkan URL foto terindah jika ada"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Kilas Cerita / Nostalgia Singkat</label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan detail romantis dari sudut pandang kalian berdua: tawa, canda, dingin angin atau debaran jantung siang jadian..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300 leading-relaxed"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl font-semibold shadow hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                Abadikan di Sejarah Hubungan 🌹
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
