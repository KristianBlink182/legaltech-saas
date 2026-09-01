'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building, Award, Search, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function RegistrosHubPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'sunarp' | 'indecopi'>('sunarp');

  // Estados SUNARP
  const [tipoSunarp, setTipoSunarp] = useState('INMUEBLE');
  const [busquedaSunarp, setBusquedaSunarp] = useState('11029482');
  const [loadingSunarp, setLoadingSunarp] = useState(false);
  const [resultadoSunarp, setResultadoSunarp] = useState<any | null>(null);

  // Estados INDECOPI
  const [marca, setMarca] = useState('JUDIBOT');
  const [clase, setClase] = useState('Clase 42 (Software y Tecnología Legal)');
  const [loadingIndecopi, setLoadingIndecopi] = useState(false);
  const [resultadoIndecopi, setResultadoIndecopi] = useState<any | null>(null);

  const handleSearchSunarp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSunarp(true);
    setTimeout(() => {
      setResultadoSunarp({
        partida: busquedaSunarp,
        sede: 'ZONA REGISTRAL N° IX - SEDE LIMA',
        registro: tipoSunarp === 'INMUEBLE' ? 'REGISTRO DE PREDIOS' : 'REGISTRO VEHICULAR',
        titular: tipoSunarp === 'INMUEBLE' ? 'INVERSIONES SAN ISIDRO S.A.C.' : 'RODRIGUEZ PEREZ JUAN CARLOS',
        direccion: tipoSunarp === 'INMUEBLE' ? 'AV. JAVIER PRADO ESTE N° 2450, SAN BORJA, LIMA' : 'PLACA: ABC-123 (TOYOTA COROLLA)',
        cargas: '1 Gravamen / Hipoteca inscrita a favor de Entidad Bancaria (Asiento D00003)',
        estado: 'ACTIVA CON GRAVAMEN'
      });
      setLoadingSunarp(false);
    }, 800);
  };

  const handleSearchIndecopi = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingIndecopi(true);
    setTimeout(() => {
      setResultadoIndecopi({
        marcaBuscada: marca,
        expedienteIndecopi: 'EXP-INDECOPI-2024-008921',
        gacetaPublicacion: 'Gaceta Electrónica N° 458',
        similitudDetectada: 'No se encontraron oposiciones ni marcas idénticas registradas en los últimos 30 días.',
        alertaRiesgo: '100% DISPONIBLE / REGISTRABLE'
      });
      setLoadingIndecopi(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 antialiased">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
          </button>

          <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-medium">
            Centro de Consultas Registrales
          </span>
        </div>

        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Búsqueda en Registros Públicos y Marcas</h1>
          <p className="text-xs text-slate-400 mt-0.5">Consultas instantáneas en SUNARP y vigilancia de marcas en INDECOPI</p>
        </div>

        {/* Pestañas Selectoras */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button 
            onClick={() => setActiveTab('sunarp')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition ${
              activeTab === 'sunarp' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>SUNARP (Partidas y Bienes)</span>
          </button>

          <button 
            onClick={() => setActiveTab('indecopi')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition ${
              activeTab === 'indecopi' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>INDECOPI (Marcas y Patentes)</span>
          </button>
        </div>

        {/* CONTENIDO SUNARP */}
        {activeTab === 'sunarp' && (
          <div className="space-y-6">
            <form onSubmit={handleSearchSunarp} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Tipo de Registro</label>
                  <select 
                    value={tipoSunarp}
                    onChange={(e) => setTipoSunarp(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="INMUEBLE">Registro de Predios / Inmuebles</option>
                    <option value="VEHICULO">Registro Vehicular (Placas)</option>
                    <option value="EMPRESAS">Personas Jurídicas / Empresas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">N° de Partida o Placa</label>
                  <input 
                    required
                    value={busquedaSunarp}
                    onChange={(e) => setBusquedaSunarp(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loadingSunarp}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>{loadingSunarp ? 'Consultando SUNARP...' : 'Consultar Partida Registral'}</span>
              </button>
            </form>

            {resultadoSunarp && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                      PARTIDA N° {resultadoSunarp.partida}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1">{resultadoSunarp.registro}</h3>
                  </div>
                  <span className="text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-full font-medium">
                    {resultadoSunarp.estado}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-slate-500 font-semibold block mb-0.5">TITULAR REGISTRAL</span>
                    <span className="text-white font-bold">{resultadoSunarp.titular}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-slate-500 font-semibold block mb-0.5">OFICINA REGISTRAL</span>
                    <span className="text-slate-300">{resultadoSunarp.sede}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 sm:col-span-2">
                    <span className="text-slate-500 font-semibold block mb-0.5">UBICACIÓN / BIEN</span>
                    <span className="text-slate-300">{resultadoSunarp.direccion}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CONTENIDO INDECOPI */}
        {activeTab === 'indecopi' && (
          <div className="space-y-6">
            <form onSubmit={handleSearchIndecopi} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Nombre de la Marca</label>
                  <input 
                    required
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 uppercase font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Clase Niza</label>
                  <select 
                    value={clase}
                    onChange={(e) => setClase(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="Clase 42 (Software y Tecnología Legal)">Clase 42 (Software y Tecnología Legal)</option>
                    <option value="Clase 45 (Servicios Jurídicos y Legales)">Clase 45 (Servicios Jurídicos y Legales)</option>
                    <option value="Clase 35 (Publicidad y Negocios)">Clase 35 (Publicidad y Negocios)</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loadingIndecopi}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20 active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>{loadingIndecopi ? 'Consultando INDECOPI...' : 'Vigilar Marca en Gaceta Oficial'}</span>
              </button>
            </form>

            {resultadoIndecopi && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded border border-violet-500/20">
                      {resultadoIndecopi.expedienteIndecopi}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1">MARCA: {resultadoIndecopi.marcaBuscada}</h3>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
                    {resultadoIndecopi.alertaRiesgo}
                  </span>
                </div>

                <p className="text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
                  {resultadoIndecopi.similitudDetectada}
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}