"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/how", label: "How it works" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-white shadow-md py-3 px-6 flex items-center sticky top-0 z-50">
      <div className="flex-shrink-0">
        <Link href="/">
          <Image src="/logo.png" alt="Smart Journey Logo" width={160} height={50} className="object-contain h-[80px] w-auto" />
        </Link>
      </div>
      <nav className="flex-grow flex justify-center">
        <ul className="flex space-x-6 text-gray-700">
          {navItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`hover:text-teal-600 transition-colors ${pathname === item.href ? 'text-teal-600 font-semibold' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
