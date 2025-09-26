"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/how", label: "How it works" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get current path without locale prefix for comparison
  const getCurrentPath = () => {
    if (!mounted) return '/'; // Default during SSR
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    return pathWithoutLocale;
  };

  const currentPath = getCurrentPath();

  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6 flex items-center sticky top-0 z-50">
      <div className="flex-shrink-0">
        <Link href={`/${locale}`}>
          <Image src="/sanovias_logo.png" alt="Sanovias Logo" width={160} height={50} className="object-contain h-[60px] w-auto" />
        </Link>
      </div>
      <nav className="flex-grow flex justify-center">
        <ul className="flex space-x-8 text-gray-700">
          {navItems.map(item => (
            <li key={item.href}>
              <Link
                href={`/${locale}${item.href === '/' ? '' : item.href}`}
                className={`font-inter font-medium text-sm hover:text-[#2CA6A4] transition-colors duration-150 ${
                  currentPath === item.href ? 'text-[#2CA6A4] font-semibold border-b-2 border-[#2CA6A4] pb-1' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-shrink-0 ml-4">
        <Link 
          href={`/${locale}/contact`} 
          className="bg-[#2CA6A4] text-white px-6 py-2 rounded-lg font-inter font-semibold text-sm uppercase tracking-wide hover:bg-[#26928F] transition-all duration-150 hover:shadow-lg"
        >
          Get Quote
        </Link>
      </div>
    </header>
  );
}

export default Header;
