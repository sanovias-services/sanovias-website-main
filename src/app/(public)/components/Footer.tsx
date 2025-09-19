"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Smart Journey Logo"
                width={140}
                height={45}
                className="object-contain h-[60px] w-auto mb-4 brightness-150"
              />
            </Link>
            <p className="text-gray-300 text-sm">
              Connecting international patients with Tunisia&apos;s top medical providers.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white">Services</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
            <address className="text-gray-300 text-sm not-italic">
              <p>123 Medical Avenue, Tunis</p>
              <p className="mt-2">Email: <a href="mailto:info@smartjourney.com" className="hover:text-white">info@smartjourney.com</a></p>
              <p className="mt-1">Phone: <a href="tel:+216123456789" className="hover:text-white">+216 123 456 789</a></p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Smart Journey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}