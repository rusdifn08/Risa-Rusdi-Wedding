import type { WeddingConfig } from "@/types";

/**
 * SATU-SATUNYA sumber data undangan.
 * Ganti semua nilai placeholder di file ini tanpa menyentuh komponen.
 */
export const wedding: WeddingConfig = {
  couple: {
    bride: {
      role: "bride",
      shortName: "Risa",
      fullName: "Risa Hanipah, A.Md.Ak",
      parents: "Putri pertama dari Bapak Iwan Setiawan & Ibu Nenden Halimah",
      photo: "/images/couple-risa.jpg",
      instagram: "risahanipah",
    },
    groom: {
      role: "groom",
      shortName: "Rusdi",
      fullName: "Rusdi Fadli Nuryuda, S.Pd",
      parents: "Putra kedua dari Bapak Wahyu Turnawan & Ibu Neneng Nurlaela",
      photo: "/images/couple-rusdi.jpg",
      instagram: "rusdifadli",
    },
    quote: {
      text: "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
      source: "QS. Ar-Rum: 21",
    },
    openingMessage:
      "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan resepsi pernikahan putra-putri kami. Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
  },
  events: {
    akad: {
      id: "akad",
      title: "Akad Nikah",
      dateIso: "2027-01-25",
      dayLabel: "Senin",
      dateLabel: "25 Januari 2027",
      timeStart: "07.00",
      timeEnd: "09.00",
      venue: "Masjid Raya Al-Jabbar",
      address: "Jl. Cimincrang No.14, Cimenerang, Kec. Gedebage, Kota Bandung, Jawa Barat 40292",
      mapsQuery: "Masjid Raya Al-Jabbar Bandung",
    },
    resepsi: {
      id: "resepsi",
      title: "After Akad",
      dateIso: "2027-01-25",
      dayLabel: "Senin",
      dateLabel: "25 Januari 2027",
      timeStart: "11.00",
      timeEnd: "14.00",
      venue: "Kediaman Mempelai",
      address: "Jl. Riung Purna VIII No.33, Cisaranten Kidul, Kec. Gedebage, Kota Bandung, Jawa Barat 40295",
      mapsQuery: "Jl. Riung Purna VIII No.33 Cisaranten Kidul Gedebage Bandung",
    },
  },
  countdownTargetIso: "2027-01-25T08:00:00+07:00",
  gallery: [
    { src: "/images/gallery-1.jpg", alt: "Momen bahagia kami — berkeliling kota", ratio: "portrait" },
    { src: "/images/gallery-2.jpg", alt: "Momen bahagia kami — kebersamaan", ratio: "square" },
    { src: "/images/gallery-3.jpg", alt: "Momen bahagia kami — cerita perjalanan", ratio: "portrait" },
    { src: "/images/gallery-4.jpg", alt: "Momen bahagia kami — petualangan", ratio: "square" },
    { src: "/images/gallery-5.jpg", alt: "Momen bahagia kami — senja bersama", ratio: "portrait" },
    { src: "/images/gallery-6.jpg", alt: "Momen bahagia kami — di puncak", ratio: "landscape" },
    { src: "/images/gallery-7.jpg", alt: "Ilustrasi air mancur & burung taman", ratio: "portrait" },
    { src: "/images/gallery-8.jpg", alt: "Ilustrasi gerbang mawar taman", ratio: "landscape" },
  ],
  gifts: {
    accounts: [
      { id: "bca", bank: "BCA", number: "1234567890", holder: "Risa Hanipah" },
      { id: "mandiri", bank: "Mandiri", number: "9876543210", holder: "Rusdi Fadli Nuryuda" },
    ],
    qris: {
      label: "QRIS — Semua e-wallet & m-banking",
      payload:
        "00020101021126610014ID.CO.QRIS.WWW011899990000000000000210210000000000000000303UMI51440014ID.CO.QRIS.WWW5802ID5915UndanganContoh6007Bandung6304ABCD",
    },
  },
  dressCode: {
    title: "Dress Code",
    description:
      "Kami mengundang Anda untuk mengenakan busana dengan nuansa Ice Blue, Casual Black, atau Broken White sebagai wujud kebersamaan di hari bahagia kami.",
    swatches: [
      { name: "Ice Blue", hex: "#D4E3EE" },
      { name: "Casual Black", hex: "#1F2225" },
      { name: "Broken White", hex: "#F7F4EC" },
    ],
  },
  audio: {
    src: "/audio/bgm.mp3",
    title: "Musik Latar",
  },
  site: {
    name: "Risa & Rusdi Wedding",
    url: "https://undangan-risa-rusdi.example.com",
    hashtag: "#RisaRusdiSelamanya",
  },
};

export const NAV_ITEMS = [
  { id: "beranda", label: "Beranda", icon: "home" },
  { id: "mempelai", label: "Mempelai", icon: "heart" },
  { id: "acara", label: "Acara", icon: "calendar" },
  { id: "galeri", label: "Galeri", icon: "image" },
  { id: "rsvp", label: "RSVP", icon: "send" },
  { id: "amplop", label: "Amplop", icon: "gift" },
] as const;
