'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error detectado:', error);
  }, [error]);

  return (
    <div className="p-8 text-center bg-gray-800 text-white rounded-xl my-8 max-w-2xl mx-auto border border-red-500 shadow-2xl">
      <h2 className="text-3xl font-extrabold text-red-500 mb-4">
        ¡Upps! Ocurrió un error inesperado
      </h2>
      <p className="text-gray-300 mb-6">
        {error.message || 'No se pudo procesar la solicitud del servidor.'}
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => reset()}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg transition"
        >
          Reintentar
        </button>
        <Link
          href="/pokemon"
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded-lg transition"
        >
          Volver a la Lista
        </Link>
      </div>
    </div>
  );
}