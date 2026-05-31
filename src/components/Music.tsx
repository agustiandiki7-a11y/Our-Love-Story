import React, { useState, useRef, useEffect } from "react";
import { Song, ThemeName } from "../types";
import { getThemeColors } from "./ThemeWrapper";
import { Play, Pause, Bookmark, Music as MusicIcon, Heart, Disc, Award, Volume2, Plus, Trash2, Link } from "lucide-react";
import AudioWave from "./AudioWave";

interface MusicProps {
  theme: ThemeName;
  songs: Song[];
  onAddSong: (song: Song) => void;
  onDeleteSong: (id: string) => void;
  onUpdateSong: (updated: Song) => void;
}

export default function Music({
  theme,
  songs,
  onAddSong,
  onDeleteSong,
  onUpdateSong
}: MusicProps) {
  const colors = getThemeColors(theme);
  const [activeSong, setActiveSong] = useState<Song | null>(songs[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form Fields
  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newCover, setNewCover] = useState("");
  const [newSpotify, setNewSpotify] = useState("");

  // Sound objects ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Monitor song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (activeSong?.audioFileUrl) {
      audioRef.current = new Audio(activeSong.audioFileUrl);
      audioRef.current.loop = true;
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.log("Audio play deferred due to browser click restrictions:", e);
          setIsPlaying(false);
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [activeSong]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        alert("Ketuk layar terlebih dahulu untuk mengaktifkan izin pemutaran audio di browser Anda.");
        console.error(e);
      });
    }
  };

  const handleSelectSong = (song: Song) => {
    if (activeSong?.id === song.id) {
      handlePlayPause();
    } else {
      setActiveSong(song);
      setIsPlaying(true);
    }
  };

  const handleToggleSongFavorite = (song: Song, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateSong({
      ...song,
      isFavorite: !song.isFavorite
    });
    if (activeSong?.id === song.id) {
      setActiveSong({
        ...activeSong,
        isFavorite: !song.isFavorite
      });
    }
  };

  const handleCreateSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newArtist.trim()) {
      alert("Harap isikan judul dan penyanyi lagu.");
      return;
    }

    const defaultCovers = [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400"
    ];

    const randomCover = defaultCovers[Math.floor(Math.random() * defaultCovers.length)];

    const created: Song = {
      id: `song-${Date.now()}`,
      title: newTitle,
      artist: newArtist,
      coverUrl: newCover.trim() ? newCover.trim() : randomCover,
      isFavorite: false,
      spotifyLink: newSpotify.trim() ? newSpotify.trim() : undefined,
      audioFileUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" // Default aesthetic loop
    };

    onAddSong(created);
    setActiveSong(created);
    setIsAdding(false);

    // Reset Form
    setNewTitle("");
    setNewArtist("");
    setNewCover("");
    setNewSpotify("");
  };

  return (
    <div className="space-y-6 pb-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold tracking-tight">🎵 Playlist Lagu Cinta</h2>
          <p className={`text-xs ${colors.subText}`}>Alunan nada syahdu saksi tumbuh kembang asmara kita.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`p-3 rounded-full ${colors.accentBg} shadow-md active:scale-95 transition-all cursor-pointer`}
          title="Tambah Lagu Baru"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* RENDER VIEW: NEW SONG FORM */}
      {isAdding && (
        <div className={`p-5 rounded-3xl ${colors.cardBg} border shadow-lg transition-all`}>
          <div className="text-center mb-4">
            <span className="text-xl">🎶</span>
            <h3 className="font-serif text-sm font-bold mt-1 text-rose-500">Daftarkan Lagu Memori Baru</h3>
          </div>

          <form onSubmit={handleCreateSong} className="space-y-3 text-left">
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">Judul Lagu</label>
              <input
                type="text"
                placeholder="Contoh: Cinta Luar Biasa..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">Penyanyi / Artis</label>
              <input
                type="text"
                placeholder="Contoh: Andmesh Kamaleng"
                value={newArtist}
                onChange={(e) => setNewArtist(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">Link Cover Image (Opsional)</label>
              <input
                type="url"
                placeholder="Masukkan link gambar atau kosongkan untuk otomatis"
                value={newCover}
                onChange={(e) => setNewCover(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">Direct Spotify Link (Opsional)</label>
              <input
                type="url"
                placeholder="https://open.spotify.com/track/..."
                value={newSpotify}
                onChange={(e) => setNewSpotify(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 bg-rose-400 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs shadow-sm transition-colors cursor-pointer"
            >
              Simpan Lagu Favorit Kita 🌹
            </button>
          </form>
        </div>
      )}

      {/* SPOTLIGHT: "OUR HERO SONG" EMBED CARD SECTION */}
      {activeSong && (
        <div className="rounded-3xl border border-rose-300/40 relative overflow-hidden p-6 shadow-xl text-center bg-black/60 shadow-rose-950/20">
          
          {/* Aesthetic Blur Cover Art Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-2xl transform scale-110 select-none pointer-events-none"
            style={{ backgroundImage: `url(${activeSong.coverUrl})` }}
          />

          <div className="relative z-10 flex flex-col items-center">
            
            {/* Spinning Disc Album Cover */}
            <div className="relative w-36 h-36 mb-5 select-none touch-none">
              <div
                className={`w-full h-full rounded-full border-4 border-white/90 overflow-hidden shadow-2xl relative ${
                  isPlaying ? "animate-spin" : ""
                }`}
                style={{ animationDuration: "14s", animationTimingFunction: "linear" }}
              >
                <img src={activeSong.coverUrl} alt="Cover art" className="w-full h-full object-cover" />
                
                {/* Center hole disc mock */}
                <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-slate-950/70 border-2 border-white/60 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
              </div>
              
              {/* Special our-song crown badge */}
              {activeSong.isFavorite && (
                <div className="absolute -top-1 -right-1 bg-rose-500 text-white p-1.5 rounded-full shadow-lg border border-pink-100/30">
                  <Heart className="w-4 h-4 fill-white animate-pulse" />
                </div>
              )}
            </div>

            {/* Song Meta Descriptions */}
            <div className="space-y-1 mb-4 text-white">
              <span className="text-[9px] font-mono tracking-widest bg-pink-500/25 px-2.5 py-0.5 rounded-full text-pink-200 border border-pink-400/20 inline-block">
                Now Playback / Our Theme Song
              </span>
              <h3 className="font-serif text-lg font-bold truncate tracking-tight text-white mt-1.5">{activeSong.title}</h3>
              <p className="text-xs text-stone-300/90 italic font-light">{activeSong.artist}</p>
            </div>

            {/* SOUNDWAVE EQUALIZER DANCE */}
            <div className="w-full h-14 mb-4 select-none flex items-center justify-center">
              <AudioWave isPlaying={isPlaying} color="#fda4af" />
            </div>

            {/* MAIN CARD PLAYER BUTTON CONTROLS */}
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => handleToggleSongFavorite(activeSong, e)}
                className="p-3 bg-white/10 hover:bg-white/20 border border-white/10 text-rose-400 rounded-full hover:scale-105 active:scale-90 transition-all cursor-pointer"
                title={`${activeSong.isFavorite ? "Hapus dari Favorite" : "Sematkan di Favorite"}`}
              >
                <Heart className={`w-4 h-4 ${activeSong.isFavorite ? "fill-rose-500 text-rose-500" : "text-stone-300"}`} />
              </button>

              <button
                onClick={handlePlayPause}
                className="p-4.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-xl shadow-rose-950/40 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white fill-white ml-0.5" />}
              </button>

              {activeSong.spotifyLink ? (
                <a
                  href={activeSong.spotifyLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 border border-white/10 text-emerald-400 rounded-full hover:scale-105 active:scale-90 transition-all cursor-pointer"
                  title="Buka Resmi di Spotify"
                >
                  <Link className="w-4 h-4" />
                </a>
              ) : (
                <div className="w-10 h-10 flex items-center justify-center text-xs text-stone-500">
                  <Volume2 className="w-4 h-4 text-stone-400 animate-pulse" />
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* PLAYLIST SONGS COLUMN */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase block mb-1 text-left">Daftar Lagu Cinta Kita:</span>

        {songs.map((song) => {
          const isActive = activeSong?.id === song.id;
          return (
            <div
              key={song.id}
              onClick={() => handleSelectSong(song)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 text-left ${
                isActive 
                  ? "border-rose-300/60 bg-pink-50/50 shadow-sm" 
                  : "border-stone-200/50 hover:bg-stone-50 bg-white"
              }`}
            >
              {/* Miniature Album Art */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                <img src={song.coverUrl} alt="Lagu cover" className="w-full h-full object-cover" />
                {isActive && isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Disc className="w-5 h-5 text-pink-300 animate-spin" />
                  </div>
                )}
              </div>

              {/* Title & Artist names */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-serif font-bold text-stone-900 truncate">{song.title}</h4>
                <p className="text-[10px] text-stone-400 italic mt-0.5 truncate">{song.artist}</p>
              </div>

              {/* Controls on individual indices */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleToggleSongFavorite(song, e)}
                  className="p-1 text-stone-300 hover:text-rose-500 active:scale-75 transition-all cursor-pointer"
                >
                  <Heart className={`w-3.5 h-3.5 ${song.isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Hapus lagu '${song.title}' dari playlist hubungan kalian?`)) {
                      onDeleteSong(song.id);
                      if (isActive) {
                        setActiveSong(songs.find((s) => s.id !== song.id) || null);
                      }
                    }
                  }}
                  className="p-1 text-stone-300 hover:text-red-500 active:scale-75 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}

        {songs.length === 0 && (
          <div className={`p-8 text-center rounded-2xl ${colors.cardBg} border border-dashed`}>
            <span className="text-2xl">📻</span>
            <p className="text-xs text-stone-500 mt-2 font-serif italic">Belum ada playlist tersimpan.</p>
          </div>
        )}
      </div>

    </div>
  );
}
