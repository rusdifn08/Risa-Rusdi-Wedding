"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Icon } from "@/components/atoms/Icon";
import { BodyText, Heading, Subtitle } from "@/components/atoms/Typography";
import { CopyButton } from "@/components/molecules/CopyButton";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { wedding } from "@/config/wedding";
import { cn } from "@/lib/utils";
import type { GiftAccount } from "@/types";

type AccordionItem =
  | { kind: "account"; id: string; account: GiftAccount }
  | { kind: "qris"; id: string };

/** Organism: Amplop Digital — rekening + QRIS dalam accordion (PRD §3.6). */
export function GiftSection() {
  const { accounts, qris } = wedding.gifts;

  const items: AccordionItem[] = [
    ...accounts.map((account) => ({ kind: "account" as const, id: account.id, account })),
    { kind: "qris" as const, id: "qris" },
  ];

  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section id="amplop" className="px-6 py-20 sm:py-24" aria-labelledby="amplop-title">
      <div className="mx-auto flex max-w-xl flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Wedding Gift"
            title={<span id="amplop-title">Amplop Digital</span>}
            description="Doa restu Anda adalah hadiah terindah. Namun bila berkenan memberi tanda kasih, silakan gunakan kanal berikut."
          />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-3">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="overflow-hidden rounded-xl border border-line bg-surface">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-surface-2"
                >
                  <span className="flex items-center gap-3">
                    <Icon name="gift" className="size-4 text-gold" />
                    <span className="text-sm font-semibold tracking-wide">
                      {item.kind === "account"
                        ? `${item.account.bank} — ${item.account.holder}`
                        : qris.label}
                    </span>
                  </span>
                  <Icon
                    name="chevron-down"
                    className={cn(
                      "size-4 text-muted transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex flex-col items-center gap-4 border-t border-line px-5 py-6">
                        {item.kind === "account" ? (
                          <>
                            <Heading level={5}>{item.account.bank}</Heading>
                            <p className="tabular font-display text-2xl font-semibold tracking-wider sm:text-3xl">
                              {item.account.number}
                            </p>
                            <p className="text-xs text-muted">a.n. {item.account.holder}</p>
                            <CopyButton
                              value={item.account.number}
                              label="Salin Nomor"
                              successMessage={`Nomor rekening ${item.account.bank} tersalin`}
                            />
                          </>
                        ) : (
                          <>
                            <Subtitle>Scan untuk Hadiah</Subtitle>
                            <div className="rounded-xl border border-line bg-white p-4">
                              <QRCodeSVG value={qris.payload} size={168} fgColor="#292524" />
                            </div>
                            <BodyText muted className="text-center text-xs">
                              Mendukung semua aplikasi e-wallet &amp; m-banking berlogo QRIS.
                            </BodyText>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
