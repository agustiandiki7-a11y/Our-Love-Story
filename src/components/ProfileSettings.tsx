import React, { useState } from "react";
import { CoupleProfile, ThemeName } from "../types";
import { getThemeColors } from "./ThemeWrapper";
import { Edit2, Palette, Shield, Download, Pin, CheckCircle, RefreshCcw, Smile, Heart, ExternalLink, Printer } from "lucide-react";

interface ProfileSettingsProps {
  theme: ThemeName;
  profile: CoupleProfile;
  onChangeTheme: (chosen: ThemeName) => void;
  onUpdateProfile: (updated: CoupleProfile) => void;
  memoriesCount: number;
  lettersCount: number;
  songsCount: number;
  bucketCount: number;
}

export default function ProfileSettings({
  theme,
  profile,
  onChangeTheme,
  onUpdateProfile,
  memoriesCount,
  lettersCount,
  songsCount,
  bucketCount
}: ProfileSettingsProps) {
  const colors = getThemeColors(theme);
  
  // Local edit states
  const [isEditing, setIsEditing] = useState(false);
  const [name1, setName1] = useState(profile.name1);
  const [name2, setName2] = useState(profile.name2);
  const [nickname1, setNickname1] = useState(profile.nickname1);
  const [nickname2, setNickname2] = useState(profile.nickname2);
  const [annDate, setAnnDate] = useState(profile.anniversaryDate);

  // Lock PIN States
  const [isPinLocked, setIsPinLocked] = useState(false);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [lockPinCode, setLockPinCode] = useState("");
  const [setupPin, setSetupPin] = useState("");
  const [showPinSetup, setShowPinSetup] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name1,
      name2,
      nickname1,
      nickname2,
      anniversaryDate: annDate
    });
    setIsEditing(false);
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  const handleTogglePin = () => {
    if (isPinLocked) {
      setIsPinLocked(false);
      setLockPinCode("");
    } else {
      setShowPinSetup(true);
    }
  };

  const handleConfirmPinSetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (setupPin.length < 4) {
      alert("PIN harus sepanjang 4 digit angka.");
      return;
    }
    setLockPinCode(setupPin);
    setIsPinLocked(true);
    setShowPinSetup(false);
    setSetupPin("");
    alert("Kunci PIN Keamanan berhasil diaktifkan! Ini mensimulasikan otentikasi privat ruang cinta kalian.");
  };

  const THEMES_LIST: { id: ThemeName; name: string; desc: string; preview: string }[] = [
    { id: 'pink-romance', name: '🌸 Soft Pink', desc: 'Romantis, manis, penuh kehangatan', preview: 'bg-rose-100 border-rose-300' },
    { id: 'elegant-white', name: '📜 Pure Classic', desc: 'Klasik, elegan, kemewahan estetika', preview: 'bg-[#fbfece] border-[#bfa594]' },
    { id: 'midnight-love', name: '🌙 Cosmic Slate', desc: 'Intim, dramatis, kedamaian malam', preview: 'bg-indigo-950 border-indigo-700' },
    { id: 'lavender-dream', name: '💜 Lavender Dream', desc: 'Tenang, anggun, harmoni asmara', preview: 'bg-purple-100 border-purple-350' },
    { id: 'rose-gold-premium', name: '🌹 Rose Gold', desc: 'Eksklusif, mewah, kemilau asmara', preview: 'bg-amber-100 border-[#eed6cd]' }
  ];

  return (
    <div className="space-y-6 pb-6 text-left">
      
      {/* HEADER */}
      <div>
        <h2 className="font-serif text-2xl font-bold tracking-tight">⚙️ Pengaturan & Profil</h2>
        <p className={`text-xs ${colors.subText}`}>Kustomisasi profil cinta, beralih tema estetik, dan kelola pertahanan privasi.</p>
      </div>

      {/* RENDER VIEW: PRINT SPECIFIC STYLE BOOKLET (HIDE IN SCREEN DIRECTIVITY, BUT AWESOME FOR PRINT SHIELD AT PRINT MEDIA CHECK) */}
      <div className="hidden print:block p-8 bg-white text-stone-900 text-left font-serif space-y-4">
        <center>
          <h1 className="text-3xl font-extrabold uppercase tracking-wider">Our Love Story Booklet</h1>
          <p className="text-stone-500 italic">"Abadi, aman, dan romantis untuk selama-lamanya" ❤️</p>
          <hr className="my-4 border-stone-300" />
        </center>
        
        <div className="space-y-2">
          <p><b>Daftar Pasangan Cinta:</b> {profile.name1} (Panggilan: {profile.nickname1}) & {profile.name2} (Panggilan: {profile.nickname2})</p>
          <p><b>Hari Jadian Bahagia:</b> {profile.anniversaryDate}</p>
          <p><b>Kode Jurnal Cinta:</b> {profile.coupleCode || 'N/A'}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="p-3 border rounded text-center">
            <span className="text-sm font-bold block text-stone-500">Momen Terabadikan</span>
            <span className="text-xl font-bold">{memoriesCount} Foto</span>
          </div>
          <div className="p-3 border rounded text-center">
            <span className="text-sm font-bold block text-stone-500">Surat Sanubari</span>
            <span className="text-xl font-bold">{lettersCount} Surat</span>
          </div>
        </div>

        <p className="text-[10px] text-stone-400 text-center italic mt-12 border-t pt-4">Buku harian digital ini dicetak secara sah melalui "Our Love Story" pada {new Date().toLocaleDateString('id-ID')}.</p>
      </div>

      {/* THEME SELECTION BENTO CARDS */}
      <div className={`p-5 rounded-3xl ${colors.cardBg} border shadow-inner`}>
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-rose-500" />
          <h3 className="font-serif text-sm font-bold text-stone-850">Ganti Tema Romantis</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {THEMES_LIST.map((themeElem) => (
            <button
              key={themeElem.id}
              onClick={() => onChangeTheme(themeElem.id)}
              className={`p-3.5 rounded-2xl border text-left flex flex-col gap-2 transition-all duration-300 select-none cursor-pointer ${
                theme === themeElem.id 
                  ? 'border-rose-400 bg-white ring-2 ring-rose-200 shadow' 
                  : 'border-stone-100/60 bg-white/40 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-extrabold text-stone-900">{themeElem.name}</span>
                <div className={`w-3.5 h-3.5 rounded-full border ${themeElem.preview}`} />
              </div>
              <p className="text-[10px] text-stone-400 italic leading-snug">{themeElem.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* EDIT PROFILE CARD DETAILS */}
      <div className={`p-5 rounded-3xl ${colors.cardBg} border shadow-sm`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Smile className="w-5 h-5 text-rose-500" />
            <h3 className="font-serif text-sm font-bold text-stone-850">Informasi Kekasih</h3>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Profil</span>
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="space-y-3 text-xs leading-relaxed text-stone-700">
            <div className="grid grid-cols-2 gap-2 border-b border-stone-200/40 pb-2">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Pihak Pertama</span>
                <span className="font-bold text-stone-850">{profile.name1}</span>
                <span className="text-[10px] text-stone-500 italic block mt-0.5">({profile.nickname1})</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Pihak Kedua</span>
                <span className="font-bold text-stone-850">{profile.name2}</span>
                <span className="text-[10px] text-stone-500 italic block mt-0.5">({profile.nickname2})</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Anniversary Jadian</span>
                <span className="font-serif font-bold text-stone-850">{profile.anniversaryDate}</span>
              </div>
              <div className="text-right">
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Unique Couple Code</span>
                <span className="font-mono font-bold text-rose-500">{profile.coupleCode || "LOVE-DEFAULT"}</span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">Nama Kamu</label>
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">Nama Pasangan</label>
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">Panggilan Kamu</label>
                <input
                  type="text"
                  value={nickname1}
                  onChange={(e) => setNickname1(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 bg-white border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">Panggilan Pasangan</label>
                <input
                  type="text"
                  value={nickname2}
                  onChange={(e) => setNickname2(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 bg-white border border-stone-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">Hari Jadian (Anniversary)</label>
              <input
                type="date"
                value={annDate}
                onChange={(e) => setAnnDate(e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-stone-200 rounded-xl font-mono"
                required
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 border rounded-xl text-xs font-semibold text-stone-500 cursor-pointer text-center"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-rose-400 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold cursor-pointer text-center"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        )}
      </div>

      {/* EMBED STATISTIC COUNTS SUMMARY */}
      <div className={`p-5 rounded-3xl ${colors.cardBg} border shadow-sm`}>
        <div className="text-center">
          <span className="text-[10px] font-mono tracking-widest text-[#aa6f5e] font-bold uppercase block mb-3">Statistik Ruangan Kita</span>
          
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white/50 p-2 rounded-xl border border-stone-100">
              <span className="font-mono text-lg font-bold text-rose-500">{memoriesCount}</span>
              <span className="text-[9px] text-stone-500 block mt-1">Photo</span>
            </div>
            <div className="bg-white/50 p-2 rounded-xl border border-stone-100">
              <span className="font-mono text-lg font-bold text-purple-500">{lettersCount}</span>
              <span className="text-[9px] text-stone-500 block mt-1">Letter</span>
            </div>
            <div className="bg-white/50 p-2 rounded-xl border border-stone-100">
              <span className="font-mono text-lg font-bold text-blue-500">{songsCount}</span>
              <span className="text-[9px] text-stone-500 block mt-1">Song</span>
            </div>
            <div className="bg-white/50 p-2 rounded-xl border border-stone-100">
              <span className="font-mono text-lg font-bold text-amber-500">{bucketCount}</span>
              <span className="text-[9px] text-stone-500 block mt-1">Dream</span>
            </div>
          </div>
        </div>
      </div>

      {/* EXPORT BOOKLET SECTIONS */}
      <div className={`p-5 rounded-3xl ${colors.cardBg} border shadow-sm bg-gradient-to-r from-red-50/25 to-pink-50/25`}>
        <div className="flex items-center gap-2 mb-2">
          <Download className="w-5 h-5 text-rose-500" />
          <h3 className="font-serif text-sm font-bold text-stone-850">Ekspor Data & Cetak Booklet Cinta</h3>
        </div>
        <p className="text-[10px] text-stone-500 leading-relaxed mb-4 italic">
          Ingin membukukan seluruh kenangan cinta kalian berdua? Cetak rangkuman data hubungan kalian menjadi PDF lembaran cetak estetika yang patut disimpan secara fisik.
        </p>

        <button
          onClick={handleTriggerPrint}
          className="w-full py-3 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-xl text-xs font-bold shadow hover:shadow-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Cetak PDF Jurnal Cinta 🖨️❤️</span>
        </button>
      </div>

      {/* PRIVACY PROTECTIONS COMPILER */}
      <div className={`p-5 rounded-3xl ${colors.cardBg} border shadow-sm`}>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-rose-500" />
          <h3 className="font-serif text-sm font-bold text-stone-850">Kunci Keamanan Biometrik & PIN</h3>
        </div>

        <div className="space-y-3">
          {/* PIN Logic UI */}
          <div className="flex items-center justify-between p-2.5 bg-white/50 rounded-xl border border-stone-100 text-xs">
            <div>
              <span className="font-semibold block text-stone-850">Kunci Keamanan Kode PIN</span>
              <span className="text-[9px] text-stone-400 italic">Minta PIN 4 digit setelah memuat ulang app</span>
            </div>
            
            <button
              onClick={handleTogglePin}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                isPinLocked 
                  ? "bg-rose-50 text-rose-600 border border-rose-300" 
                  : "bg-stone-100 text-stone-600"
              }`}
            >
              {isPinLocked ? "Aktif: PIN" : "Aktifkan"}
            </button>
          </div>

          {/* Simulated PIN configuration popup box */}
          {showPinSetup && (
            <form onSubmit={handleConfirmPinSetup} className="p-3 bg-rose-50/50 border border-pink-100 rounded-xl">
              <span className="block text-[11px] font-semibold text-rose-900 mb-1 leading-snug">Buat Kode PIN Baru (4 Angka):</span>
              <div className="flex gap-2">
                <input
                  type="password"
                  maxLength={4}
                  placeholder="Ketik 4 digit PIN"
                  value={setupPin}
                  onChange={(e) => setSetupPin(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-mono tracking-widest text-center"
                  required
                />
                <button
                  type="submit"
                  className="px-4 bg-rose-400 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Confirm PIN
                </button>
              </div>
            </form>
          )}

          {/* Simulated TouchID / FaceID Logic */}
          <div className="flex items-center justify-between p-2.5 bg-white/50 rounded-xl border border-stone-100 text-xs">
            <div>
              <span className="font-semibold block text-stone-850">Simulasikan Face ID / Fingerprint</span>
              <span className="text-[9px] text-stone-400 italic">Verifikasi instan melalui biometrik ponsel</span>
            </div>
            
            <button
              onClick={() => {
                setFaceIdEnabled(!faceIdEnabled);
                alert(`Face ID / Touch ID ${!faceIdEnabled ? "telah disimulasikan aktif" : "dinonaktifkan"}!`);
              }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                faceIdEnabled 
                  ? "bg-rose-50 text-rose-600 border border-rose-300" 
                  : "bg-stone-100 text-stone-600"
              }`}
            >
              {faceIdEnabled ? "Aktif: FaceID" : "Aktifkan"}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
