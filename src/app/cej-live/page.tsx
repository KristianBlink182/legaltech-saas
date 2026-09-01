'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield, ExternalLink, RefreshCw } from 'lucide-react';

export default function CEJLiveEmbedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 antialiased flex flex-col">
      <div className="max-w-7xl w-full mx-auto space-y-4 flex-1 flex flex-col">
        
        {/* Cabecera */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-xl">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span>Conexión Segura al Portal del Poder Judicial</span>
            </div>

            <a 
              href="https://cej.pj.gob.pe/cej/forms/busquedaform.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir en Pestaña Completa</span>
            </a>
          </div>
        </div>

        {/* Marco Incrustado del CEJ */}
        <div className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl min-h-[750px] relative flex flex-col">
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              cej.pj.gob.pe (Poder Judicial del Perú Oficial)
            </span>
            <span className="text-[11px] text-slate-500">Valida tu DNI aquí dentro con total seguridad</span>
          </div>

          <iframe 
            src="https://cej.pj.gob.pe/cej/forms/busquedaform.html" 
            title="Poder Judicial del Perú CEJ"
            className="w-full flex-1 border-none bg-white"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>

      </div>
    </div>
  );
}