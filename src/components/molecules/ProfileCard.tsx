import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/atoms/Icon";
import type { CoupleMember } from "@/types";

export interface ProfileCardProps {
  member: CoupleMember;
  className?: string;
}

/** Molecule: Foto (masking arch) + nama lengkap + gelar + orang tua (PRD §5.2). */
export function ProfileCard({ member, className }: ProfileCardProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4 text-center", className)}>
      <div className="relative h-56 w-44 overflow-hidden rounded-t-full border border-gold/40 p-1.5 sm:h-64 sm:w-52">
        <div className="relative h-full w-full overflow-hidden rounded-t-full">
          <Image
            src={member.photo}
            alt={`Foto ${member.fullName}`}
            fill
            sizes="(min-width: 640px) 208px, 176px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-xl leading-snug sm:text-2xl">{member.fullName}</h3>
        <p className="text-xs leading-relaxed text-muted">{member.parents}</p>
        {member.instagram && (
          <a
            href={`https://instagram.com/${member.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-1 inline-flex items-center gap-1.5 text-xs text-gold transition-colors hover:text-gold-strong"
          >
            <Icon name="instagram" className="size-3.5" />
            @{member.instagram}
          </a>
        )}
      </div>
    </div>
  );
}
