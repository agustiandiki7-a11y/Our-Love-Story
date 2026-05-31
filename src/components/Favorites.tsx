import { Memory, LoveLetter, Song, ThemeName } from "../types";
import { getThemeColors } from "./ThemeWrapper";
import { Star, Heart, Calendar, Compass, Disc } from "lucide-react";

interface FavoritesProps {
  theme: ThemeName;
  memories: Memory[];
  letters: LoveLetter[];
  songs: Song[];
  onOpenLetter: () => void; // Shortcut hook redirects
}

export default function Favorites({
  theme,
  memories,
  letters,
  songs,
  onOpenLetter
}: FavoritesProps) {
  const colors = getThemeColors(theme);

  // Filter out exact starry elements
  const favMemories = memories.filter((mem) => mem.isFavorite);
  const favLetters = letters.filter((letItem) => letItem.isFavorite);
  const favSongs = songs.filter((s) => s.isFavorite);

  const totalFavs = favMemories.length + favLetters.length + favSongs.length;

  return (
    <div className="space-y-6 pb-6 text-left">
      
      {/* SECTION HEADER */}
      <div>
        <h2 className="font-serif text-2xl font-bold tracking-tight">⭐ Favorites Gallery</h2>
        <p className={`text-xs ${colors.subText}`}>Koleksi momen tercantik, surat terindah, dan lagu termanis kalian.</p>
      </div>

      {totalFavs === 0 ? (
        <div className={`p-8 rounded-2xl ${colors.cardBg} border border-dashed text-center`}>
          <Star className="w-10 h-10 text-stone-200 fill-stone-100 mx-auto animate-pulse" />
          <p className="text-xs text-stone-500 mt-2 font-serif italic">Belum ada item favorit terpilih. Tandai bintang pada memori atau surat cinta kalian!</p>
        </div>
      ) : (
        <div className="space-y-5 animate-fade-in">
          
          {/* FAVORITE MEMORIES COLLAGE */}
          {favMemories.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#aa6f5e] font-bold uppercase block mb-1">⭐ Foto Memori Terindah</span>
              <div className="grid grid-cols-2 gap-3">
                {favMemories.map((mem) => (
                  <div
                    key={mem.id}
                    className="group relative rounded-xl h-36 overflow-hidden border border-rose-100/50 hover:border-rose-300"
                  >
                    <img src={mem.imageUrl} alt={mem.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2.5 flex flex-col justify-end">
                      <span className="text-[8px] text-pink-200 font-mono">{mem.date}</span>
                      <h4 className="text-[10px] font-serif font-bold text-white truncate mt-0.5">{mem.title}</h4>
                      <p className="text-[8px] text-stone-300 truncate font-light flex items-center gap-0.5">
                        <Compass className="w-2.5 h-2.5 text-rose-400" />
                        <span>{mem.location}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAVORITE LETTER SNIPPETS */}
          {favLetters.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#aa6f5e] font-bold uppercase block mb-1">⭐ Surat Kasih Sayang Utama</span>
              <div className="space-y-2">
                {favLetters.map((letItem) => (
                  <div
                    key={letItem.id}
                    onClick={onOpenLetter}
                    className="p-3 bg-red-50/20 hover:bg-red-50/40 border border-pink-100/40 rounded-xl flex gap-2.5 items-start cursor-pointer active:scale-[0.99] transition-all"
                  >
                    <div className="p-2 rounded-lg bg-pink-50 text-base">💌</div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-serif font-extrabold text-stone-900 truncate">{letItem.title}</h4>
                      <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5 uppercase tracking-wide">Dari: {letItem.senderName}</p>
                      <p className="text-[10px] text-stone-400 leading-normal line-clamp-2 mt-1 italic font-light font-serif">
                        "{letItem.content}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAVORITE SONGS SPOTLIGHT */}
          {favSongs.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#aa6f5e] font-bold uppercase block mb-1">⭐ Soundtrack Kebersamaan</span>
              <div className="grid grid-cols-1 gap-2">
                {favSongs.map((song) => (
                  <div
                    key={song.id}
                    className="p-2.5 bg-white border border-stone-100 rounded-xl flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={song.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-serif font-bold text-stone-900 truncate">{song.title}</h4>
                      <p className="text-[10px] text-stone-400 italic mt-0.5 truncate">{song.artist}</p>
                    </div>
                    <Disc className="w-4 h-4 text-rose-400 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
