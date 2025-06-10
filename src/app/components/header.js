'use client';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';


export default function Header({volver=false}){
    return(
        <header className="flex justify-between p-4 bg-zinc-900 shadow-sm">
            <div className='flex gap-3 items-center py-1 px-2'>
                <User  />
                <LogOut />
            </div>
            {volver &&
            <Link href="/" className="border-2 border-purple-800 hover:bg-purple-800 text-white font-semibold py-1 px-2 rounded-full transition duration-200">
                Volver</Link>
            }
            
        </header>
    )
}