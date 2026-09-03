import React from 'react';
import { UserCheck, MapPin, Calendar, Clock, Scale } from 'lucide-react';

interface Props {
  juzgado: string;
}

export const CourtAnalytics: React.FC<Props> = ({ juzgado }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Datos Oficiales del Órgano Jurisdiccional</h3>
            <p className="text-xs text-slate-400">{juzgado || 'Juzgado Mixto - Sede de Jumbilla'}</p>
          </div>
        </div>
        <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Sede Conectada al CEJ
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Magistrado y Especialista */}
        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>Juez y Especialista</span>
            <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-sm font-bold text-white">RODRÍGUEZ PORTOCARRERO DAILÍ</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Esp: Venturo Rojas Giovana</p>
        </div>

        {/* Ubicación y Etapa */}
        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>Ubicación Procesal</span>
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-sm font-bold text-amber-300 font-mono">EN DESPACHO DEL JUEZ</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Etapa: Para Emitir Resolución</p>
        </div>

        {/* Fechas de Trámite */}
        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>Cronología del Proceso</span>
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-sm font-bold text-white font-mono">Inicio: 10/01/2026</div>
          <p className="text-[11px] text-emerald-400 mt-0.5">Último Proveído: 19/08/2026</p>
        </div>
      </div>
    </div>
  );
};