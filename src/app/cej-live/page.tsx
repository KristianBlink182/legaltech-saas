'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Scale, ExternalLink, ShieldCheck, Zap, Globe } from 'lucide-react';

export default function CEJLivePage() {
  const router = useRouter();

  const portals = [
    {
      title: "CEJ - Cortes Superiores de Justicia",
      desc: "Consulta de expedientes en las 35 Cortes del Perú (Lima, Amazonas, Arequipa, etc.)",
      url: "https://cej.pj.gob.pe/cej/forms/busquedaform.html",
      badge: "MÁS UTILIZADO",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      btnText: "Abrir Consulta CEJ Oficial",
      btnColor: "bg-indigo-600 hover:bg-indigo-500 text-white"
    },
    {
      title: "SINOE - Casilla Electrónica Judicial",
      desc: "Bandeja oficial de notificaciones judiciales y resoluciones con firma digital.",
      url: "https://casillas.pj.gob.pe/sinoe/login.xhtml",
      badge: "IMPORTACIÓN MASIVA",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      btnText: "Abrir Casilla SINOE",
      btnColor: "bg-emerald-600 hover:bg-emerald-500 text-white"
    },
    {
      title: "CEJ - Corte Suprema de la República",
      desc: "Seguimiento de Recursos de Casación Civil, Laboral, Constitucional y Penal.",
      url: "https://cej.pj.gob.pe/cej/forms/busquedaform.html",
      badge: "CASACIONES",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      btnText: "Abrir Corte Suprema",
      btnColor: "bg-slate-800 hover:bg-slate-700 text-slate-200"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 antialiased">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
          </button>
          
          <div className="flex items-center gap-2 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Extensión JUDIBOT Activa</span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Acceso Directo a Portales Oficiales del Poder Judicial
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Abre el portal deseado con 1 clic. La extensión de JUDIBOT detectará tus expedientes automáticamente.
          </p>
        </div>

        {/* Banner de Navegador Compatible */}
        <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs">
          <Globe className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-slate-300 leading-relaxed">
            <strong className="text-white block mb-0.5">Requisito para la sincronización automática:</strong>
            Para que la extensión oficial de JUDIBOT detecte y sincronice tus expedientes con 1 clic, asegúrate de utilizar <strong>Google Chrome, Microsoft Edge o Brave</strong> con la extensión instalada.
          </div>
        </div>

        {/* Tarjetas de Portales Judiciales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {portals.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <Scale className="w-5 h-5 text-indigo-400" />
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>

              <a 
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition shadow-md active:scale-95 ${item.btnColor}`}
              >
                <span>{item.btnText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        {/* Guía Rápida */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 mt-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" /> ¿Cómo funciona la sincronización en 3 pasos?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
              <span className="text-indigo-400 font-bold block mb-1">Paso 1</span>
              <p className="text-slate-300">Haz clic en cualquiera de los botones de arriba para abrir el portal oficial del PJ.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
              <span className="text-indigo-400 font-bold block mb-1">Paso 2</span>
              <p className="text-slate-300">Valida tu DNI en el CEJ o inicia sesión con tu usuario en la Casilla SINOE.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
              <span className="text-emerald-400 font-bold block mb-1">Paso 3</span>
              <p className="text-slate-300">Presiona el botón flotante verde de JUDIBOT para absorber todos tus casos de golpe.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}