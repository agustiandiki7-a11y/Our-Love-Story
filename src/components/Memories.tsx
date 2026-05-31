import React, { useState } from "react";
import { Memory, MoodType, ThemeName } from "../types";
import { getThemeColors } from "./ThemeWrapper";
import { Plus, MapPin, Calendar, Heart, MessageSquare, Star, Smile, Sparkles, X, ChevronRight, Bookmark } from "lucide-react";

interface MemoriesProps {
  theme: ThemeName;
  memories: Memory[];
  onAddMemory: (memory: Memory) => void;
  onUpdateMemory: (updated: Memory) => void;
  onDeleteMemory: (id: string) => void;
}

// Aesthetic Unsplash presets for instantly gorgeous romantic uploads
const IMAGE_PRESETS = [
  { name: "Piknik Berdua", url: "https://images.unsplash.com/photo-1464518017462-78c742223594?auto=format&fit=crop&q=80&w=800" },
  { name: "Makan Malam Lilin", url: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800" },
  { name: "Pegangan Tangan", url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800" },
  { name: "Menatap Senja", url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800" },
  { name: "Jalan Rintik Hujan", url: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800" },
  { name: "Camping Bawah Bintang", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800" }
];

export default function Memories({
  theme,
  memories,
  onAddMemory,
  onUpdateMemory,
  onDeleteMemory
}: MemoriesProps) {
  const colors = getThemeColors(theme);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState("");
  const [story, setStory] = useState("");
  const [mood, setMood] = useState<MoodType>("Romantic");
  const [imageUrl, setImageUrl] = useState(IMAGE_PRESETS[0].url);
  const [isCustomUrl, setIsCustomUrl] = useState(false);
  const [customUrlText, setCustomUrlText] = useState("");

  const handleOpenDetail = (memory: Memory) => {
    setSelectedMemory(memory);
  };

  const handleCloseDetail = () => {
    setSelectedMemory(null);
  };

  const handleReaction = (reactionType: 'love' | 'emotional' | 'special' | 'favorite') => {
    if (!selectedMemory) return;

    const updated: Memory = {
      ...selectedMemory,
      reactions: {
        ...selectedMemory.reactions,
        [reactionType]: selectedMemory.reactions[reactionType] + 1
      }
    };

    onUpdateMemory(updated);
    setSelectedMemory(updated);
  };

  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !story.trim()) {
      alert("Harap isikan Judul dan Cerita berharga Kalian terlebih dahulu.");
      return;
    }

    const finalImgUrl = isCustomUrl && customUrlText.trim() ? customUrlText.trim() : imageUrl;

    const newMem: Memory = {
      id: `mem-${Date.now()}`,
      title,
      date,
      location: location || "Ruang Cinta Kita",
      story,
      mood,
      imageUrl: finalImgUrl,
      reactions: { love: 0, emotional: 0, special: 0, favorite: 0 },
      isFavorite: false
    };

    onAddMemory(newMem);
    setIsAdding(false);
    
    // Reset form fields
    setTitle("");
    setLocation("");
    setStory("");
    setMood("Romantic");
    setImageUrl(IMAGE_PRESETS[0].url);
    setIsCustomUrl(false);
    setCustomUrlText("");
  };

  const handleToggleFavoriteList = (mem: Memory, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateMemory({
      ...mem,
      isFavorite: !mem.isFavorite
    });
  };

  return (
    <div className="space-y-6 pb-6">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold tracking-tight">📸 Memories Album</h2>
          <p className={`text-xs ${colors.subText}`}>Lembaran foto romantis perjalanan cinta kalian berdua.</p>
        </div>
        
        <button
          onClick={() => setIsAdding(true)}
          className={`p-3 rounded-full ${colors.accentBg} shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer`}
          title="Tambah Memori Baru"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* MASONRY PICTURES GRID */}
      <div className="columns-2 gap-3 space-y-3">
        {memories.map((mem) => (
          <div
            key={mem.id}
            onClick={() => handleOpenDetail(mem)}
            className="break-inside-avoid relative rounded-2xl overflow-hidden group border border-stone-200/50 hover:border-pink-300/60 bg-white shadow-sm cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Heart Quick Tag */}
            <button
              onClick={(e) => handleToggleFavoriteList(mem, e)}
              className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/70 hover:bg-white text-rose-500 hover:scale-110 active:scale-90 transition-all cursor-pointer"
            >
              <Heart className={`w-3.5 h-3.5 ${mem.isFavorite ? "fill-rose-500" : "text-stone-400"}`} />
            </button>

            {/* Photo Thumbnail */}
            <img
              src={mem.imageUrl}
              alt={mem.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover max-h-72 filter brightness-95 group-hover:brightness-100 transition-all grayscale-[15%] group-hover:grayscale-0 duration-500"
            />

            {/* Hover Caption overlay */}
            <div className="p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent absolute inset-x-0 bottom-0 text-white opacity-95 flex flex-col justify-end min-h-[60px]">
              <span className="text-[10px] font-mono tracking-wide text-pink-200/90 flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5" />
                <span>{mem.date}</span>
              </span>
              <h4 className="text-xs font-bold leading-tight mt-1 truncate">{mem.title}</h4>
              <p className="text-[9px] text-[#f2dde1] opacity-90 truncate mt-0.5 flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5 text-rose-400" />
                <span>{mem.location}</span>
              </p>
            </div>
            
            {/* Mood label tag */}
            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-stone-900/40 text-[9px] text-white font-mono uppercase tracking-widest backdrop-blur-md">
              {mem.mood}
            </div>
          </div>
        ))}
      </div>

      {memories.length === 0 && (
        <div className={`p-8 rounded-2xl ${colors.cardBg} border border-dashed text-center`}>
          <span className="text-2xl">📸</span>
          <p className="text-xs text-stone-500 mt-2 font-serif italic">Belum ada foto memori. Klik "+" untuk menambah kehangatan cinta!</p>
        </div>
      )}

      {/* MODAL VIEW: DETAIL MEMORIES ZOOM + REACTIONS */}
      {selectedMemory && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-zinc-950 text-stone-100 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Full Screen Image Hero */}
            <div className="relative w-full aspect-[4/3] bg-black">
              <img
                src={selectedMemory.imageUrl}
                alt={selectedMemory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <button
                onClick={handleCloseDetail}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white border border-white/10 hover:bg-black active:scale-95 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stories and comments body */}
            <div className="p-5 overflow-y-auto space-y-4 max-h-[45vh] bg-[#161312] border-t border-stone-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 text-[10px] font-mono uppercase tracking-widest border border-rose-500/30">
                    {selectedMemory.mood}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mt-1.5">{selectedMemory.title}</h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-stone-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedMemory.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-pink-300 font-serif">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedMemory.location}</span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed font-light whitespace-pre-wrap bg-stone-900/40 p-3.5 rounded-2xl border border-stone-800">
                {selectedMemory.story}
              </p>

              <div className="border-t border-stone-800 pt-3 flex flex-col gap-2">
                <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">Ketuk Emoji Untuk Bereaksi:</span>
                
                {/* Emoji reactions clicks */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleReaction('love')}
                    className="p-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-90"
                  >
                    <span className="text-xs">❤️ Love</span>
                    <span className="font-mono text-xs font-bold text-rose-500">{selectedMemory.reactions.love || 0}</span>
                  </button>

                  <button
                    onClick={() => handleReaction('emotional')}
                    className="p-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-90"
                  >
                    <span className="text-xs">🥹 Sad</span>
                    <span className="font-mono text-xs font-bold text-blue-400">{selectedMemory.reactions.emotional || 0}</span>
                  </button>

                  <button
                    onClick={() => handleReaction('special')}
                    className="p-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-90"
                  >
                    <span className="text-xs">🌹 Gift</span>
                    <span className="font-mono text-xs font-bold text-pink-400">{selectedMemory.reactions.special || 0}</span>
                  </button>

                  <button
                    onClick={() => handleReaction('favorite')}
                    className="p-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-90"
                  >
                    <span className="text-xs">✨ Best</span>
                    <span className="font-mono text-xs font-bold text-amber-400">{selectedMemory.reactions.favorite || 0}</span>
                  </button>
                </div>
              </div>

              {/* Delete button layout */}
              <div className="pt-2 text-right">
                <button
                  onClick={() => {
                    if (confirm("Hapus foto memori bahagia ini secara permanen dari album?")) {
                      onDeleteMemory(selectedMemory.id);
                      handleCloseDetail();
                    }
                  }}
                  className="px-3.5 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-red-400 hover:text-red-500 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 rounded-lg cursor-pointer"
                >
                  Hapus Memori Ini
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* SHIRT/OVERLAY ADD MEMORY FORM */}
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
              <span className="text-2xl">📸</span>
              <h3 className="font-serif text-lg font-bold mt-1 text-rose-500">Abadikan Momen Bahagia</h3>
              <p className="text-[11px] text-stone-500">Pilih rekomendasi foto atau masukkan link foto kalian</p>
            </div>

            <form onSubmit={handleSaveMemory} className="space-y-4">
              {/* Image choose style toggle */}
              <div className="flex bg-stone-100 p-1 rounded-xl text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setIsCustomUrl(false)}
                  className={`flex-1 py-1.5 text-center rounded-lg transition-all cursor-pointer ${!isCustomUrl ? 'bg-white shadow text-stone-800' : 'text-stone-400'}`}
                >
                  Rekomendasi Foto
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustomUrl(true)}
                  className={`flex-1 py-1.5 text-center rounded-lg transition-all cursor-pointer ${isCustomUrl ? 'bg-white shadow text-stone-800' : 'text-stone-400'}`}
                >
                  Custom URL Foto
                </button>
              </div>

              {/* Recommendation Unsplash Preset Selector */}
              {!isCustomUrl ? (
                <div>
                  <span className="block text-xs font-semibold text-stone-600 mb-1.5">Pilihan Tema Estetik:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {IMAGE_PRESETS.map((pst, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setImageUrl(pst.url)}
                        className={`group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all pointer-events-auto cursor-pointer ${
                          imageUrl === pst.url ? 'border-rose-400 ring-2 ring-rose-200' : 'border-stone-100'
                        }`}
                      >
                        <img src={pst.url} alt={pst.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-[8px] text-white font-medium text-center px-1 truncate w-full">{pst.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">Link URL Foto Estetik</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... atau link foto lainnya"
                    value={customUrlText}
                    onChange={(e) => setCustomUrlText(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300"
                  />
                  <span className="text-[9px] text-stone-400 italic block mt-1">Saran: Gunakan URL gambar dari Unsplash atau ImgBB agar resolusinya jernih.</span>
                </div>
              )}

              {/* Title Field */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Judul Memori</label>
                <input
                  type="text"
                  placeholder="Contoh: Mengambil Es Krim Pertama..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300"
                  required
                />
              </div>

              {/* Grid Date + Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">Lokasi</label>
                  <input
                    type="text"
                    placeholder="Contoh: Pantai Jimbaran, Bali"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300"
                  />
                </div>
              </div>

              {/* Story text */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Cerita Hari Itu</label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan keseruan momen jadian konyol kalian, hembusan tawa, atau kejadian tak terduga yang kalian lalui bersama..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300 leading-relaxed"
                  required
                />
              </div>

              {/* Mood Type Select */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Mood / Kategori:</label>
                <div className="flex gap-1.5 wrap">
                  {(['Romantic', 'Happy', 'Emotional', 'Special'] as MoodType[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m)}
                      className={`flex-1 py-1 rounded-lg border text-[10px] font-bold tracking-wider pointer-events-auto cursor-pointer ${
                        mood === m ? 'bg-rose-50 border-rose-400 text-rose-600' : 'bg-white border-stone-200 text-stone-500'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl font-semibold shadow hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                Abadikan di Album 🌹
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
