import Link from 'next/link';
import { Metadata } from 'next';
import { Pokemon, PokemonListResponse } from '@/types/pokemon';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface PokemonPageProps {
  params: Promise<{
    name: string;
  }>;
}

async function getPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    next: { revalidate: 86400 }, // Revalida cada 24 horas (ISR)
  });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error('Error al obtener la información del Pokémon');
  }

  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data: PokemonListResponse = await res.json();

  return data.results.map((pokemon) => ({
    name: pokemon.name,
  }));
}

export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {
  const { name } = await params;
  
  try {
    const pokemon = await getPokemon(name);
    return {
      title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokédex`,
      description: `Información sobre ${pokemon.name}`,
    };
  } catch {
    return {
      title: 'Pokémon no encontrado - Pokédex',
    };
  }
}

const typeColors: Record<string, string> = {
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  psychic: 'bg-pink-500',
  ice: 'bg-cyan-400',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  fairy: 'bg-pink-300',
  normal: 'bg-gray-400',
  fighting: 'bg-orange-700',
  flying: 'bg-indigo-400',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  rock: 'bg-yellow-800',
  bug: 'bg-green-600',
  ghost: 'bg-purple-700',
  steel: 'bg-gray-500',
};

export default async function PokemonDetail({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Cabecera del Pokémon */}
        <div className={`p-8 ${typeColors[pokemon.types[0].type.name] || 'bg-gray-700'}`}>
          <h1 className="text-5xl font-extrabold text-white capitalize text-center drop-shadow-md">
            {pokemon.name}
          </h1>
          <p className="text-white text-center text-xl font-mono mt-2 opacity-90">
            #{pokemon.id.toString().padStart(3, '0')}
          </p>
        </div>

        {/* Detalle principal */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex justify-center items-center bg-gray-900 rounded-xl p-6 border border-gray-700">
              <Image
                width={200}
                height={200}
                src={
                  pokemon.sprites.other['official-artwork'].front_default ||
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
                className="w-56 h-56 object-contain"
                priority
              />
            </div>

            <div className="flex-1 text-white">
              {/* Tipos */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-3 text-yellow-400">Tipos</h3>
                <div className="flex gap-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`${
                        typeColors[type.type.name] || 'bg-gray-500'
                      } text-white px-4 py-2 rounded-full font-semibold capitalize text-sm shadow`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Estadísticas */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-3 text-yellow-400">Estadísticas</h3>
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="capitalize font-semibold text-gray-300">
                        {stat.stat.name.replace('-', ' ')}
                      </span>
                      <span className="font-bold text-white">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-yellow-400 h-3 rounded-full transition-all"
                        style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Información General */}
              <div>
                <h3 className="text-2xl font-bold mb-3 text-yellow-400">Información</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong className="text-white">Altura:</strong> {pokemon.height / 10} m</p>
                  <p><strong className="text-white">Peso:</strong> {pokemon.weight / 10} kg</p>
                  <p>
                    <strong className="text-white">Habilidades:</strong>{' '}
                    {pokemon.abilities.map((a) => a.ability.name).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón Volver */}
        <div className="p-6 bg-gray-900 border-t border-gray-700">
          <Link
            href="/pokemon"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            ← Volver al Pokédex
          </Link>
        </div>
      </div>
    </div>
  );
}