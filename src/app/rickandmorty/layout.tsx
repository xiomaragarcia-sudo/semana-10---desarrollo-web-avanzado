import { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rick and Morty - Next.js",
  description: "Explora los personajes de Rick and Morty",
};

export default function RickAndMortyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white pb-12">
      <nav className="bg-gray-900 border-b border-green-500/30 sticky top-0 z-50 p-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/rickandmorty"
            className="text-2xl font-extrabold text-green-400 hover:text-green-300 transition flex items-center gap-2"
          >
            🧪 Rick & Morty Portal
          </Link>
          <Link
            href="/pokemon"
            className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700 transition"
          >
            ← Ir a Pokédex
          </Link>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto mt-6 px-4">{children}</main>
    </div>
  );
}