export default function LoadingMessage({mensaje}){
    return (
        <div className="flex flex-col justify-center items-center h-48">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-2"></div>
        <p className="text-zinc-400 text-lg font-medium">Cargando {mensaje}...</p>
        </div>
    );  
}