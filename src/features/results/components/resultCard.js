export default function ResultCard({name, subdomain, data}) {
    return (
        <li
            key={subdomain}
            className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 shadow"
          >
            <p className="text-zinc-400 text-sm mb-1">{name}</p>
            <p className="text-lg font-semibold text-zinc-100 mb-2">{subdomain}</p>
            
            <p className="text-sm text-zinc-400">Nivel de capacidad</p>
            <p className="text-purple-400 font-bold">{data.level ?? 'N/A'}</p>
            
            <p className="text-sm text-zinc-400 mt-2">Progreso</p>
            <p className="text-purple-400 font-bold">{data.prog != null ? `${data.prog}%`:'N/A'}</p>
        </li>
    )
}