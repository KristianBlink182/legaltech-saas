import React from 'react';
import { useRouter } from 'next/navigation';
import { Case } from '@/types/database';
import { FileText, Building2, User, ChevronRight, Trash2 } from 'lucide-react';

interface CaseListProps {
  cases: Case[];
  loading: boolean;
  onRefresh?: () => void;
}

export const CaseList: React.FC<CaseListProps> = ({ cases, loading, onRefresh }) => {
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    if (confirm('¿Estás seguro de que deseas eliminar este expediente del monitoreo?')) {
      try {
        await fetch(`/api/ai/cases?id=${id}`, { method: 'DELETE' });
        if (onRefresh) onRefresh();
      } catch (err) {
        console.log('Error deleting case');
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16 border border-slate-800 rounded-2xl bg-slate-900/30">
        <div className="inline-block animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mb-3" />
        <p className="text-sm text-slate-400">Cargando expedientes judiciales...</p>
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <div className="text-center py-16 border border-slate-800 border-dashed rounded-2xl bg-slate-900/20">
        <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-white">No tienes expedientes registrados</h3>
        <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
          Comienza sincronizando desde el CEJ o cargando una cédula en PDF.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cases.map((item) => (
        <div 
          key={item.id} 
          onClick={() => router.push(`/case/${item.id}`)}
          className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-indigo-400">{item.expediente_numero}</span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Monitoreando
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                {item.juzgado || 'Juzgado no especificado'} ({item.distrito_judicial})
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                {item.materia || 'Materia general'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            <button 
              onClick={(e) => handleDelete(e, item.id)}
              className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/15 rounded-xl border border-transparent hover:border-rose-500/30 transition"
              title="Eliminar Expediente"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="p-2 rounded-xl bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};