import { motion } from 'framer-motion';
import { useState } from 'react';

type NavbarProps = {
  links: { label: string; href: string }[];
};

export default function Navbar({ links }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed left-0 top-0 z-50 w-full px-4 py-4"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/50 px-5 py-3 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
        <a href="#home" className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-200">
          Chetan Ashok Auti
        </a>
        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white md:hidden">
          Menu
        </button>
        <nav className="hidden gap-6 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm text-slate-300 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      {open ? (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-slate-950/85 px-5 py-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="text-sm text-slate-200 transition hover:text-cyan-200">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </motion.header>
  );
}
