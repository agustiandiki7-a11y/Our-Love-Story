export type ThemeName = 'pink-romance' | 'elegant-white' | 'midnight-love' | 'lavender-dream' | 'rose-gold-premium';

export type MoodType = 'Romantic' | 'Happy' | 'Emotional' | 'Special' | 'Favorite';

export interface CoupleProfile {
  name1: string;
  name2: string;
  nickname1: string;
  nickname2: string;
  avatar1: string;
  avatar2: string;
  anniversaryDate: string; // YYYY-MM-DD
  coupleCode: string;
  isPartnerConnected: boolean;
}

export interface Memory {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  location: string;
  story: string;
  mood: MoodType;
  imageUrl: string;
  reactions: {
    love: number;
    emotional: number;
    special: number;
    favorite: number;
  };
  isFavorite: boolean;
}

export interface LoveLetter {
  id: string;
  title: string;
  date: string;
  content: string;
  senderName: string;
  recipientName: string;
  paperStyle: 'pink-rose' | 'vintage-creamy' | 'midnight-star' | 'lavender-lace';
  isFavorite: boolean;
  sentimentAnalysis?: {
    score: number;
    tone: string;
    analysis: string;
    keyThemes: string[];
    loveAdvice: string;
  };
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  imageUrl?: string;
  iconType: 'chat' | 'heart' | 'ring' | 'plane' | 'cake' | 'star' | 'camera';
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  isFavorite: boolean;
  spotifyLink?: string;
  audioFileUrl?: string; // standard mp3, we can stream beautiful lofi hooks!
}

export interface BucketItem {
  id: string;
  title: string;
  isCompleted: boolean;
  targetDate?: string;
}

export interface AppState {
  profile: CoupleProfile;
  memories: Memory[];
  letters: LoveLetter[];
  timeline: TimelineEvent[];
  songs: Song[];
  bucketList: BucketItem[];
  theme: ThemeName;
}
