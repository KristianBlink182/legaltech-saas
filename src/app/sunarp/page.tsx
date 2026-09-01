'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Building, Car, FileText, CheckCircle2, Download } from 'lucide-react';

export default function SunarpPage() {
  const router = useRouter();

  const [tipo, setTipo] = useState('INMUEBLE');
  const [busqueda, setBusqueda] = useState('11029482');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResultado(null);

    setTimeout(() => {
      setResultado({
        partida: busqueda,
        sede: 'ZONA REGISTRAL N° IX - SEDE LIMA',
        registro: tipo === 'INMUEBLE' ? 'REGISTRO DE PREDIOS' : 'REGISTRO VEHICULAR',
        titular: tipo === 'INMUEBLE' ? 'INVERSIONES SAN ISIDRO S.A.C.' : 'RODRIGUEZ PEREZ JUAN CARLOS',
        direccion: tipo === 'INMUEBLE' ? 'AV. JAVIER PRADO ESTE N° 2450, SAN BORJA, LIMA' : 'PLACA: ABC-123 (TOYOTA COROLLA)',
        cargas: '1 Gravamen / Hipoteca inscrita a favor de Entidad Bancaria (Asiento D00003)',
        estado: 'ACTIVA CON GRAVAMEN'
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
          <div className="flex items-center gap-2 text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-xl">
            <Building className="w-4 h-4" /> Consulta Registral SUNARP
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Verificación Registral SUNARP Inmediata</h1>
          <p className="text-xs text-slate-400 mt-0.5">Búsqueda de Partidas de Inmuebles, Vehículos y Personas Jurídicas</p>
        </div>

        {/* Buscador */}
        <form onSubmit={handleSearch} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Tipo de Registro</label>
              <select 
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="INMUEBLE">Registro de Predios / Inmuebles</option>
                <option value="VEHICULO">Registro Vehicular (Placas)</option>
                <option value="EMPRESAS">Personas Jurídicas / Empresas</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">N° de Partida o Placa</label>
              <div className="relative">
                <input 
                  required
                  placeholder="Ej: 11029482"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'Consultando Registros Públicos...' : 'Consultar Partida Registral'}</span>
          </button>
        </form>

        {/* Ficha de Resultado Registral */}
        {resultado && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                  PARTIDA N° {resultado.partida}
                </span>
                <h3 className="text-sm font-bold text-white mt-1">{resultado.registro}</h3>
              </div>
              <span className="text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-full font-medium">
                {resultado.estado}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <span className="text-slate-500 font-semibold block mb-0.5">TITULAR REGISTRAL</span>
                <span className="text-white font-bold">{resultado.titular}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <span className="text-slate-500 font-semibold block mb-0.5">OFICINA REGISTRAL</span>
                <span className="text-slate-300">{resultado.sede}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 sm:col-span-2">
                <span className="text-slate-500 font-semibold block mb-0.5">UBICACIÓN / BIEN</span>
                <span className="text-slate-300">{resultado.direccion}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 sm:col-span-2">
                <span className="text-amber-400 font-semibold block mb-0.5">CARGAS Y GRAVÁMENES</span>
                <span className="text-slate-300">{resultado.cargas}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}