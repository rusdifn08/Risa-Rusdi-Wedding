"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { HeroCover } from "@/components/organisms/HeroCover";
import { CoupleProfileSection } from "@/components/organisms/CoupleProfileSection";
import { EventDetailsSection } from "@/components/organisms/EventDetailsSection";
import { GallerySection } from "@/components/organisms/GallerySection";
import { RsvpSection } from "@/components/organisms/RsvpSection";
import { GiftSection } from "@/components/organisms/GiftSection";
import { FooterSection } from "@/components/organisms/FooterSection";
import { BottomNav } from "@/components/organisms/BottomNav";
import { AudioPlayer } from "@/components/organisms/AudioPlayer";
import { ScrollProgress } from "@/components/organisms/ScrollProgress";
import { ScrollMarquee } from "@/components/organisms/ScrollMarquee";
import { PaperTexture } from "@/components/organisms/PaperTexture";
import { Toaster } from "@/components/organisms/Toaster";
import { useUIStore } from "@/store/useUIStore";

export interface InvitationTemplateProps {
  guestName: string;
  initialCountdownSeconds: number;
}

/**
 * Template (PRD §5.4): menyusun urutan section
 * Hero → Profil → Acara → Galeri → RSVP → Amplop → Footer
 * dengan spacing konsisten, plus kontrol global (nav, audio, toast, tema).
 */
export function InvitationTemplate({
  guestName,
  initialCountdownSeconds,
}: InvitationTemplateProps) {
  const isCoverOpen = useUIStore((s) => s.isCoverOpen);

  // Kunci scroll selama cover/lock-screen terbuka
  useEffect(() => {
    document.documentElement.style.overflow = isCoverOpen ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isCoverOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <div id="beranda" className="relative flex-1">
        <AnimatePresence>
          <HeroCover guestName={guestName} />
        </AnimatePresence>

        <main>
          <CoupleProfileSection />
          <EventDetailsSection initialCountdownSeconds={initialCountdownSeconds} />
          <GallerySection />
          <ScrollMarquee />
          <RsvpSection />
          <GiftSection />
        </main>

        <FooterSection />

        {/* Kontrol global */}
        <ScrollProgress />
        <PaperTexture />
        <div className="fixed right-4 top-4 z-40">
          <ThemeToggle />
        </div>
        <AudioPlayer />
        <BottomNav />
        <Toaster />
      </div>
    </MotionConfig>
  );
}
