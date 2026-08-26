import type { Metadata } from "next";
import { wedding } from "@/config/wedding";
import { secondsRemaining } from "@/lib/date";
import { slugToGuestName } from "@/lib/guest";
import { buildEventJsonLd, buildGuestMetadata } from "@/lib/seo";
import { InvitationTemplate } from "@/components/templates/InvitationTemplate";

type GuestParams = Promise<{ guest: string }>;

/**
 * Route undangan personal: /firman-ardiansyah → "Firman Ardiansyah".
 * Slug dikonversi ke Title Case; nama tamu ikut tampil di cover,
 * metadata, dan OG image WhatsApp.
 */
export async function generateMetadata({
  params,
}: {
  params: GuestParams;
}): Promise<Metadata> {
  const { guest } = await params;
  return buildGuestMetadata(slugToGuestName(guest));
}

export default async function GuestPage({ params }: { params: GuestParams }) {
  const { guest } = await params;
  const guestName = slugToGuestName(guest);
  const initialCountdownSeconds = secondsRemaining(wedding.countdownTargetIso);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildEventJsonLd() }}
      />
      <InvitationTemplate
        guestName={guestName}
        initialCountdownSeconds={initialCountdownSeconds}
      />
    </>
  );
}
