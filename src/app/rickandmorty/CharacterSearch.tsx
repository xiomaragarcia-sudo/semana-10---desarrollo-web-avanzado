'use client';

import { useState, useEffect } from 'react';
import { Character, CharacterListResponse } from '@/types/rickandmorty';
import Image from 'next/image';
import Link from 'next/link';

interface CharacterSearchProps {
  initialCharacters: Character[];
}

export default function CharacterSearch({ initialCharacters }: CharacterSearchProps) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si todos los filtros están vacíos, mostramos la lista inicial (SSG)
    if (!name && !status && !type && !gender) {
      setCharacters(initialCharacters);
      return;
    }

    const fetchFilteredCharacters = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (name) queryParams.append('name', name);
        if (status) queryParams.append('status', status);
        if (type) queryParams.append('type', type);
        if (gender) queryParams.append('gender', gender);

        const res = await fetch(`https://rickandmortyapi.com/api/character/?${queryParams.toString()}`);
        if (res.ok) {
          const data: CharacterListResponse = await res.json();
          setCharacters(data.results);
        } else {
          setCharacters([]);
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchFilteredCharacters, 300);
    return () => clearTimeout(timer);
  }, [name, status, type, gender, initialCharacters]);

  return (
    <div>
      {/* Controles de Búsqueda CSR */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl mb-8 shadow-lg">
        <h2 className="text-xl font-bold text-green-400 mb-4">🔍 Buscador en Tiempo Real (CSR)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Nombre (ej. Rick)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:border-green-500"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:border-green-500"
          >
            <option value="">Todos los Estados</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <input
            type="text"
            placeholder="Tipo (ej. Genetic experiment)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:border-green-500"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:border-green-500"
          >
            <option value="">Todos los Géneros</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>

      {/* Grid de Resultados */}
      {loading ? (
        <p className="text-center text-green-400 font-mono text-lg py-12">Cargando personajes...</p>
      ) : characters.length === 0 ? (
        <p className="text-center text-gray-400 font-mono text-lg py-12">No se encontraron personajes.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/rickandmorty/${character.id}`}
              className="bg-gray-900 border border-gray-800 hover:border-green-500 rounded-xl overflow-hidden transition transform hover:-translate-y-1 shadow-lg group block"
            >
              {/* Image con Lazy Loading automático por Next/Image */}
              <div className="relative h-60 w-full bg-gray-950">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition truncate">
                  {character.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      character.status === 'Alive'
                        ? 'bg-green-500'
                        : character.status === 'Dead'
                        ? 'bg-red-500'
                        : 'bg-gray-500'
                    }`}
                  ></span>
                  {character.status} - {character.species}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}