'use client';
import Link from 'next/link';

export default function Card({titulo, descrip, boton, href}){
    return(
        <div className="bg-zinc-900 text-center text-white p-6 rounded-lg shadow-md w-full max-w-xs border border-zinc-700">
            <h2 className="text-lg font-semibold mb-2">{titulo}</h2>
            <p className="text-sm text-zinc-400 mb-4">{descrip}</p>
            <Link href={href} className="bg-purple-500 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-full inline-block transition duration-200">
            {boton}</Link>
        </div>
    );

};