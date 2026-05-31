import { useState, useEffect } from "react";
import { AppState, CoupleProfile, Memory, LoveLetter, Song, BucketItem, TimelineEvent, ThemeName } from "./types";
import { INITIAL_STATE } from "./initialData";
import ThemeWrapper, { getThemeColors } from "./components/ThemeWrapper";
import FloatingHearts from "./components/FloatingHearts";
import AisAuth from "./components/AisAuth";
import LoveCounter from "./components/LoveCounter";
import Memories from "./components/Memories";
import LoveLetters from "./components/LoveLetters";
import Timeline from "./components/Timeline";
import Music from "./components/Music";
import BucketList from "./components/BucketList";
import Favorites from "./components/Favorites";
import ProfileSettings from "./components/ProfileSettings";
import { 
  Heart, Sparkles, Home, Image as ImageIcon, BookOpen, Clock, FolderHeart, 
  ChevronLeft, Music as PlayIcon, Target, Star, Settings2, Bell, ShieldAlert, CheckCircle2
} from "lucide-react";

// Local storage keys
const STORAGE_KEY = "OUR_LOVE_STORY_APP_STATE";

export default function App() {
  // Global Application State loading
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Fallback checks
        if (parsed.profile) return parsed;
      } catch (e) {
        console.error("Gagal membaca cache lokal, memuat seed data asmara.", e);
      }
    }
    return INITIAL_STATE;
  });

  // Active View Tab Navigation
  const [activeTab, setActiveTab] = useState<'home' | 'album' | 'letters' | 'timeline' | 'space'>('home');
  // Active Space Sub-Hub
  const [activeSpaceSub, setActiveSpaceSub] = useState<'hub' | 'playlist' | 'bucket' | 'favorites' | 'settings'>('hub');

  // simulated live companion partner activity toasts list
  const [partnerLog, setPartnerLog] = useState<string>("Stella sedang tersenyum memandangi album cinta...");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const colors = getThemeColors(state.theme as ThemeName || "pink-romance");

  // Auto-save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Simulate periodic partner collaborative updates to satisfy real-world sync
  useEffect(() => {
    if (!state.profile?.isPartnerConnected) return;

    const partnerSayings = [
      `${state.profile.nickname2} baru saja memutar lagu kesukaan kalian di ruangannya... 🎶`,
      `${state.profile.nickname2} sedang mengetik sepucuk surat rindu yang romantis... ✍️`,
      `${state.profile.nickname2} menyukai foto momen di album Pantai Bali! 📸`,
      `${state.profile.nickname2} memperbarui status bucket list jadian kalian! 🌹`,
      `${state.profile.nickname2} sedang memandangi countdown cinta kalian bergandengan... 💕`,
      `${state.profile.nickname2} mengirimkan pelukan hangat virtual untukmu! 🤗`
    ];

    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * partnerSayings.length);
      const msg = partnerSayings[idx];
      setPartnerLog(msg);
      setToastMsg(msg);
      setShowToast(true);
      
      // Auto dismiss toast after 6 seconds
      setTimeout(() => setShowToast(false), 6000);
    }, 45000); // Trigger every 45s

    return () => clearInterval(interval);
  }, [state.profile]);

  if (!state.profile) {
    return (
      <AisAuth 
        theme={state.theme as ThemeName || "pink-romance"}
        onAuthComplete={(prof) => setState(prev => ({ ...prev, profile: prof }))}
      />
    );
  }

  // Helper functions for state updates
  const handleUpdateProfile = (newProfile: CoupleProfile) => {
    setState((prev) => ({ ...prev, profile: newProfile }));
  };

  const handleChangeTheme = (newTheme: ThemeName) => {
    setState((prev) => ({ ...prev, theme: newTheme }));
  };

  const handleAddMemory = (newMem: Memory) => {
    setState((prev) => ({ ...prev, memories: [newMem, ...prev.memories] }));
  };

  const handleUpdateMemory = (updated: Memory) => {
    setState((prev) => ({
      ...prev,
      memories: prev.memories.map((m) => (m.id === updated.id ? updated : m))
    }));
  };

  const handleDeleteMemory = (id: string) => {
    setState((prev) => ({
      ...prev,
      memories: prev.memories.filter((m) => m.id !== id)
    }));
  };

  const handleAddLetter = (newLetter: LoveLetter) => {
    setState((prev) => ({ ...prev, letters: [newLetter, ...prev.letters] }));
  };

  const handleUpdateLetter = (updated: LoveLetter) => {
    setState((prev) => ({
      ...prev,
      letters: prev.letters.map((l) => (l.id === updated.id ? updated : l))
    }));
  };

  const handleDeleteLetter = (id: string) => {
    setState((prev) => ({
      ...prev,
      letters: prev.letters.filter((l) => l.id !== id)
    }));
  };

  const handleAddSong = (newSong: Song) => {
    setState((prev) => ({ ...prev, songs: [newSong, ...prev.songs] }));
  };

  const handleDeleteSong = (id: string) => {
    setState((prev) => ({
      ...prev,
      songs: prev.songs.filter((s) => s.id !== id)
    }));
  };

  const handleUpdateSong = (updated: Song) => {
    setState((prev) => ({
      ...prev,
      songs: prev.songs.map((s) => (s.id === updated.id ? updated : s))
    }));
  };

  const handleAddBucketItem = (newBucket: BucketItem) => {
    setState((prev) => ({ ...prev, bucketList: [...prev.bucketList, newBucket] }));
  };

  const handleToggleBucketItem = (id: string) => {
    setState((prev) => ({
      ...prev,
      bucketList: prev.bucketList.map((b) => (b.id === id ? { ...b, isCompleted: !b.isCompleted } : b))
    }));
  };

  const handleDeleteBucketItem = (id: string) => {
    setState((prev) => ({
      ...prev,
      bucketList: prev.bucketList.filter((b) => b.id !== id)
    }));
  };

  const handleAddTimelineEvent = (newEv: TimelineEvent) => {
    setState((prev) => ({ ...prev, timeline: [...prev.timeline, newEv] }));
  };

  const handleDeleteTimelineEvent = (id: string) => {
    setState((prev) => ({
      ...prev,
      timeline: prev.timeline.filter((ev) => ev.id !== id)
    }));
  };

  const handleResetAccount = () => {
    if (confirm("Apakah Anda yakin ingin mengatur ulang profil hubungan dan menghapus cache cinta lokal Anda? Tindakan ini bersifat permanen.")) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  const currentThemeMapped = state.theme as ThemeName || "pink-romance";

  return (
    <ThemeWrapper theme={currentThemeMapped}>
      {/* Background Hearts animates smoothly */}
      <FloatingHearts />

      {/* MULTIPLAYER SYNCHRONIZATION IMMERSION ALERTS */}
      {showToast && (
        <div className="fixed top-4 inset-x-4 mx-auto max-w-sm bg-[#161312] text-rose-100 p-3.5 rounded-2xl border border-rose-500/20 shadow-2xl z-50 flex items-center gap-3 animate-slide-in pointer-events-auto">
          <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0 animate-ping" style={{ animationDuration: '3s' }}>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-mono tracking-widest text-rose-400 font-bold uppercase block mb-0.5">Partner presence sync</span>
            <p className="text-xs text-stone-200 leading-snug">{toastMsg}</p>
          </div>
        </div>
      )}

      {/* PRINT BANNER SHIELDING */}
      <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-[#121110] shadow-sm border-x border-[#F3E8E2]/60 print:border-none print:shadow-none print:bg-transparent flex flex-col relative pb-28">
        
        {/* TOP STATUS HEADER WITH AVATARS COLLAGE */}
        <header className="p-4 border-b border-[#F3E8E2]/60 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md z-40 print:hidden select-none">
          <div className="flex items-center gap-3">
            {/* Round Double Avatars */}
            <div className="flex -space-x-4 items-center">
              <img 
                src={state.profile.avatar1} 
                alt={state.profile.nickname1} 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" 
              />
              <img 
                src={state.profile.avatar2} 
                alt={state.profile.nickname2} 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" 
              />
            </div>
            
            <div className="text-left">
              <h1 className="font-serif text-sm font-extrabold tracking-tight text-stone-800 dark:text-stone-100">
                {state.profile.nickname1} & {state.profile.nickname2}
              </h1>
              
              {/* Pulsing online status indicator */}
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-stone-400 font-medium">Saling terhubung</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => { setActiveTab('space'); setActiveSpaceSub('settings'); }}
              className="p-2 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 active:scale-95 transition-all text-stone-400 cursor-pointer"
              title="Akses Pengaturan"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* CONTAINER MAIN SCREEN CONTENT */}
        <main className="p-5 flex-1 relative z-10 print:p-0">
          
          {/* TAB 1: HOME/DASHBOARD SCREEN */}
          {activeTab === 'home' && (
            <div className="space-y-6 animate-fade-in text-left">
              {/* Daily warm greeting quote cards */}
              <div className={`rounded-3xl p-5 border ${colors.badgeBorder}/40 ${colors.badgeBg} shadow-sm transition-all duration-300`}>
                <p className="text-xs text-stone-700 dark:text-stone-200 font-serif leading-relaxed italic">
                  "Menghabiskan hari bersamamu terasa seperti fajar yang lembut. Terima kasih telah mencintai seluruh kurangku dengan penuh lapang dada." 💕
                </p>
                <div className="mt-3 flex justify-between items-center border-t border-[#F3E8E2]/60 pt-2.5">
                  <span className={`text-[9px] font-mono ${colors.badgeText} tracking-wider font-bold uppercase`}>UNTUK KITA HARI INI</span>
                  <div className="flex items-center gap-1 text-[10px] text-stone-500 font-medium selection:text-[#E9967A]">
                    <span>✨ {state.profile.nickname2}: <b>"I love you!"</b></span>
                  </div>
                </div>
              </div>

              {/* REAL-TIME COUNTER COMPONENT */}
              <LoveCounter 
                anniversaryDate={state.profile.anniversaryDate} 
                colors={colors} 
              />

              {/* PARTNER LIVE FEED TRACK ticker */}
              <div className={`bg-white/90 dark:bg-[#181716] p-3.5 border border-[#F3E8E2]/60 rounded-2xl flex items-center justify-between shadow-xs`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping flex-shrink-0" />
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 truncate italic">
                    {partnerLog}
                  </p>
                </div>
                <span className={`text-[9px] font-mono ${colors.accentText} uppercase font-bold tracking-widest pl-2`}>Live sync</span>
              </div>

              {/* COUPLING STORIES SHORTCUTS GRID */}
              <div className="grid grid-cols-2 gap-3.5">
                
                {/* Short statistics */}
                <div 
                  onClick={() => setActiveTab('album')}
                  className={`p-4 ${colors.cardBg} font-sans hover:translate-y-[-2px] transition-all rounded-2xl shadow-xs text-left relative overflow-hidden cursor-pointer`}
                >
                  <ImageIcon className={`w-5 h-5 ${colors.accentText}`} />
                  <h4 className="font-serif text-xs font-bold text-stone-800 dark:text-stone-105 mt-2.5">Buka Album Foto</h4>
                  <p className="text-[10px] text-stone-400 mt-0.5">{state.memories.length} memori terekam</p>
                </div>

                <div 
                  onClick={() => setActiveTab('letters')}
                  className={`p-4 ${colors.cardBg} font-sans hover:translate-y-[-2px] transition-all rounded-2xl shadow-xs text-left relative overflow-hidden cursor-pointer`}
                >
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <h4 className="font-serif text-xs font-bold text-stone-800 dark:text-stone-105 mt-2.5">Kotak Surat Cinta</h4>
                  <p className="text-[10px] text-stone-400 mt-0.5">{state.letters.length} surat manis ditulis</p>
                </div>

                <div 
                  onClick={() => { setActiveTab('space'); setActiveSpaceSub('bucket'); }}
                  className={`p-4 ${colors.cardBg} font-sans hover:translate-y-[-2px] transition-all rounded-2xl shadow-xs text-left relative overflow-hidden cursor-pointer`}
                >
                  <Target className="w-5 h-5 text-amber-500" />
                  <h4 className="font-serif text-xs font-bold text-stone-800 dark:text-stone-105 mt-2.5">Impian & Harapan</h4>
                  <p className="text-[10px] text-stone-400 mt-0.5">Bucket list petualangan</p>
                </div>

                <div 
                  onClick={() => { setActiveTab('space'); setActiveSpaceSub('playlist'); }}
                  className={`p-4 ${colors.cardBg} font-sans hover:translate-y-[-2px] transition-all rounded-2xl shadow-xs text-left relative overflow-hidden cursor-pointer`}
                >
                  <PlayIcon className="w-5 h-5 text-blue-400" />
                  <h4 className="font-serif text-xs font-bold text-stone-800 dark:text-stone-105 mt-2.5">Soundtrack Cinta</h4>
                  <p className="text-[10px] text-stone-400 mt-0.5">Alunan jadian syahdu</p>
                </div>

              </div>

              {/* EXCLUDE ACCIDENTAL RESTART OPTION */}
              <div className="pt-4 text-center">
                <button
                  onClick={handleResetAccount}
                  className="text-[10px] text-stone-400 hover:text-red-500 transition-colors uppercase font-mono tracking-widest cursor-pointer"
                >
                  [ Atur Ulang Profil Hubungan ]
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: PICTURES MEMORIES ALBUM */}
          {activeTab === 'album' && (
            <Memories
              theme={currentThemeMapped}
              memories={state.memories}
              onAddMemory={handleAddMemory}
              onUpdateMemory={handleUpdateMemory}
              onDeleteMemory={handleDeleteMemory}
            />
          )}

          {/* TAB 3: LOVE LETTERS SUB */}
          {activeTab === 'letters' && (
            <LoveLetters
              theme={currentThemeMapped}
              letters={state.letters}
              profile={state.profile}
              onAddLetter={handleAddLetter}
              onUpdateLetter={handleUpdateLetter}
              onDeleteLetter={handleDeleteLetter}
            />
          )}

          {/* TAB 4: RELATIONSHIP TIMELINES */}
          {activeTab === 'timeline' && (
            <Timeline
              theme={currentThemeMapped}
              timeline={state.timeline}
              onAddEvent={handleAddTimelineEvent}
              onDeleteEvent={handleDeleteTimelineEvent}
            />
          )}

          {/* TAB 5: COMPANION OUR SPACE HUB */}
          {activeTab === 'space' && (
            <div className="space-y-6">
              {activeSpaceSub !== 'hub' && (
                <button
                  onClick={() => setActiveSpaceSub('hub')}
                  className={`flex items-center gap-1 text-xs font-semibold ${colors.accentText} hover:underline mb-1 cursor-pointer`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Kembali ke Hub Cinta Kita</span>
                </button>
              )}

              {/* SPACE MENU HOME GRID */}
              {activeSpaceSub === 'hub' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div>
                    <h2 className="font-serif text-2xl font-bold tracking-tight">🪐 Our Sanctuary</h2>
                    <p className={`text-xs ${colors.subText}`}>Ruangan privat sarang asmara kalian berdua.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    
                    {/* Item 1: music space */}
                    <div
                      onClick={() => setActiveSpaceSub('playlist')}
                      className={`p-5 rounded-3xl border ${colors.cardBg} flex items-center justify-between cursor-pointer group hover:-translate-y-0.5 active:translate-y-0 transition-all`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
                          <PlayIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-bold text-stone-900">🎵 Playlist Cinta Kita</h4>
                          <p className="text-[11px] text-stone-400 mt-0.5">Alunan lofi pengiring rindu</p>
                        </div>
                      </div>
                      <span className="text-xl group-hover:translate-x-1.5 transition-transform">➡️</span>
                    </div>

                    {/* Item 2: bucket list */}
                    <div
                      onClick={() => setActiveSpaceSub('bucket')}
                      className={`p-5 rounded-3xl border ${colors.cardBg} flex items-center justify-between cursor-pointer group hover:-translate-y-0.5 active:translate-y-0 transition-all`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
                          <Target className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-bold text-stone-900">🌹 Bucket List Impian</h4>
                          <p className="text-[11px] text-stone-400 mt-0.5">Gol & destinasi yang ingin diraih</p>
                        </div>
                      </div>
                      <span className="text-xl group-hover:translate-x-1.5 transition-transform">➡️</span>
                    </div>

                    {/* Item 3: stars collections */}
                    <div
                      onClick={() => setActiveSpaceSub('favorites')}
                      className={`p-5 rounded-3xl border ${colors.cardBg} flex items-center justify-between cursor-pointer group hover:-translate-y-0.5 active:translate-y-0 transition-all`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 text-yellow-505 rounded-2xl bg-yellow-50/55">
                          <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-bold text-stone-900">⭐ Koleksi Terfavorit</h4>
                          <p className="text-[11px] text-stone-400 mt-0.5">Pilar rindu bertanda bintang</p>
                        </div>
                      </div>
                      <span className="text-xl group-hover:translate-x-1.5 transition-transform">➡️</span>
                    </div>

                    {/* Item 4: settings and themes */}
                    <div
                      onClick={() => setActiveSpaceSub('settings')}
                      className={`p-5 rounded-3xl border ${colors.cardBg} flex items-center justify-between cursor-pointer group hover:-translate-y-0.5 active:translate-y-0 transition-all`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-stone-105 rounded-2xl bg-stone-100">
                          <Settings2 className="w-6 h-6 text-stone-600" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-bold text-stone-900">⚙️ Pengaturan & Format</h4>
                          <p className="text-[11px] text-stone-400 mt-0.5">Tema estetik & file cetak PDF</p>
                        </div>
                      </div>
                      <span className="text-xl group-hover:translate-x-1.5 transition-transform">➡️</span>
                    </div>

                  </div>
                </div>
              )}

              {/* CHANNELS SUB ENTRANCES */}
              {activeSpaceSub === 'playlist' && (
                <Music
                  theme={currentThemeMapped}
                  songs={state.songs}
                  onAddSong={handleAddSong}
                  onDeleteSong={handleDeleteSong}
                  onUpdateSong={handleUpdateSong}
                />
              )}

              {activeSpaceSub === 'bucket' && (
                <BucketList
                  theme={currentThemeMapped}
                  bucketList={state.bucketList}
                  onAddItem={handleAddBucketItem}
                  onToggleItem={handleToggleBucketItem}
                  onDeleteItem={handleDeleteBucketItem}
                />
              )}

              {activeSpaceSub === 'favorites' && (
                <Favorites
                  theme={currentThemeMapped}
                  memories={state.memories}
                  letters={state.letters}
                  songs={state.songs}
                  onOpenLetter={() => { setActiveTab('letters'); }}
                />
              )}

              {activeSpaceSub === 'settings' && (
                <ProfileSettings
                  theme={currentThemeMapped}
                  profile={state.profile}
                  onChangeTheme={handleChangeTheme}
                  onUpdateProfile={handleUpdateProfile}
                  memoriesCount={state.memories.length}
                  lettersCount={state.letters.length}
                  songsCount={state.songs.length}
                  bucketCount={state.bucketList.length}
                />
              )}
            </div>
          )}

        </main>

        {/* BOTTOM NAVIGATION MOBILE-FIRST BAR */}
        <nav className="fixed bottom-0 inset-x-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-pink-101/40 py-2.5 px-4 shadow-lg z-40 max-w-md mx-auto print:hidden">
          <div className="grid grid-cols-5 gap-1 text-center">
            
            {/* Tab 1: Home */}
            <button
              onClick={() => { setActiveTab('home'); }}
              className={`flex flex-col items-center gap-1 py-1 cursor-pointer transition-transform duration-200 active:scale-95 ${activeTab === 'home' ? colors.accentText : 'text-stone-400'}`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[9px] font-semibold tracking-wide">Home</span>
            </button>

            {/* Tab 2: Album */}
            <button
              onClick={() => { setActiveTab('album'); }}
              className={`flex flex-col items-center gap-1 py-1 cursor-pointer transition-transform duration-200 active:scale-95 ${activeTab === 'album' ? colors.accentText : 'text-stone-400'}`}
            >
              <ImageIcon className="w-5 h-5" />
              <span className="text-[9px] font-semibold tracking-wide">Album</span>
            </button>

            {/* Tab 3: Letters */}
            <button
              onClick={() => { setActiveTab('letters'); }}
              className={`flex flex-col items-center gap-1 py-1 cursor-pointer transition-transform duration-200 active:scale-95 ${activeTab === 'letters' ? colors.accentText : 'text-stone-400'}`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[9px] font-semibold tracking-wide">Surat</span>
            </button>

            {/* Tab 4: Timeline */}
            <button
              onClick={() => { setActiveTab('timeline'); }}
              className={`flex flex-col items-center gap-1 py-1 cursor-pointer transition-transform duration-200 active:scale-95 ${activeTab === 'timeline' ? colors.accentText : 'text-stone-400'}`}
            >
              <Clock className="w-5 h-5" />
              <span className="text-[9px] font-semibold tracking-wide">Timeline</span>
            </button>

            {/* Tab 5: Spaces Sub Hub */}
            <button
              onClick={() => { setActiveTab('space'); setActiveSpaceSub('hub'); }}
              className={`flex flex-col items-center gap-1 py-1 cursor-pointer transition-transform duration-200 active:scale-95 ${activeTab === 'space' ? colors.accentText : 'text-stone-400'}`}
            >
              <FolderHeart className="w-5 h-5" />
              <span className="text-[9px] font-semibold tracking-wide">Our Space</span>
            </button>

          </div>
        </nav>

      </div>
    </ThemeWrapper>
  );
}
