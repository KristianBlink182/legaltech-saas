import React from 'react';
import { Resolution } from '@/types/database';
import { FileText, Sparkles, Download, Clock } from 'lucide-react';

interface Props {
  resolution: Resolution;
}

export const TimelineItem: React.FC<Props> = ({ resolution }) => {
  return (
    <div className="relative pl-6 pb-8 border-l border-slate-800 last:border-transparent group">
      {/* Punto indicador en la línea de tiempo */}
      <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-500 group-hover:scale-125 transition duration-200" />

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {resolution.nro_resolucion || 'Decreto / Notificación'}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {resolution.fecha_resolucion || 'Fecha reciente'}
            </span>
          </div>

          {resolution.documento_url && (
            <a 
              href={resolution.documento_url} 
              target="_blank" 
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-lg"
            >
              <Download className="w-3.5 h-3.5" /> PDF Oficial
            </a>
          )}
        </div>

        <h4 className="text-sm font-semibold text-white mb-1">{resolution.acto || 'Actuación Procesal'}</h4>
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">{resolution.sumilla || 'Sin sumilla judicial.'}</p>

        {/* Caja de Análisis IA */}
        <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-3.5 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-semibold uppercase text-indigo-300 tracking-wider block mb-0.5">
              Análisis IA IurisBot
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {resolution.resumen_ia || 'Resolución admitida a trámite. No se evidencian apercibimientos fatales para la parte demandante.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};