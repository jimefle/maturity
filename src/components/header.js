'use client';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';


export default function Header({volver=false}){
    return(
        <header className="flex justify-between p-4 bg-zinc-900 shadow-sm">
            <div className='flex gap-6 items-center py-2 px-2 cursor-pointer'>
                <User  />
                <LogOut />
            </div>
            {volver &&
            <Link href="/" 
                className="border-2 border-purple-900 hover:bg-purple-900 active:bg-purple-800 text-white font-semibold py-2 px-4 rounded-full inline-block transition-all duration-300 shadow-md hover:shadow-lg">
                Volver</Link>
            }
            
        </header>
    )
}