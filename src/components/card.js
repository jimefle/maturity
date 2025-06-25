'use client';
import Button from "./button";

export default function Card({ titulo, descrip, text, href }) {
  return (
    <div className="flex flex-col justify-between bg-black/20 backdrop-blur-md text-center text-white p-6 rounded-2xl shadow-lg w-full max-w-xs border border-zinc-700 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:border-zinc-300">
      <h2 className="text-xl font-bold mb-3 text-zinc-100">{titulo}</h2>
      <h4 className="text-zinc-400 mb-5">{descrip}</h4>
      <Button text={text} href={href}/>
      </div>
  );
}
