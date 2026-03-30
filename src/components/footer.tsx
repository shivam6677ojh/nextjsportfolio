import { socialLinks } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-[#c7c7c7] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Shivam Ojha. Built with Next.js.</p>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hover:text-[#ff7e7e]">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
