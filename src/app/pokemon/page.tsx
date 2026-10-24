import Link from "next/link";
import { PokemonListResponse, SimplePokemon } from "@/types/pokemon";
import { IoMdList } from "react-icons/io";
import Image from "next/image";

async function getPokemons(): Promise<SimplePokemon[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error("Error al cargar pokémon");

  const data: PokemonListResponse = await res.json();

  return data.results.map((pokemon, index) => ({
    name: pokemon.name,
    id: index + 1,
  }));
}

export default async function PokemonList() {
  const pokemons = await getPokemons();

  return (
    <div>
      {/* Título de la pantalla */}
      <div className="flex items-center justify-between border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-extrabold text-yellow-400 flex items-center gap-3 tracking-wider">
          <IoMdList size={36} className="text-red-500" /> LISTA DE POKÉMONS (ISR)
        </h1>
        <span className="bg-gray-800 text-green-400 font-mono text-sm px-3 py-1 rounded-md border border-green-500/30">
          GEN 1 • 151
        </span>
      </div>

      {/* Cuadrícula de tarjetas de Pokémon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemons.map((pokemon) => (
          <Link
            key={pokemon.name}
            href={`/pokemon/${pokemon.name}`}
            className="group block bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-yellow-400 rounded-xl p-5 transition transform hover:-translate-y-1 shadow-lg text-center relative overflow-hidden"
          >
            {/* Fondo con imagen de Pokébola decorativa muy leve */}
            <div className="bg-gray-950/60 rounded-lg p-4 mb-3 border border-gray-800 flex justify-center items-center">
              <Image
                width={120}
                height={120}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                alt={pokemon.name}
                className="w-28 h-28 object-contain transition group-hover:scale-110"
                priority={false}
              />
            </div>

            {/* Número ID y Nombre */}
            <div className="flex items-center justify-between mt-2 px-1">
              <h2 className="text-lg font-bold capitalize text-white group-hover:text-yellow-400 transition">
                {pokemon.name}
              </h2>
              <span className="bg-red-600 text-white font-mono font-bold text-xs px-2 py-1 rounded-full border border-red-800">
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}