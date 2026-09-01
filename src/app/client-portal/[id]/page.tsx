'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCaseById } from '@/app/actions';
import { Case } from '@/types/database';
import { Scale, CheckCircle2, ShieldCheck, Clock, FileText, PhoneCall, Building2 } from 'lucide-react';

export default function ClientPortalView() {
  const { id } = useParams();
  const [caso, setCaso] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (id) {
        const data = await getCaseById(id as string);
        if (data) setCaso(data);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Cargando estado de su proceso legal...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 antialiased">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Cabecera del Portal del Cliente */}
        <div className="text-center py-6 border-b border-slate-800">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 rounded-2xl mb-3">
            <Scale className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold text-white">Portal de Seguimiento Legal</h1>
          <p className="text-xs text-slate-400 mt-1">Información oficial y en tiempo real de su expediente judicial</p>
        </div>

        {/* Ficha del Caso para el Cliente */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider block">Expediente N°</span>
              <span className="text-lg font-bold font-mono text-white">{caso?.expediente_numero}</span>
            </div>

            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              En Trámite Regular
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-500 block mb-0.5">Órgano Judicial</span>
              <span className="text-slate-200 font-semibold">{caso?.juzgado}</span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-500 block mb-0.5">Materia / Proceso</span>
              <span className="text-slate-200 font-semibold">{caso?.materia}</span>
            </div>
          </div>
        </div>

        {/* Barra de Progreso Visual del Juicio */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Etapa Procesal del Juicio</h3>
          
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-2xl text-emerald-400 font-bold">
              1. Postulatoria (Completada)
            </div>
            <div className="bg-indigo-600 text-white font-bold p-3 rounded-2xl shadow-lg shadow-indigo-600/30">
              2. Probatoria (Actual)
            </div>
            <div className="bg-slate-950 border border-slate-800 text-slate-500 p-3 rounded-2xl">
              3. Sentencia Final
            </div>
          </div>
        </div>

        {/* Últimas Actualizaciones en Lenguaje Claro */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Novedades Recientes del Juzgado</h3>
          
          <div className="space-y-3">
            <div className="bg-slate-950 border border-slate-800/80 p-4 rounded-2xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Requerimiento judicial cumplido</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Su equipo legal ya ingresó el arancel judicial respectivo. El caso se encuentra a la espera del pronunciamiento del juez.
                </p>
                <span className="text-[10px] text-slate-500 block mt-1.5">Actualizado hace unos instantes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pie de Página del Estudio */}
        <div className="text-center py-6 text-xs text-slate-500 space-y-2 border-t border-slate-800">
          <p>¿Tiene alguna consulta sobre su caso? Póngase en contacto directo con su abogado asignado.</p>
          <div className="flex items-center justify-center gap-1 text-[11px] text-indigo-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Certificado por IurisBot LegalTech Platform</span>
          </div>
        </div>

      </div>
    </div>
  );
}