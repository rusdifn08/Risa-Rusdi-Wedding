import type { Metadata, Viewport } from "next";
import { Great_Vibes, Inter, Playfair_Display } from "next/font/google";
import { wedding } from "@/config/wedding";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-greatvibes",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(wedding.site.url),
  title: {
    default: `Undangan Pernikahan ${wedding.couple.bride.shortName} & ${wedding.couple.groom.shortName}`,
    template: `%s · ${wedding.site.name}`,
  },
  description:
    "Kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami. Doa restu Anda adalah hadiah terindah bagi kami.",
  keywords: [
    "undangan pernikahan",
    "undangan digital",
    "wedding invitation",
    wedding.site.name,
  ],
  openGraph: {
    type: "website",
    siteName: wedding.site.name,
    title: `${wedding.couple.bride.shortName} & ${wedding.couple.groom.shortName} Wedding`,
    description: `Sabtu, ${wedding.events.resepsi.dateLabel} — Kami menanti kehadiran Anda.`,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: wedding.site.name }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f0e9" },
    { media: "(prefers-color-scheme: dark)", color: "#121c22" },
  ],
};

/**
 * Skrip anti-FOUC: terapkan tema tersimpan sebelum paint pertama.
 * Default: light (tema utama undangan).
 */
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      {/* suppressHydrationWarning: ekstensi browser (Grammarly, LastPass,
          Dark Reader, dll.) kerap menyuntik atribut sebelum React hidrasi. */}
      <body suppressHydrationWarning className="flex min-h-dvh flex-col">
        {children}
      </body>
    </html>
  );
}
