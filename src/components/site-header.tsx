import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/plan", label: "Weekly Plan" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            🍳
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-stone-900 group-hover:text-terracotta">
            Chefalina
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:bg-cream hover:text-stone-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
