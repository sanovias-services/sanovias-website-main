// Split into two files to avoid "use client" with metadata export
// This file only handles client components

"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}