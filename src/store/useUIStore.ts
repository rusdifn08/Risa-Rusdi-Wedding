import { create } from "zustand";

interface UIState {
  /** Cover/lock-screen masih menutupi konten utama */
  isCoverOpen: boolean;
  /** Status musik latar global */
  isAudioPlaying: boolean;
  openCover: () => void;
  toggleAudio: () => void;
  setAudioPlaying: (playing: boolean) => void;
}

/**
 * Store UI global (pola sesuai PRD §6).
 * HeroSection memanggil openCover(); AudioPlayer bereaksi
 * terhadap perubahan isAudioPlaying tanpa re-render komponen lain.
 */
export const useUIStore = create<UIState>((set) => ({
  isCoverOpen: false,
  isAudioPlaying: false,

  openCover: () => set({ isCoverOpen: true, isAudioPlaying: true }),

  toggleAudio: () =>
    set((state) => ({
      isAudioPlaying: !state.isAudioPlaying,
    })),

  setAudioPlaying: (playing) => set({ isAudioPlaying: playing }),
}));
