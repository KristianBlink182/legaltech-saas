'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCaseById } from '@/app/actions';
import { Case } from '@/types/database';
import { Printer, ArrowLeft, ShieldCheck, Scale, Calendar, AlertCircle } from 'lucide-react';

export default function CaseReportPage() {
  const { id } = useParams();
  const router = useRouter();
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
    return <div className="p-8 text-center text-slate-500">Generando reporte ejecutivo...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-8 antialiased print:p-0 print:bg-white">
      
      {/* Barra de control en pantalla (Se oculta al imprimir) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Expediente
        </button>

        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-md transition"
        >
          <Printer className="w-4 h-4" /> Imprimir / Guardar en PDF
        </button>
      </div>

      {/* Hoja A4 del Reporte Ejecutivo */}
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-10 shadow-xl print:border-none print:shadow-none print:p-0">
        
        {/* Encabezado Corporativo */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-3 rounded-xl">
              <Scale className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">INFORME DE ESTADO PROCESAL</h1>
              <p className="text-xs text-slate-500">IurisBot Intelligence • Poder Judicial del Perú</p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 rounded-full font-semibold">
              ESTADO: EN TRÁMITE
            </span>
            <p className="text-xs text-slate-400 mt-1 flex items-center justify-end gap-1">
              <Calendar className="w-3.5 h-3.5" /> {new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Ficha Técnica del Expediente */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 text-xs">
          <div>
            <span className="font-semibold text-slate-500 uppercase">Expediente N°:</span>
            <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">{caso?.expediente_numero}</p>
          </div>

          <div>
            <span className="font-semibold text-slate-500 uppercase">Distrito Judicial:</span>
            <p className="text-sm font-semibold text-slate-800 mt-0.5">{caso?.distrito_judicial}</p>
          </div>

          <div>
            <span className="font-semibold text-slate-500 uppercase">Órgano Jurisdiccional:</span>
            <p className="text-xs text-slate-700 mt-0.5">{caso?.juzgado}</p>
          </div>

          <div>
            <span className="font-semibold text-slate-500 uppercase">Materia Principal:</span>
            <p className="text-xs text-slate-700 mt-0.5">{caso?.materia}</p>
          </div>
        </div>

        {/* Alerta de Plazo Procesal para el Cliente */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl mb-6">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">
            <AlertCircle className="w-4 h-4 text-amber-600" /> Plazo y Requerimiento Pendiente
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Se encuentra corriendo un plazo legal de <strong>3 días hábiles</strong> para la presentación del escrito de subsanación de tasa judicial. El área legal ya preparó el escrito correspondiente para su ingreso oportuno.
          </p>
        </div>

        {/* Resumen Ejecutivo para la Gerencia / Cliente */}
        <div className="mb-6">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">1. Resumen Ejecutivo del Caso</h2>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            El proceso judicial se encuentra debidamente admitido y con seguimiento automatizado continuo en la sede del Poder Judicial. Los actos procesales se vienen cumpliendo conforme a ley sin contingencias desfavorables sobre el fondo de la controversia.
          </p>
        </div>

        {/* Historial Cronológico de Resoluciones */}
        <div>
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">2. Últimas Actuaciones y Resoluciones</h2>
          
          <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded">Resolución N° 04 (Auto)</span>
                <span className="text-xs text-slate-400">24/03/2024</span>
              </div>
              <h3 className="text-xs font-semibold text-slate-800">Auto que declara inadmisible con plazo</h3>
              <p className="text-xs text-slate-500 mt-1">El despacho solicita subsanar tasa judicial de notificación en el plazo de ley.</p>
            </div>

            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Resolución N° 03 (Decreto)</span>
                <span className="text-xs text-slate-400">12/03/2024</span>
              </div>
              <h3 className="text-xs font-semibold text-slate-800">Decreto de traslado y apersonamiento</h3>
              <p className="text-xs text-slate-500 mt-1">Téngase por apersonado el letrado y continúese con el trámite.</p>
            </div>
          </div>
        </div>

        {/* Pie de Página / Sello de Garantía */}
        <div className="border-t border-slate-200 mt-8 pt-6 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Documento certificado emitido con IurisBot Legal Intelligence</span>
          </div>
          <div>Página 1 de 1</div>
        </div>

      </div>
    </div>
  );
}