import { AppState } from "./types";

export const INITIAL_STATE: AppState = {
  profile: {
    name1: "Agustian Diki",
    name2: "Aurelia Stella",
    nickname1: "Diki Sayang",
    nickname2: "Stella Sayang",
    avatar1: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    avatar2: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    anniversaryDate: "2024-10-18",
    coupleCode: "LOVE-2024-DIKISTELLA",
    isPartnerConnected: true
  },
  memories: [
    {
      id: "mem-1",
      title: "Senja Pertama di Pantai Kuta",
      date: "2024-11-23",
      location: "Pantai Kuta, Bali",
      story: "Saat itu ombak terasa sangat bersahabat. Kita duduk berdampingan di atas pasir hangat, menyaksikan langit berganti warna menjadi oranye keemasan. Kamu menyandarkan kepalamu di bahuku untuk pertama kalinya. Di momen itulah aku tahu, aku ingin menghabiskan sisa senja dalam hidupku hanya bersamamu.",
      mood: "Romantic",
      imageUrl: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800",
      reactions: { love: 14, emotional: 8, special: 12, favorite: 10 },
      isFavorite: true
    },
    {
      id: "mem-2",
      title: "Kopi Hangat Saat Hujan Deras",
      date: "2024-12-14",
      location: "Sebuah Kafe Teduh, Bandung",
      story: "Hujan turun deras sekali sore itu sampai jalanan banjir. Kita terjebak di kafe kecil selama 3 jam hangat. Kita memesan dua cangkir capuccino hangat, berbagi sepotong croissant cokelat, dan mengobrol tentang segala hal dari masa kecil hingga impian konyol kita. Waktu terasa berhenti mengalir.",
      mood: "Happy",
      imageUrl: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?auto=format&fit=crop&q=80&w=800",
      reactions: { love: 9, emotional: 3, special: 8, favorite: 4 },
      isFavorite: false
    },
    {
      id: "mem-3",
      title: "Kejutan Ulang Tahun Terindah",
      date: "2025-05-12",
      location: "Suaka Taman Kota, Jakarta",
      story: "Kamu mengetuk pintu rumahku tepat pukul 12 malam dengan membawa sekotak kecil donat buatan tanganmu sendiri dengan lilin angka yang miring. Wajahmu terlihat sangat mengantuk tapi penuh kebahagiaan. Aku menutup mataku dan berdoa agar kamu selalu ada di setiap pertambahan usiaku.",
      mood: "Special",
      imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800",
      reactions: { love: 18, emotional: 15, special: 11, favorite: 9 },
      isFavorite: true
    }
  ],
  letters: [
    {
      id: "let-1",
      title: "Untuk Kamu Penenang Rinduku",
      date: "2025-02-14",
      senderName: "Agustian Diki",
      recipientName: "Aurelia Stella",
      content: "Selamat Hari Kasih Sayang, cantiknya aku.\n\nSetiap hari yang kulalui bersamamu selalu terasa seperti sebuah berkat yang luar biasa. Aku masih sering tersenyum sendiri ketika mengingat pesan pertama kita atau tawa pertamamu yang malu-malu saat kita bertemu.\n\nTerima kasih karena sudah menjadi tempat pulang paling hangat, pendengar cerita yang sabar, dan pendukung nomor satuku. Maafkan aku jika terkadang jarak kita terasa melelahkan, tapi percayalah, rindu ini adalah pengingat betapa berharganya dirimu bagiku.\n\nAku mencintaimu, hari ini, esok, dan selamanya.",
      paperStyle: "pink-rose",
      isFavorite: true,
      sentimentAnalysis: {
        score: 98,
        tone: "Cinta Sejati & Harapan Tinggi",
        analysis: "Surat cinta ini dipenuhi ketulusan batin yang magis dan damai. Penggunaan metafora 'tempat pulang paling hangat' menunjukkan tingkat keamanan keterikatan emosional (secure attachment) yang sangat matang dalam hubungan. Bahasa cinta di dalamnya didominasi oleh Words of Affirmation.",
        keyThemes: ["Keamanan Emosional", "Rasa Syukur Mendalam", "Keterikatan Jiwa"],
        loveAdvice: "Pertahankan ketukaran emosi secara transparan ini. Kirimkan bunga kecil atau surat tulisan tangan ke rumahnya minggu depan tanpa memberi tahu terlebih dahulu!"
      }
    },
    {
      id: "let-2",
      title: "Janji Kecil di Balik Senyumanmu",
      date: "2025-04-20",
      senderName: "Aurelia Stella",
      recipientName: "Agustian Diki",
      content: "Diki Sayang...\n\nTerima kasih ya sudah memegang tanganku dengan sangat erat di kala badai di kepalaku melelahkan. Aku tahu aku bukan orang yang mudah dimengerti, tapi kesabaranmu membuatku merasa begitu dicintai di dunia ini. \n\nMari kita terus melangkah bersama ya? Saling menjaga, saling memaafkan, dan saling merangkul di setiap kelok perjalanan hubungan ini. Aku sangat beruntung memilikimu.",
      paperStyle: "vintage-creamy",
      isFavorite: false,
      sentimentAnalysis: {
        score: 94,
        tone: "Komitmen Batin & Apresiasi",
        analysis: "Ungkapan ini menunjukkan penghargaan tertinggi atas kesabaran pasangan sebagai stabilizer emosional. Ada nuansa kerentanan diri yang indah, yang memperkuat rasa ketergantungan sehat (healthy dependency) dalam menjaga relasi intim jangka panjang.",
        keyThemes: ["Dukungan Kejiwaan", "Saling Menerima", "Pertumbuhan Bersama"],
        loveAdvice: "Malam ini, katakan padanya betapa berartinya kelembutan sikapnya bagimu. Saling memijat tangan satu sama lain sambil mengobrol santai bisa menjadi bonding yang sangat romantis."
      }
    }
  ],
  timeline: [
    {
      id: "time-1",
      title: "Sapaan Hangat Pertama (First Chat)",
      date: "2024-09-02",
      description: "Pertama kali aku mengumpulkan keberanian mengirim pesan pendek lewat Instagram DM. Membahas tentang buku bacaan yang kamu posting di Story. Siapa sangka dari chat kecil itu, hari ini kita berjalan bersama.",
      iconType: "chat"
    },
    {
      id: "time-2",
      title: "Pertemuan Pertama (First Date)",
      date: "2024-09-15",
      description: "Kita bertemu di kedai kopi kecil di sudut Jakarta Selatan. Kamu mengenakan dress krem bermotif bunga kecil, dan aku sangat gugup sampai-sampai menjatuhkan sendok kopiku dua kali. Senyummu hari itu tidak akan pernah bisa kulupakan.",
      iconType: "heart"
    },
    {
      id: "time-3",
      title: "Resmi Bersama (Jadian) ❤️",
      date: "2024-10-18",
      description: "Di bawah lampu-lampu taman kota yang berpijar syahdu, aku menanyakan kepastian hubungan kita. Dengan rona merah di pipimu, kamu menjawab 'iya'. Hari terbaik yang merubah seluruh hidupku.",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      iconType: "ring"
    },
    {
      id: "time-4",
      title: "Liburan Berdua Pertama kali",
      date: "2024-11-20",
      description: "Perjalanan bersama ke Bali selama 4 hari. Naik motor menyusuri sawah Ubud, berburu kuliner lokal, tersesat di Uluwatu, dan tertawa sepanjang jalan. Kita belajar banyak tentang kebiasaan unik masing-masing.",
      imageUrl: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800",
      iconType: "plane"
    }
  ],
  songs: [
    {
      id: "song-1",
      title: "Perfect",
      artist: "Ed Sheeran",
      coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400",
      isFavorite: true,
      audioFileUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Playable aesthetic test lofi track
    },
    {
      id: "song-2",
      title: "Until I Found You",
      artist: "Stephen Sanchez",
      coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400",
      isFavorite: true,
      audioFileUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      id: "song-3",
      title: "Semata Karenamu",
      artist: "Mario G. Klau",
      coverUrl: "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?auto=format&fit=crop&q=80&w=400",
      isFavorite: false,
      audioFileUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
  ],
  bucketList: [
    { id: "bucket-1", title: "Menyaksikan matahari terbit berdua di Gunung Bromo", isCompleted: false },
    { id: "bucket-2", title: "Masak malam romantis bersama untuk merayakan jadian", isCompleted: true },
    { id: "bucket-3", title: "Membeli baju oversized rajutan kembaran (matching outfits)", isCompleted: true },
    { id: "bucket-4", title: "Menonton konser musik band favorit bersama-sama", isCompleted: false },
    { id: "bucket-5", title: "Menabung bersama untuk masa depan impian kita 💍", isCompleted: false }
  ],
  theme: "pink-romance"
};
