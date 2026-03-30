"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/src/hooks/useLanguage";

export default function FriendsModeTabs() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const tabs = [
    { href: "/friends/character", label: t.friends.modes.character.short },
    { href: "/friends/quote", label: t.friends.modes.quote.short },
    { href: "/friends/emoji", label: t.friends.modes.emoji.short },
    { href: "/friends/pixel", label: t.friends.modes.pixel.short },
  ];

  return (
    <nav className="mode-tabs" aria-label="Friends modes">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`mode-tab ${pathname === tab.href ? "is-active" : ""}`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}