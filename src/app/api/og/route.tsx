import { ImageResponse } from "next/og";
import { wedding } from "@/config/wedding";

// Runtime Node.js (default) — Edge deprecated sejak Next.js 16.
const CREAM = "#f2f0e9";
const GOLD = "#c7a252";
const INK = "#3b5964";
const MUTED = "#6e7f86";
const BLUE = "#3b5964";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guest = (searchParams.get("guest") ?? "").trim() || "Tamu Undangan";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: CREAM,
          position: "relative",
        }}
      >
        {/* Bingkai ganda ala kartu undangan */}
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: `2px solid ${GOLD}`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 40,
            border: `1px solid ${GOLD}`,
            opacity: 0.55,
            display: "flex",
          }}
        />

        {/* Ornamen sudut */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            width: 56,
            height: 56,
            borderTop: `4px solid ${GOLD}`,
            borderLeft: `4px solid ${GOLD}`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 28,
            width: 56,
            height: 56,
            borderBottom: `4px solid ${GOLD}`,
            borderRight: `4px solid ${GOLD}`,
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 8,
              color: BLUE,
              textTransform: "uppercase",
            }}
          >
            Undangan Pernikahan
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 96,
              color: INK,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            {wedding.couple.bride.shortName} &amp; {wedding.couple.groom.shortName}
          </div>

          <div
            style={{
              display: "flex",
              width: 320,
              height: 2,
              backgroundColor: GOLD,
              opacity: 0.7,
            }}
          />

          <div style={{ display: "flex", fontSize: 30, color: BLUE }}>
            {wedding.events.resepsi.dayLabel}, {wedding.events.resepsi.dateLabel}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 26,
              gap: 8,
            }}
          >
            <div style={{ display: "flex", fontSize: 24, color: MUTED }}>
              Kepada Yth. Bapak/Ibu/Saudara/i
            </div>
            <div style={{ display: "flex", fontSize: 40, color: INK, fontWeight: 600 }}>
              {guest}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
