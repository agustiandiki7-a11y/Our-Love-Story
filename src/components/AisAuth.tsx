import React, { useState } from "react";
import { CoupleProfile, ThemeName } from "../types";
import { getThemeColors } from "./ThemeWrapper";
import { Heart, Mail, Phone, Lock, Share2, Clipboard, ArrowRight, UserCheck, Sparkles, AlertCircle } from "lucide-react";

interface AisAuthProps {
  theme: ThemeName;
  onAuthComplete: (profile: CoupleProfile) => void;
  userEmail?: string;
}

export default function AisAuth({ theme, onAuthComplete, userEmail }: AisAuthProps) {
  const colors = getThemeColors(theme);
  const [step, setStep] = useState<'welcome' | 'login' | 'setup' | 'invite'>('welcome');
  const [loginMethod, setLoginMethod] = useState<'none' | 'google' | 'phone' | 'email'>('none');
  
  // Auth Form State
  const [email, setEmail] = useState(userEmail || "");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Setup Couple State
  const [name1, setName1] = useState(userEmail ? "Agustian Diki" : "");
  const [name2, setName2] = useState("Aurelia Stella");
  const [nickname1, setNickname1] = useState("Sayang D");
  const [nickname2, setNickname2] = useState("Sayang S");
  const [anniversaryDate, setAnniversaryDate] = useState("2024-10-18");
  const [avatar1, setAvatar1] = useState("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400");
  const [avatar2, setAvatar2] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400");

  // Generated Invitation details
  const [coupleCode, setCoupleCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleStartLogin = () => {
    setStep('login');
  };

  const handleGoogleLogin = () => {
    setLoginError("");
    setStep('setup');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
      setLoginError("Masukkan nomor telepon atau WhatsApp Anda.");
      return;
    }
    setIsOtpSent(true);
    setLoginError("");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) {
      setLoginError("Kode OTP harus 4 digit.");
      return;
    }
    setStep('setup');
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Email dan Password tidak boleh kosong.");
      return;
    }
    setStep('setup');
  };

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1 || !name2 || !anniversaryDate) {
      alert("Harap lengkapi nama kalian berdua beserta tanggal jadian.");
      return;
    }

    // Generate neat unique couple code
    const generatedCode = `LOVE-${name1.slice(0,3).toUpperCase()}${name2.slice(0,3).toUpperCase()}-${new Date(anniversaryDate).getFullYear()}`;
    setCoupleCode(generatedCode);
    setStep('invite');
  };

  const handleCopyCode = () => {
    const inviteLink = `${window.location.origin}?code=${coupleCode}`;
    navigator.clipboard.writeText(`Hai Sayang! Aku baru saja mendaftarkan album jurnal cinta kita di "Our Love Story". ❤️\n\nGunakan kode undangan eksklusif ini: *${coupleCode}*\natau klik link ini untuk bergabung: ${inviteLink}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const inviteLink = `${window.location.origin}?code=${coupleCode}`;
    const text = encodeURIComponent(`Hai Sayang! Aku baru saja mengaktifkan album cinta "Our Love Story" kita. ❤️\n\nHubungkan akunmu memakai kode jadian kita: *${coupleCode}*\natau klik link romantis ini untuk sinkronisasi real-time: ${inviteLink}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleConnectPartner = () => {
    const finalProfile: CoupleProfile = {
      name1,
      name2,
      nickname1: nickname1 || name1,
      nickname2: nickname2 || name2,
      avatar1,
      avatar2,
      anniversaryDate,
      coupleCode,
      isPartnerConnected: true
    };
    onAuthComplete(finalProfile);
  };

  return (
    <div className={`min-h-screen ${colors.mainBg} flex items-center justify-center p-5 relative overflow-hidden transition-all duration-300`}>
      {/* Soft Elegant Blur Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-[15%] left-[20%] w-72 h-72 bg-[#FBCFE8] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-[#FFF4F2] opacity-15 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-[#121110] border border-[#F3E8E2] dark:border-[#2a2825] rounded-[32px] p-6 sm:p-8 shadow-xs relative z-10">
        
        {/* Step 1: Welcome Screen */}
        {step === 'welcome' && (
          <div className="text-center py-4 flex flex-col items-center">
            {/* Elegant Minimalist Logo */}
            <div className="w-14 h-14 bg-[#FFF4F2] dark:bg-[#251f1d] rounded-full flex items-center justify-center mb-5 border border-[#F3E8E2]">
              <Heart className="w-6 h-6 text-[#D68D9A] fill-[#D68D9A]" />
            </div>
            
            <h1 className="font-serif text-2xl font-semibold text-stone-800 dark:text-stone-100 tracking-tight">
              Our Love Story
            </h1>
            <p className="text-[10px] font-mono text-[#D68D9A] mt-1.5 uppercase tracking-[0.25em] font-bold">
              Private Couple Album
            </p>
            
            {/* Vintage polaroid framing */}
            <div className="my-7 p-3 bg-white dark:bg-stone-900 border border-[#F3E8E2] rounded-2xl shadow-xs rotate-[-1deg] max-w-[240px] transform hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" 
                alt="Romantic couples"
                className="w-full aspect-[4/3] object-cover rounded-lg"
              />
              <div className="text-center pt-2.5">
                <span className="font-serif text-[11px] italic text-[#E9967A]">mia & felix 2024</span>
              </div>
            </div>

            <p className="text-stone-500 dark:text-stone-400 text-xs px-3 mb-8 leading-relaxed">
              "A quiet, safe, and romantic place where every little detail of our incredible journey lives forever."
            </p>

            <button
              onClick={handleStartLogin}
              className="w-full py-3.5 bg-[#FBCFE8] hover:bg-[#F9A8D4] text-white rounded-2xl font-medium shadow-xs transition-all duration-300 flex items-center justify-center gap-2 group active:scale-98 cursor-pointer"
            >
              <span className="tracking-wide text-xs uppercase font-bold text-rose-950/70">Mulai Cerita Kita</span>
              <ArrowRight className="w-4 h-4 text-rose-950/60 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Step 2: Login Options */}
        {step === 'login' && (
          <div className="py-2">
            <div className="text-center mb-6">
              <h2 className="font-serif text-xl font-bold text-stone-850 dark:text-stone-100">Welcome Back, Love</h2>
              <p className="text-xs text-stone-400 mt-1">Masuk untuk melihat ruangan cinta kalian berdua</p>
            </div>

            {loginError && (
              <div className="mb-4 bg-rose-50/50 dark:bg-rose-950/20 text-[#D68D9A] p-3 rounded-xl text-xs flex items-center gap-2 border border-rose-100/50">
                <AlertCircle className="w-4 h-4" />
                <span>{loginError}</span>
              </div>
            )}

            {loginMethod === 'none' ? (
              <div className="space-y-3">
                {/* Google login */}
                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-3.5 bg-white dark:bg-[#181716] hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 border border-[#F3E8E2] dark:border-stone-800 rounded-2xl font-medium transition-all flex items-center justify-center gap-3 shadow-xs active:scale-98 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">Continue with Google</span>
                </button>

                {/* WhatsApp login option */}
                <button
                  onClick={() => setLoginMethod('phone')}
                  className="w-full py-3.5 bg-[#FFF4F2] hover:bg-[#ffece8] text-[#E9967A] border border-[#F3E8E2] rounded-2xl font-medium transition-all flex items-center justify-center gap-3 shadow-xs active:scale-98 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#E9967A] fill-[#E9967A]/10" />
                  <span className="text-xs font-semibold uppercase tracking-wider">WhatsApp OTP</span>
                </button>

                {/* Email Option */}
                <button
                  onClick={() => setLoginMethod('email')}
                  className="w-full py-3.5 bg-stone-50 dark:bg-stone-900/40 hover:bg-stone-100 text-stone-600 dark:text-stone-300 border border-[#F3E8E2] rounded-2xl font-medium transition-all flex items-center justify-center gap-3 shadow-xs active:scale-98 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#D68D9A]" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Continue with Email</span>
                </button>
              </div>
            ) : (
              <div>
                {/* Back Link */}
                <button 
                  onClick={() => { setLoginMethod('none'); setLoginError(""); setIsOtpSent(false); }}
                  className="text-xs text-[#D68D9A] hover:underline mb-4 inline-block font-semibold cursor-pointer"
                >
                  ← Pilih metode masuk lainnya
                </button>

                {/* Phone Method Form */}
                {loginMethod === 'phone' && (
                  <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
                    {!isOtpSent ? (
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-1">Nomor WhatsApp</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                          <input 
                            type="tel"
                            placeholder="Contoh: 08123456789"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-stone-50/50 dark:bg-stone-905 border border-[#F3E8E2] dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:border-[#D68D9A] transition-colors"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full mt-4 py-3 bg-[#FBCFE8] hover:bg-[#F9A8D4] text-white rounded-xl font-bold uppercase tracking-wide text-xs transition-colors cursor-pointer"
                        >
                          Kirim Kode OTP
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="p-3 bg-[#FFF4F2] dark:bg-[#251f1d] border border-[#F3E8E2] rounded-xl text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
                          Kami telah mensimulasikan pengiriman kode OTP WhatsApp ke <b>{phoneNumber}</b>. Masukkan kode sembarang (contoh: 2026).
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-1">Kode Verifikasi (OTP)</label>
                          <div className="relative">
                            <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                            <input 
                              type="text"
                              maxLength={4}
                              placeholder="Ketik 4 digit angka"
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-stone-50/50 dark:bg-stone-905 border border-[#F3E8E2] dark:border-stone-800 rounded-xl text-sm font-mono text-center tracking-widest focus:outline-none focus:border-[#D68D9A]"
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3 bg-[#FBCFE8] hover:bg-[#F9A8D4] text-white rounded-xl font-bold uppercase tracking-wide text-xs transition-colors cursor-pointer"
                        >
                          Verifikasi & Masuk
                        </button>
                      </div>
                    )}
                  </form>
                )}

                {/* Email Method Form */}
                {loginMethod === 'email' && (
                  <form onSubmit={handleEmailLogin} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-1">Email</label>
                      <input 
                        type="email"
                        placeholder="agustiandiki7@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50/50 dark:bg-stone-905 border border-[#F3E8E2] dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:border-[#D68D9A]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-1">Password</label>
                      <input 
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50/50 dark:bg-stone-905 border border-[#F3E8E2] dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:border-[#D68D9A]"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-4 py-3 bg-[#FBCFE8] hover:bg-[#F9A8D4] text-white rounded-xl font-bold uppercase tracking-wide text-xs transition-colors cursor-pointer"
                    >
                      Masuk dengan Email
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Couple Account Setup */}
        {step === 'setup' && (
          <div className="py-2">
            <div className="text-center mb-5">
              <span className="text-2xl mb-1 block">💍</span>
              <h2 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-100">Detail Hubungan Kalian</h2>
              <p className="text-xs text-stone-400 mt-1">Mari buat halaman eksklusif pengabadi cinta kalian</p>
            </div>

            <form onSubmit={handleCreateStory} className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">Nama Kamu</label>
                <input 
                  type="text" 
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Contoh: Agustian Diki"
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-[#1c1917] border border-[#F3E8E2] dark:border-stone-800 rounded-xl text-xs focus:outline-none focus:border-[#D68D9A]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">Nama Pasanganmu</label>
                <input 
                  type="text" 
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Contoh: Aurelia Stella"
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-[#1c1917] border border-[#F3E8E2] dark:border-stone-800 rounded-xl text-xs focus:outline-none focus:border-[#D68D9A]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">Panggilanmu</label>
                  <input 
                    type="text" 
                    value={nickname1}
                    onChange={(e) => setNickname1(e.target.value)}
                    placeholder="Contoh: Diki Sayang"
                    className="w-full px-3 py-2.5 bg-stone-50 dark:bg-[#1c1917] border border-[#F3E8E2] dark:border-stone-800 rounded-xl text-xs focus:outline-none focus:border-[#D68D9A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">Panggilannya</label>
                  <input 
                    type="text" 
                    value={nickname2}
                    onChange={(e) => setNickname2(e.target.value)}
                    placeholder="Contoh: Stella Sayang"
                    className="w-full px-3 py-2.5 bg-stone-50 dark:bg-[#1c1917] border border-[#F3E8E2] dark:border-stone-800 rounded-xl text-xs focus:outline-none focus:border-[#D68D9A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">Hari Jadian (Anniversary)</label>
                <input 
                  type="date" 
                  value={anniversaryDate}
                  onChange={(e) => setAnniversaryDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-stone-50 dark:bg-[#1c1917] border border-[#F3E8E2] dark:border-stone-800 rounded-xl text-xs focus:outline-none focus:border-[#D68D9A] font-mono"
                  required
                />
              </div>

              <div className="border-t border-[#F3E8E2] dark:border-stone-800 pt-3">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">Aura Foto Profil</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-[#F3E8E2]">
                    <img src={avatar1} alt="Avatar 1" className="w-8 h-8 rounded-full object-cover border" />
                    <span className="text-[10px] text-stone-500 truncate">Felix/Kamu</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-[#F3E8E2]">
                    <img src={avatar2} alt="Avatar 2" className="w-8 h-8 rounded-full object-cover border" />
                    <span className="text-[10px] text-stone-500 truncate">Stella/Dia</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#FBCFE8] hover:bg-[#F9A8D4] text-white rounded-xl font-bold uppercase tracking-wide text-xs shadow-xs transition-colors mt-4 cursor-pointer"
              >
                Buat Jurnal Cinta Kita 🌹
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Couple Invitation System */}
        {step === 'invite' && (
          <div className="py-2 text-center animate-fade-in">
            <div className="w-14 h-14 bg-[#FFF4F2] dark:bg-stone-900 border border-[#F3E8E2] rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-[#D68D9A]" />
            </div>
            
            <h2 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100">Jurnal Siap Mengudara! ❤️</h2>
            <p className="text-xs text-stone-400 mt-1 px-4">
              Gunakan kode unik jadian di bawah agar saling terhubung secara kolaboratif.
            </p>

            {/* Code Box */}
            <div className="my-5 p-4 bg-stone-50 dark:bg-stone-900/60 border border-dashed border-[#F3E8E2] rounded-2xl relative">
              <span className="text-[9px] text-stone-400 block uppercase font-mono tracking-widest mb-1.5">Couple Code</span>
              <span className="font-mono text-base font-bold text-[#E9967A] select-all tracking-wide">{coupleCode}</span>
              
              <div className="flex justify-center gap-2 mt-3.5">
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-2 bg-white dark:bg-stone-800 border border-[#F3E8E2] rounded-lg text-[11px] font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-50 cursor-pointer flex items-center gap-1 active:scale-95 transition-all shadow-xs"
                >
                  {isCopied ? <UserCheck className="w-3 h-3 text-emerald-500" /> : <Clipboard className="w-3 h-3" />}
                  <span>{isCopied ? "Tersalin!" : "Salin Link"}</span>
                </button>

                <button
                  onClick={handleShareWhatsApp}
                  className="px-3 py-2 bg-[#FFF4F2] text-[#E9967A] border border-[#eed6cd] rounded-lg text-[11px] font-semibold hover:bg-rose-50 cursor-pointer flex items-center gap-1 active:scale-95 transition-all shadow-xs"
                >
                  <Share2 className="w-3 h-3" />
                  <span>Kirim WA</span>
                </button>
              </div>
            </div>

            <p className="text-[10px] text-stone-400 italic px-4 leading-relaxed mb-6">
              💡 Pasangan Anda dapat mendaftar dengan kode ini untuk sinkronisasi seketika di peranti apa pun.
            </p>

            <button
              onClick={handleConnectPartner}
              className="w-full py-3.5 bg-[#FBCFE8] hover:bg-[#F9A8D4] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Masuk Ke Ruang Cinta 🚪💕</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
