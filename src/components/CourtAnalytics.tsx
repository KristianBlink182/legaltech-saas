import React from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  juzgado: string;
}

export const CourtAnalytics: React.FC<Props> = ({ juzgado }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Analítica Predictiva del Juzgado</h3>
            <p className="text-xs text-slate-400">{juzgado || 'Juzgado Civil de Lima'}</p>
          </div>
        </div>
        <span className="text-[11px] bg-blue-500/10 text-blue-300 px-2.5 py-1 rounded-full border border-blue-500/20 font-medium">
          Muestra: 1,420 resoluciones
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Métrica 1: Tiempo promedio de respuesta */}
        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Calificación de Demanda</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">18 días hábiles</div>
          <p className="text-[11px] text-emerald-400 mt-0.5">⚡ 25% más rápido que el promedio</p>
        </div>

        {/* Métrica 2: Admisión de Medidas Cautelares */}
        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Tasa de Admisión Cautelar</span>
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">68.4%</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Alta probabilidad de concesión</p>
        </div>

        {/* Métrica 3: Confirmación en Sala Superior */}
        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Sentencias Confirmadas</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">81.2%</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Criterio sólido en apelaciones</p>
        </div>
      </div>
    </div>
  );
};