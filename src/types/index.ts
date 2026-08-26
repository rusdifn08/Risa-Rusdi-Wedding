export type AttendanceStatus = "hadir" | "berhalangan" | "ragu";

export interface CoupleMember {
  role: "bride" | "groom";
  shortName: string;
  fullName: string;
  parents: string;
  photo: string;
  instagram?: string;
}

export interface EventDetail {
  id: "akad" | "resepsi";
  title: string;
  dateIso: string;
  dayLabel: string;
  dateLabel: string;
  timeStart: string;
  timeEnd: string;
  venue: string;
  address: string;
  mapsQuery: string;
}

export interface GiftAccount {
  id: string;
  bank: string;
  number: string;
  holder: string;
}

export type GalleryRatio = "portrait" | "square" | "landscape";

export interface GalleryItem {
  src: string;
  alt: string;
  ratio: GalleryRatio;
}

export interface RsvpEntry {
  id: string;
  name: string;
  attendance: AttendanceStatus;
  guestCount: number;
  message: string | null;
  createdAt: string;
}

export interface DressCodeInfo {
  title: string;
  description: string;
  swatches: { name: string; hex: string }[];
}

export interface WeddingConfig {
  couple: {
    bride: CoupleMember;
    groom: CoupleMember;
    quote: { text: string; source: string };
    openingMessage: string;
  };
  events: {
    akad: EventDetail;
    resepsi: EventDetail;
  };
  countdownTargetIso: string;
  gallery: GalleryItem[];
  gifts: {
    accounts: GiftAccount[];
    qris: { label: string; payload: string };
  };
  dressCode: DressCodeInfo;
  audio: { src: string; title: string };
  site: {
    name: string;
    url: string;
    hashtag: string;
  };
}
