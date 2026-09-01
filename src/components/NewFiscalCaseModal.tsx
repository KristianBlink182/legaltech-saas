import React, { useState } from 'react';
import { X, Shield, Search } from 'lucide-react';
import { saveCase } from '@/app/actions';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const NewFiscalCaseModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [carpeta, setCarpeta] = useState('');
  const [fiscalia, setFiscalia] = useState('1° Fiscalía Provincial Penal Corporativa de Lima');
  const [delito, setDelito] = useState('Delitos contra el Patrimonio (Estafa Agravada)');
  const [etapa, setEtapa] = useState('Diligencias Preliminares (60 días)');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await saveCase({
      expediente_numero: `CF: ${carpeta}`,
      distrito_judicial: 'MINISTERIO PÚBLICO - DISTRITO FISCAL LIMA',
      juzgado: fiscalia,
      materia: `PENAL - ${delito} [${etapa}]`
    });

    setLoading(false);
    if (result.success) {
      onSuccess();
      onClose();
      setCarpeta('');
    } else {
      alert('Error guardando carpeta fiscal.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Monitorear Carpeta Fiscal (MPFN)</h2>
              <p className="text-xs text-slate-400">Seguimiento de Denuncias y Diligencias Penales</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Número de Carpeta Fiscal / Denuncia</label>
            <input 
              required
              placeholder="Ej: 506014501-2024-182-0"
              value={carpeta}
              onChange={(e) => setCarpeta(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Fiscalía / Despacho a Cargo</label>
            <select 
              value={fiscalia} 
              onChange={(e) => setFiscalia(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
            >
              <option value="1° Fiscalía Provincial Penal Corporativa de Lima">1° Fiscalía Provincial Penal Corporativa de Lima</option>
              <option value="2° Fiscalía Provincial Penal Corporativa de Lima">2° Fiscalía Provincial Penal Corporativa de Lima</option>
              <option value="Fiscalía Especializada en Delitos de Corrupción de Funcionarios">Fiscalía Especializada en Delitos de Corrupción de Funcionarios</option>
              <option value="Fiscalía Especializada en Lavado de Activos">Fiscalía Especializada en Lavado de Activos</option>
              <option value="Fiscalía Provincial de Tránsito y Seguridad Vial">Fiscalía Provincial de Tránsito y Seguridad Vial</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Presunto Delito</label>
              <input 
                value={delito} 
                onChange={(e) => setDelito(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Etapa Procesal</label>
              <select 
                value={etapa} 
                onChange={(e) => setEtapa(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
              >
                <option value="Calificación de Denuncia">Calificación de Denuncia</option>
                <option value="Diligencias Preliminares (60 días)">Diligencias Preliminares (60 días)</option>
                <option value="Investigación Preparatoria (120 días)">Investigación Preparatoria (120 días)</option>
                <option value="Etapa Intermedia (Acusación)">Etapa Intermedia (Acusación)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2.5 text-sm text-slate-400 hover:text-white rounded-xl"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition shadow-lg shadow-rose-600/20"
            >
              {loading ? 'Guardando...' : 'Iniciar Seguimiento Fiscal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};