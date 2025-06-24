'use client';
import Link from 'next/link';

export default function Card({ titulo, descrip, boton, href }) {
  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-center text-white p-6 rounded-2xl shadow-lg w-full max-w-xs border border-zinc-700 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-xl font-bold mb-3 text-zinc-100">{titulo}</h2>
      <h4 className="text-zinc-400 mb-5">{descrip}</h4>
      <Link
        href={href}
        className="bg-purple-600 hover:bg-purple-900 active:bg-purple-800 text-white font-semibold py-2.5 px-5 rounded-full inline-block transition-all duration-300 shadow-md hover:shadow-lg"
      >
        {boton}
      </Link>
    </div>
  );
}
