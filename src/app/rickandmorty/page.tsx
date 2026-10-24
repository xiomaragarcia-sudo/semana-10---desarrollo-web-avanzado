import { CharacterListResponse } from '@/types/rickandmorty';
import CharacterSearch from './CharacterSearch';

async function getInitialCharacters() {
  // cache: 'force-cache' asegura SSG (Forzar el caché en la petición)
  const res = await fetch('https://rickandmortyapi.com/api/character', {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error('Error al cargar personajes');
  const data: CharacterListResponse = await res.json();
  return data.results;
}

export default async function RickAndMortyHome() {
  const initialCharacters = await getInitialCharacters();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-green-400">Personajes de Rick and Morty</h1>
        <span className="bg-gray-800 text-green-400 font-mono text-xs px-3 py-1 rounded-full border border-green-500/30">
          SSG / ISR / CSR
        </span>
      </div>

      <CharacterSearch initialCharacters={initialCharacters} />
    </div>
  );
}