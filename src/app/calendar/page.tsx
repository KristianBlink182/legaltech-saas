'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar as CalendarIcon, Clock, AlertTriangle, Video, ExternalLink } from 'lucide-react';

export default function CalendarPage() {
  const router = useRouter();

  const events = [
    {
      id: '1',
      title: 'Audiencia Preliminar Virtual (PJ)',
      expediente: '00420-2024-0-1801-JR-CI-05',
      juzgado: '5° Juzgado Especializado en lo Civil - Lima',
      fecha: '2024-04-05',
      fechaTexto: 'Viernes, 05 de Abril de 2024',
      hora: '10:00 AM',
      tipo: 'AUDIENCIA',
      linkMeet: 'https://meet.google.com/abc-defg-hij',
      detalles: 'Audiencia preliminar de fijación de puntos controvertidos y saneamiento procesal.'
    },
    {
      id: '2',
      title: 'VENCIMIENTO FATAL: Subsanación de Tasa Judicial',
      expediente: '00420-2024-0-1801-JR-CI-05',
      juzgado: '5° Juzgado Especializado en lo Civil - Lima',
      fecha: '2024-03-27',
      fechaTexto: 'Miércoles, 27 de Marzo de 2024',
      hora: '11:59 PM',
      tipo: 'PLAZO',
      detalles: 'Último día hábil para ingresar escrito de subsanación bajo apercibimiento de rechazo.'
    },
    {
      id: '3',
      title: 'Declaración Testimonial en Fiscalía (MPFN)',
      expediente: 'CF: 506014501-2024-182-0',
      juzgado: '1° Fiscalía Provincial Penal de Lima',
      fecha: '2024-04-08',
      fechaTexto: 'Lunes, 08 de Abril de 2024',
      hora: '09:30 AM',
      tipo: 'FISCALIA',
      detalles: 'Citación para rendir manifestación en diligencias preliminares.'
    }
  ];

  // Generador de enlace directo a Google Calendar sin necesidad de OAuth2
  const getGoogleCalendarUrl = (ev: typeof events[0]) => {
    const title = encodeURIComponent(`[IurisBot] ${ev.title} - Exp: ${ev.expediente}`);
    const details = encodeURIComponent(`${ev.detalles}\n\nJuzgado: ${ev.juzgado}\nExpediente: ${ev.expediente}\n${ev.linkMeet ? `Link Audiencia: ${ev.linkMeet}` : ''}`);
    const location = encodeURIComponent(ev.juzgado);
    
    // Formato de fecha para Google Calendar: YYYYMMDD
    const dateFormatted = ev.fecha.replace(/-/g, '');
    const dates = `${dateFormatted}T100000Z/${dateFormatted}T110000Z`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 antialiased">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
          </button>

          <div className="flex items-center gap-2 text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-xl">
            <CalendarIcon className="w-4 h-4 text-indigo-400" />
            <span>Sincronizado Automático con Google Calendar</span>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Calendario Judicial y Agenda Procesal</h1>
          <p className="text-xs text-slate-400 mt-0.5">Sincroniza tus audiencias y plazos procesales en Google Calendar con 1 clic</p>
        </div>

        {/* Lista de Eventos */}
        <div className="space-y-3">
          {events.map((ev) => (
            <div 
              key={ev.id}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl border shrink-0 ${
                  ev.tipo === 'AUDIENCIA' 
                    ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                    : ev.tipo === 'PLAZO' 
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                }`}>
                  {ev.tipo === 'AUDIENCIA' ? <Video className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      ev.tipo === 'AUDIENCIA' 
                        ? 'bg-blue-500/20 text-blue-300' 
                        : ev.tipo === 'PLAZO' 
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {ev.tipo}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-300">{ev.expediente}</span>
                  </div>

                  <h3 className="text-sm font-semibold text-white mt-1">{ev.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{ev.juzgado}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 self-end md:self-center">
                <div className="text-right mr-2 hidden sm:block">
                  <p className="text-xs font-semibold text-slate-200">{ev.fechaTexto}</p>
                  <p className="text-xs text-indigo-400 font-mono flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3" /> {ev.hora}
                  </p>
                </div>

                {/* Botón Sincronizar Google Calendar */}
                <a
                  href={getGoogleCalendarUrl(ev)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-slate-700 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Añadir a Google Calendar</span>
                </a>

                {ev.linkMeet && (
                  <a 
                    href={ev.linkMeet} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-md shadow-indigo-600/20"
                  >
                    <Video className="w-3.5 h-3.5" /> Unirse a Audiencia
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}