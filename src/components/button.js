'use client';
import Link from 'next/link';

export default function Button({primary=true, text, href="/"}){
    return(
        <main>
            { primary && (
                    <Link
                    href={href}
                    className="bg-gradient-to-r from-purple-500 to-purple-900 font-semibold text-white py-2 px-5 rounded-full inline-block transition-all duration-400 shadow-inner shadow-purple-900/50 hover:scale-105 hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-purple-800 hover:to-purple-500">
                    {text}
                </Link>
            )}
            { !primary && (
                    <Link
                    href={href}
                    className="font-semibold text-purple-300 py-2 px-5 rounded-full inline-block transition-all duration-400 hover:text-purple-100">
                    {text}
                </Link>
            )}
            
        </main>
    )
}