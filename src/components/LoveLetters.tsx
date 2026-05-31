import React, { useState } from "react";
import { LoveLetter, ThemeName } from "../types";
import { getThemeColors } from "./ThemeWrapper";
import { Heart, Sparkles, Send, Calendar, Clock, Trash2, Plus, Star, ChevronLeft, Edit3, BookOpen, AlertCircle } from "lucide-react";

interface LoveLettersProps {
  theme: ThemeName;
  letters: LoveLetter[];
  profile: { name1: string; name2: string; nickname1: string; nickname2: string };
  onAddLetter: (letter: LoveLetter) => void;
  onUpdateLetter: (updated: LoveLetter) => void;
  onDeleteLetter: (id: string) => void;
}

export default function LoveLetters({
  theme,
  letters,
  profile,
  onAddLetter,
  onUpdateLetter,
  onDeleteLetter
}: LoveLettersProps) {
  const colors = getThemeColors(theme);
  const [activeLetter, setActiveLetter] = useState<LoveLetter | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  // New Letter fields
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [senderName, setSenderName] = useState(profile.nickname1);
  const [recipientName, setRecipientName] = useState(profile.nickname2);
  const [selectedStyle, setSelectedStyle] = useState<'pink-rose' | 'vintage-creamy' | 'midnight-star' | 'lavender-lace'>('pink-rose');

  const handleOpenLetter = (letter: LoveLetter) => {
    setActiveLetter(letter);
    setIsWriting(false);
    setAnalysisError("");
  };

  const handleBackToList = () => {
    setActiveLetter(null);
    setIsWriting(false);
    setAnalysisError("");
  };

  const handleStartWriting = () => {
    setIsWriting(true);
    setActiveLetter(null);
    setNewTitle("");
    setNewContent("");
    setSenderName(profile.nickname1);
    setRecipientName(profile.nickname2);
  };

  const handleSaveLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert("Harap isi judul dan surat cinta Anda terlebih dahulu.");
      return;
    }

    const created: LoveLetter = {
      id: `letter-${Date.now()}`,
      title: newTitle,
      date: new Date().toISOString().split('T')[0],
      content: newContent,
      senderName,
      recipientName,
      paperStyle: selectedStyle,
      isFavorite: false
    };

    onAddLetter(created);
    setActiveLetter(created);
    setIsWriting(false);
  };

  const handleToggleFavorite = (letter: LoveLetter, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateLetter({
      ...letter,
      isFavorite: !letter.isFavorite
    });
    if (activeLetter?.id === letter.id) {
      setActiveLetter({
        ...activeLetter,
        isFavorite: !letter.isFavorite
      });
    }
  };

  const handleAnalyzeSentiment = async () => {
    if (!activeLetter) return;
    setIsAnalyzing(true);
    setAnalysisError("");

    try {
      const response = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          letterText: activeLetter.content,
          senderName: activeLetter.senderName,
          partnerName: activeLetter.recipientName
        })
      });

      if (!response.ok) {
        throw new Error("Gagal memperoleh kalkulasi sentimen dari server.");
      }

      const analysisData = await response.json();
      const updatedLetter: LoveLetter = {
        ...activeLetter,
        sentimentAnalysis: analysisData
      };

      onUpdateLetter(updatedLetter);
      setActiveLetter(updatedLetter);
    } catch (err: any) {
      console.error(err);
      setAnalysisError(err.message || "Gagal memanggil API kecerdasan emosional AI.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Typography/Background styling generator for romantic stationeries
  const getPaperClasses = (style: string) => {
    switch (style) {
      case "vintage-creamy":
        return {
          bg: "bg-[#fbf6ea] border-[#ebd9b4] shadow-yellow-50/10",
          font: "font-serif text-amber-900",
          accentLine: "border-amber-200/40",
          textColor: "text-[#543d22]",
          headerText: "text-[#473012] font-serif border-b border-amber-200/40 pb-2"
        };
      case "midnight-star":
        return {
          bg: "bg-[#0b0f19] border-[#1e294b] shadow-indigo-950/20 text-indigo-100",
          font: "font-sans tracking-wide text-indigo-100",
          accentLine: "border-indigo-900/30",
          textColor: "text-indigo-200/90",
          headerText: "text-pink-300 font-sans border-b border-indigo-900/50 pb-2"
        };
      case "lavender-lace":
        return {
          bg: "bg-[#fdfaff] border-[#e8dbfc] shadow-purple-50/10",
          font: "font-sans text-purple-950",
          accentLine: "border-purple-200/40",
          textColor: "text-[#524467]",
          headerText: "text-purple-950 border-b border-purple-200/40 pb-2"
        };
      case "pink-rose":
      default:
        return {
          bg: "bg-[#fff2f4] border-[#fbc9d3] shadow-pink-50/10",
          font: "font-sans text-rose-950",
          accentLine: "border-pink-200/40",
          textColor: "text-[#693a46]",
          headerText: "text-rose-900 border-b border-pink-200/40 pb-2"
        };
    }
  };

  return (
    <div className="space-y-6 pb-6">
      
      {/* HEADER SECTION */}
      {!activeLetter && !isWriting ? (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight">💌 Love Letters</h2>
            <p className={`text-xs ${colors.subText}`}>Diary cinta digital, tuliskan rindu dan rasa syukurmu.</p>
          </div>
          <button
            onClick={handleStartWriting}
            className={`px-4 py-2 rounded-xl text-xs font-semibold ${colors.accentBg} shadow-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer`}
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Surat</span>
          </button>
        </div>
      ) : (
        <button
          onClick={handleBackToList}
          className={`flex items-center gap-1 text-xs font-semibold ${colors.accentText} hover:underline mb-1 cursor-pointer`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Kotak Surat</span>
        </button>
      )}

      {/* RENDER VIEW: WRITE NEW LETTER */}
      {isWriting && (
        <div className={`p-6 rounded-3xl ${colors.cardBg} border shadow-lg transition-all`}>
          <div className="text-center mb-6">
            <span className="text-2xl">✒️</span>
            <h3 className="font-serif text-lg font-bold mt-1 text-rose-500">Curahkan Perasaanmu</h3>
            <p className={`text-[11px] ${colors.subText}`}>Pilihlah gaya kertas surat romantis kesukaan kalian.</p>
          </div>

          <form onSubmit={handleSaveLetter} className="space-y-4">
            {/* Stationery Select */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5">Gaya Kertas Khas:</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'pink-rose', emoji: '🌸', label: 'Pink Rose', bg: 'bg-[#fff5f6]' },
                  { id: 'vintage-creamy', emoji: '📜', label: 'Vintage', bg: 'bg-[#fbf7f0]' },
                  { id: 'midnight-star', emoji: '🌙', label: 'Cosmic', bg: 'bg-[#0f1424]' },
                  { id: 'lavender-lace', emoji: '💜', label: 'Lace', bg: 'bg-[#fcf8ff]' }
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStyle(st.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all pointer-events-auto cursor-pointer ${
                      selectedStyle === st.id 
                        ? 'border-rose-400 bg-rose-50 shadow-sm ring-1 ring-rose-300' 
                        : 'border-stone-200/60 hover:bg-stone-50 bg-white'
                    }`}
                  >
                    <span>{st.emoji}</span>
                    <span className="text-[10px] text-stone-500 scale-90">{st.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sender / Recepiant */}
            <div className="grid grid-cols-2 gap-3 pb-1">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">Dari:</label>
                <select
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-stone-50/80 border border-stone-200 rounded-lg focus:outline-none focus:border-rose-300"
                >
                  <option value={profile.nickname1}>{profile.nickname1} ({profile.name1})</option>
                  <option value={profile.nickname2}>{profile.nickname2} ({profile.name2})</option>
                  <option value="Seseorang yang Mencintaimu">Diriku (Rahasia) 🌹</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">Untuk Cantikku/Gantengku:</label>
                <select
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-stone-50/80 border border-stone-200 rounded-lg focus:outline-none focus:border-rose-300"
                >
                  <option value={profile.nickname2}>{profile.nickname2} ({profile.name2})</option>
                  <option value={profile.nickname1}>{profile.nickname1} ({profile.name1})</option>
                  <option value="Belahan Jiwaku">Belahan Jiwa 💖</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Judul Surat Cinta</label>
              <input
                type="text"
                placeholder="Contoh: Secangkir Rindu di kala Malam Dingin..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                maxLength={90}
                className="w-full px-3 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-serif focus:outline-none focus:border-rose-300"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Isi Surat Sanubari</label>
              <textarea
                rows={9}
                placeholder="Tuliskan semua rasa rindumu, impian jalinan cinta kalian, atau sekedar ungkapan terima kasih mendalam atas sabar dan setianya..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full px-4 py-4 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-rose-300 leading-relaxed font-sans"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-sm ${colors.accentBg} cursor-pointer active:scale-95 transition-all mt-2`}
            >
              <Send className="w-4 h-4 fill-white" />
              <span>Simpan & Kirim Surat Cinta 💌</span>
            </button>
          </form>
        </div>
      )}

      {/* RENDER VIEW: LETTER DETAILS (WITH STATIONERY + GEMINI EMOTIONAL SENTIMENT) */}
      {activeLetter && (
        <div className="space-y-6">
          {/* Stationery Paper */}
          {(() => {
            const paper = getPaperClasses(activeLetter.paperStyle);
            return (
              <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden transition-all ${paper.bg} ${paper.font}`}>
                {/* Heart decorative background stamp */}
                <div className="absolute top-10 right-10 text-9xl opacity-[0.03] select-none pointer-events-none fill-rose-900">❤️</div>
                
                {/* Back Link and Favorite Star */}
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="flex items-center gap-1.5 text-xs opacity-60">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activeLetter.date}</span>
                  </div>
                  
                  <div className="flex gap-2.5">
                    <button
                      onClick={(e) => handleToggleFavorite(activeLetter, e)}
                      className="p-1.5 rounded-full bg-white/40 border border-pink-200/20 text-rose-500 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Star className={`w-4 h-4 ${activeLetter.isFavorite ? "fill-rose-500 text-rose-500" : "text-stone-400"}`} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Hapus surat cinta berharga ini?")) {
                          onDeleteLetter(activeLetter.id);
                          handleBackToList();
                        }
                      }}
                      className="p-1.5 rounded-full bg-white/45 text-stone-400 hover:text-red-500 active:scale-95 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Letter Header */}
                <div className="mb-6 relative z-10">
                  <h3 className={`text-xl font-bold tracking-tight font-serif ${paper.headerText} mb-3`}>{activeLetter.title}</h3>
                  <div className="flex items-center gap-2 text-xs opacity-80 font-medium">
                    <span className="italic">Dari:</span>
                    <span className="underline decoration-wavy underline-offset-4">{activeLetter.senderName}</span>
                    <span className="italic scale-90 mx-1">→</span>
                    <span className="italic">Kepada:</span>
                    <span className="underline decoration-wavy underline-offset-4">{activeLetter.recipientName}</span>
                  </div>
                </div>

                {/* Letter Content lines */}
                <div className={`text-sm ${paper.textColor} leading-relaxed whitespace-pre-wrap tracking-wide font-light border-l-2 p-3 ${paper.accentLine} rounded-r relative z-10`}>
                  {activeLetter.content}
                </div>

                <div className="mt-8 text-right pr-4 italic text-xs opacity-50 relative z-10">
                  With all my love ❤️
                </div>
              </div>
            );
          })()}

          {/* SENSOR SENTIMEN / ANALISIS EMOSI AI (GEMINI POWERED) */}
          <div className={`p-6 rounded-3xl ${colors.cardBg} border shadow-lg relative overflow-hidden transition-all duration-300`}>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/5 rounded-full filter blur-xl" />
            
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-500 animate-bounce" />
              <h4 className="font-serif text-base font-bold text-stone-800">Analisis Sentimen & Kehangatan AI ❤️</h4>
            </div>

            {isAnalyzing ? (
              <div className="py-6 flex flex-col items-center text-center space-y-4">
                {/* Pulsing Loading Hearts */}
                <div className="flex gap-1.5 justify-center items-center h-10">
                  <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
                <div>
                  <p className="text-xs font-serif font-bold text-purple-900 animate-pulse">Menghayati getaran cinta di dalam surat...</p>
                  <p className="text-[10px] text-stone-400 mt-1 italic font-light">"Membaca batin terdalam, merangkai saran jalinan rasa..."</p>
                </div>
              </div>
            ) : activeLetter.sentimentAnalysis ? (
              <div className="space-y-4 pt-1 animate-fade-in">
                {/* Score and Sentiment Tone */}
                <div className="grid grid-cols-12 gap-3 items-center bg-purple-50/30 rounded-2xl p-4 border border-purple-100/30">
                  <div className="col-span-4 flex flex-col items-center justify-center border-r border-purple-100 pr-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500">Love Score</span>
                    <span className="text-3xl font-mono font-bold text-rose-500 mt-1">{activeLetter.sentimentAnalysis.score}%</span>
                  </div>

                  <div className="col-span-8 pl-1">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-purple-500 block mb-0.5">Nada Emosional</span>
                    <span className="text-sm font-serif font-bold text-stone-800 italic">" {activeLetter.sentimentAnalysis.tone} "</span>
                  </div>
                </div>

                {/* AI Sweet Analysis Interpretation */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500 block">Tafsir Kedalaman Jiwa:</span>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans italic bg-stone-50/50 p-3 rounded-xl border">
                    {activeLetter.sentimentAnalysis.analysis}
                  </p>
                </div>

                {/* Key Themes tags */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500 block mb-1.5">Pilar Cinta Terdeteksi:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLetter.sentimentAnalysis.keyThemes.map((th, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold px-2.5 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-full flex items-center gap-1"
                      >
                        ❤️ {th}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-purple-50 pt-3 mt-1">
                  <div className="bg-purple-50/50 border border-purple-100 p-3.5 rounded-2xl">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-purple-700 font-bold block mb-1">🌹 AI ROMANTIC ADVICE TO SECURE RELATIONSHIP:</span>
                    <p className="text-xs text-purple-950 font-serif leading-relaxed italic">
                      "{activeLetter.sentimentAnalysis.loveAdvice}"
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 bg-purple-50/20 border border-dashed border-purple-200 rounded-2xl px-4">
                <span className="text-xl">✨</span>
                <p className="text-xs font-serif font-bold text-stone-800 mt-1">Ingin Memahami Dinamika Rasa di Surat Ini?</p>
                <p className="text-[10px] text-stone-500 mt-1 mb-4 italic">Gemini AI akan menganalisis kadar kehangatan cinta, mendeteksi motif batin, memberi skor romantis, dan menyusun saran pemicu bahagia berdua.</p>
                
                {analysisError && (
                  <div className="mb-3 text-[10px] text-red-600 bg-red-50 p-2 rounded-lg flex items-center justify-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{analysisError}</span>
                  </div>
                )}

                <button
                  onClick={handleAnalyzeSentiment}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer flex items-center gap-2 mx-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                  <span>Analisis Perasaan dengan AI</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RENDER VIEW: LETTERS LIST */}
      {!activeLetter && !isWriting && (
        <div className="space-y-3">
          {letters.length === 0 ? (
            <div className={`p-8 text-center rounded-2xl ${colors.cardBg} border border-dashed`}>
              <span className="text-2xl">📭</span>
              <p className="text-xs text-stone-500 mt-2 italic">Belum ada surat cinta yang dikirimkan. Tulis surat pertamamu sekarang!</p>
            </div>
          ) : (
            letters.map((letter) => {
              const paper = getPaperClasses(letter.paperStyle);
              return (
                <div
                  key={letter.id}
                  onClick={() => handleOpenLetter(letter)}
                  className={`p-4 rounded-2xl border transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm cursor-pointer ${paper.bg} relative overflow-hidden flex items-start gap-3`}
                >
                  <div className="p-2.5 rounded-xl bg-white/50 text-base">💌</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-serif font-bold text-stone-900 truncate pr-4">{letter.title}</h4>
                      <button
                        onClick={(e) => handleToggleFavorite(letter, e)}
                        className="text-rose-500 active:scale-75 transition-all p-0.5 cursor-pointer"
                      >
                        <Star className={`w-3.5 h-3.5 ${letter.isFavorite ? "fill-rose-500 text-rose-500" : "text-stone-300"}`} />
                      </button>
                    </div>
                    
                    <p className={`text-xs ${paper.textColor} line-clamp-2 mt-1 pr-6 font-light leading-relaxed`}>
                      {letter.content}
                    </p>

                    <div className="flex items-center justify-between mt-3 text-[10px] opacity-60">
                      <div className="flex items-center gap-1 font-medium">
                        <span>Dari: <b>{letter.senderName}</b></span>
                      </div>
                      <div className="flex items-center gap-0.5 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{letter.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* AI stamp indicator */}
                  {letter.sentimentAnalysis && (
                    <div className="absolute top-0 right-0 p-1 bg-purple-500 text-white rounded-bl-xl text-[8px] font-mono uppercase tracking-wider scale-90">
                      AI Analyzed
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

    </div>
  );
}
