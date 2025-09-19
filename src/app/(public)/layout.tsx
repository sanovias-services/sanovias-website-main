"use client";

import Header from "./components/Header";

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
      {/* Footer temporarily removed due to import issue */}
      <footer className="bg-gray-800 text-white p-8 text-center">
        <p>&copy; {new Date().getFullYear()} Smart Journey. All rights reserved.</p>
      </footer>
    </div>
  );
}