import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MATERIAS_PJ } from '@/data/materias';
import { JUZGADOS_PJ } from '@/data/juzgados';
import { DISTRITOS_JUDICIALES_PERU } from '@/data/distritos';
import { SearchSelect } from '@/components/SearchSelect';
import { saveCase } from '@/app/actions';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const NewCaseModal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [expediente, setExpediente] = useState('');
  const [distrito, setDistrito] = useState('AMAZONAS');
  const [juzgado, setJuzgado] = useState('');
  const [materia, setMateria] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await saveCase({
      expediente_numero: expediente,
      distrito_judicial: distrito,
      juzgado: juzgado || 'Juzgado Mixto / Civil',
      materia: materia || 'CIVIL - Prescripción Adquisitiva de Dominio'
    });

    setLoading(false);

    if (result.success) {
      onSuccess();
      onClose();
      setExpediente('');
      setJuzgado('');
      setMateria('');
    } else {
      alert('Error guardando: ' + result.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Monitorear Nuevo Expediente Judicial (CEJ)</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Número de Expediente (Formato CEJ Oficial)</label>
            <input 
              required
              placeholder="Ej: 00009-2026-0-0101-JR-CI-01"
              value={expediente}
              onChange={(e) => setExpediente(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* Selector de los 35 Distritos Judiciales de Perú */}
          <SearchSelect
            label="Distrito Judicial (Corte Superior)"
            placeholder="Buscar distrito (Ej: Amazonas, Lima, Arequipa...)"
            options={DISTRITOS_JUDICIALES_PERU}
            value={distrito}
            onChange={setDistrito}
          />

          {/* Buscador de Materias */}
          <SearchSelect
            label="Materia / Especialidad"
            placeholder="Buscar materia (Ej: Prescripción Adquisitiva, Desalojo...)"
            options={MATERIAS_PJ}
            value={materia}
            onChange={setMateria}
          />

          {/* Buscador de Juzgados Nacionales */}
          <SearchSelect
            label="Juzgado / Sala (Búsqueda o Texto Libre)"
            placeholder="Ej: Juzgado Mixto de Jumbilla - Bongará (Amazonas)"
            options={JUZGADOS_PJ}
            value={juzgado}
            onChange={setJuzgado}
          />

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
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/20"
            >
              {loading ? 'Guardando...' : 'Iniciar Monitoreo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};