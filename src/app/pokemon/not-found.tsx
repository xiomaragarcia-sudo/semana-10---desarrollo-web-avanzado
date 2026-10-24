import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="p-8 text-center bg-gray-800 text-white rounded-xl my-8 max-w-2xl mx-auto border border-yellow-500 shadow-2xl">
      <h2 className="text-4xl font-extrabold text-yellow-400 mb-4">
        404 - Pokémon no encontrado
      </h2>
      <p className="text-gray-300 mb-6">
        El Pokémon que estás buscando no existe o no forma parte de la Pokédex actual.
      </p>
      <Link
        href="/pokemon"
        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-extrabold py-3 px-6 rounded-lg transition"
      >
        ← Regresar al Pokédex
      </Link>
    </div>
  );
}