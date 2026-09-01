'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldAlert, Award, FileSearch, Search, AlertCircle } from 'lucide-react';

export default function IndecopiPage() {
  const router = useRouter();
  const [marca, setMarca] = useState('IURISBOT');
  const [clase, setClase] = useState('Clase 42 (Software y Tecnología Legal)');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResultado(null);

    setTimeout(() => {
      setResultado({
        marcaBuscada: marca,
        claseNiza: clase,
        expedienteIndecopi: 'EXP-INDECOPI-2024-008921',
        gacetaPublicacion: 'Gaceta Electrónica N° 458',
        similitudDetectada: 'No se encontraron oposiciones ni marcas idénticas registradas en los últimos 30 días.',
        alertaRiesgo: 'BAJO RIESGO (100% REGISTRABLE)'
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 antialiased">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
          </button>
          <div className="flex items-center gap-2 text-xs bg-violet-500/10 text-violet-400 border border-violet-500/20 px-3 py-1.5 rounded-xl">
            <Award className="w-4 h-4" /> INDECOPI & Propiedad Intelectual
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Vigilancia de Marcas y Oposiciones INDECOPI</h1>
          <p className="text-xs text-slate-400 mt-0.5">Monitorea la Gaceta Electrónica y detecta intentos de registro de marcas similares</p>
        </div>

        <form onSubmit={handleSearch} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Nombre de la Marca / Signo Distintivo</label>
              <input 
                required
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 uppercase font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Clasificación de Niza</label>
              <select 
                value={clase}
                onChange={(e) => setClase(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
              >
                <option value="Clase 42 (Software y Tecnología Legal)">Clase 42 (Software y Tecnología Legal)</option>
                <option value="Clase 45 (Servicios Jurídicos y Legales)">Clase 45 (Servicios Jurídicos y Legales)</option>
                <option value="Clase 35 (Publicidad y Negocios Comerciales)">Clase 35 (Publicidad y Negocios Comerciales)</option>
                <option value="Clase 36 (Servicios Financieros e Inmobiliarios)">Clase 36 (Servicios Financieros e Inmobiliarios)</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20 active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'Consultando Gaceta INDECOPI...' : 'Activar Vigilancia de Marca'}</span>
          </button>
        </form>

        {resultado && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded border border-violet-500/20">
                  {resultado.expedienteIndecopi}
                </span>
                <h3 className="text-sm font-bold text-white mt-1">MARCA: {resultado.marcaBuscada}</h3>
              </div>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
                {resultado.alertaRiesgo}
              </span>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
              {resultado.similitudDetectada}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}