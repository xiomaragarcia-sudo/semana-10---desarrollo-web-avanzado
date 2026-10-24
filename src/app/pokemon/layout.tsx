import { ReactNode } from "react";
import { Metadata } from "next";
import { IoGameController } from "react-icons/io5";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pokédex - Next.js",
  description: "Explora el mundo Pokémon",
};

export default function PokemonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-red-700 text-white pb-12">
      {/* Barra de navegación superior estilo Pokédex (Rojo clásico + Lente azul) */}
      <nav className="bg-red-800 border-b-4 border-red-950 sticky top-0 z-50 p-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/pokemon"
            className="text-white text-2xl font-extrabold hover:text-yellow-300 transition inline-flex items-center gap-3 tracking-wide"
          >
            {/* Indicador azul clásico de la Pokédex */}
            <span className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white shadow-md animate-pulse inline-block"></span>
            <IoGameController size={32} className="text-yellow-400" /> 
            <span>Pokédex Next.js</span>
          </Link>

          {/* Luces decorativas estilo Pokédex */}
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 border border-red-900"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-800"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 border border-green-900"></span>
          </div>
        </div>
      </nav>

      {/* Contenido principal (Pantalla interior oscura de la Pokédex) */}
      <main className="max-w-7xl mx-auto mt-6 px-4">
        <div className="bg-gray-900 border-4 border-gray-700 rounded-2xl p-6 shadow-inner">
          {children}
        </div>
      </main>
    </div>
  );
}