import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const UploadCedulaModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/ai/upload-cedula', {
        method: 'POST',
        body: formData
      });

      const json = await res.json();
      setLoading(false);

      if (json.success) {
        setResult(json.data);
        onSuccess();
      } else {
        alert('Error: ' + json.error);
      }
    } catch (e: any) {
      setLoading(false);
      alert('Error de conexión: ' + e.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Cargar Notificación / Cédula (PDF)</h2>
              <p className="text-xs text-slate-400">La IA extraerá el expediente y plazos fatales</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {!result ? (
            <form onSubmit={handleUpload} className="space-y-4">
              
              {/* Zona de Arrastrar y Soltar */}
              <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition bg-slate-950/50 group">
                <Upload className="w-10 h-10 text-slate-500 group-hover:text-indigo-400 mb-3 transition" />
                <span className="text-sm font-semibold text-white">
                  {file ? file.name : "Haz clic para seleccionar o arrastra tu PDF"}
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  Cédulas de notificación SINOE, Autos o Decretos del PJ (.pdf)
                </span>
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
                />
              </label>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white rounded-xl"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={!file || loading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30 disabled:opacity-50 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{loading ? 'Analizando con IA...' : 'Procesar Cédula con IA'}</span>
                </button>
              </div>
            </form>
          ) : (
            // Resultado del Análisis de IA
            <div className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-300">¡Cédula Procesada y Guardada con Éxito!</h4>
                  <p className="text-xs text-emerald-400/90">Expediente registrado en tu Dashboard de JUDIBOT.</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">EXPEDIENTE DETECTADO:</span>
                  <span className="text-white font-mono font-bold">{result.expediente}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">JUZGADO:</span>
                  <span className="text-slate-300">{result.juzgado}</span>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">PLAZO FATAL EXTRAÍDO:</span>
                  <span className="text-slate-200">{result.sumilla}</span>
                </div>
              </div>

              <button 
                onClick={() => { setResult(null); setFile(null); onClose(); }}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2.5 rounded-xl transition"
              >
                Ver Expediente en el Dashboard
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};