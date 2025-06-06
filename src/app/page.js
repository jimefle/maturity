'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const result = searchParams.get('result')
  console.log(result)
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Evaluación de madurez en ciberseguridad</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/awareness" className="text-blue-600 underline">
            Subdominio: Concientización y capacitación
          </Link>
        </li>
        <li>
          <Link href="/access" className="text-blue-600 underline">
            Subdominio: Control de accesos
          </Link>
        </li>
        {/* Más subdominios aquí */}
      </ul>
      {result && (
        <p className="mt-4 text-lg font-semibold">
          Resultado final para este subdominio: {result}
        </p>
      )}
      
    </main>
  );
}
