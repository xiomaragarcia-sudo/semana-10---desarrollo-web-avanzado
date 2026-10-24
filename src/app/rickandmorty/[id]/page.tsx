import { Character, CharacterListResponse } from '@/types/rickandmorty';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

async function getCharacter(id: string): Promise<Character> {
  // Revalidación cada 10 días (10 días * 24 horas * 3600 segundos = 864000 segundos)
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 },
  });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error('Error al obtener el personaje');
  }

  return res.json();
}

// Genera rutas estáticas por ID de los primeros 20 personajes
export async function generateStaticParams() {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const data: CharacterListResponse = await res.json();

  return data.results.map((char) => ({
    id: char.id.toString(),
  }));
}

export default async function CharacterDetail({ params }: Props) {
  const { id } = await params;
  const character = await getCharacter(id);

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2 h-80 md:h-auto bg-gray-950">
          <Image
            src={character.image}
            alt={character.name}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-extrabold text-white">{character.name}</h1>
              <span className="bg-gray-800 text-green-400 font-mono text-sm px-3 py-1 rounded-md border border-green-500/30">
                #{character.id}
              </span>
            </div>

            <div className="space-y-3 text-gray-300 text-sm">
              <p className="flex items-center gap-2">
                <strong>Status:</strong>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold text-white ${
                    character.status === 'Alive'
                      ? 'bg-green-600'
                      : character.status === 'Dead'
                      ? 'bg-red-600'
                      : 'bg-gray-600'
                  }`}
                >
                  {character.status}
                </span>
              </p>
              <p><strong>Especie:</strong> {character.species}</p>
              <p><strong>Género:</strong> {character.gender}</p>
              <p><strong>Tipo:</strong> {character.type || 'N/A'}</p>
              <p><strong>Origen:</strong> {character.origin.name}</p>
              <p><strong>Ubicación Actual:</strong> {character.location.name}</p>
              <p><strong>Episodios donde aparece:</strong> {character.episode.length}</p>
              <p><strong>Fecha de Creación:</strong> {new Date(character.created).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/rickandmorty"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg transition"
            >
              ← Volver al Buscador
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}