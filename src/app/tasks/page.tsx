'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Users, Plus, CheckCircle2, Clock, AlertTriangle, UserCheck } from 'lucide-react';

export default function TasksPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState([
    {
      id: '1',
      titulo: 'Subsanar Tasa Judicial de Notificación',
      expediente: '00420-2024-0-1801-JR-CI-05',
      asignadoA: 'Dr. Luis Mendoza (Asociado Junior)',
      plazoInterno: 'Hoy antes de las 5:00 PM',
      plazoFatalPJ: 'Miércoles (Día 3)',
      estado: 'EN_PROGRESO',
      prioridad: 'ALTA'
    },
    {
      id: '2',
      titulo: 'Redactar Recurso de Apelación de Auto',
      expediente: '00123-2023-0-1801-JR-CI-01',
      asignadoA: 'Dra. Carmen Ríos (Practicante)',
      plazoInterno: 'Viernes 29 de Marzo',
      plazoFatalPJ: 'Próximo Lunes',
      estado: 'PENDIENTE',
      prioridad: 'URGENTE'
    },
    {
      id: '3',
      titulo: 'Revisar Declaración Testimonial en Fiscalía',
      expediente: 'CF: 506014501-2024-182-0',
      asignadoA: 'Dr. Carlos Vega (Socio)',
      plazoInterno: '04 de Abril',
      plazoFatalPJ: '08 de Abril',
      estado: 'COMPLETADO',
      prioridad: 'MEDIA'
    }
  ]);

  const toggleStatus = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, estado: t.estado === 'COMPLETADO' ? 'PENDIENTE' : 'COMPLETADO' } : t));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 antialiased">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
          </button>
          <div className="flex items-center gap-2 text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-xl">
            <Users className="w-4 h-4" /> Gestión de Estudio Jurídico
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Control de Tareas y Delegación Legal</h1>
            <p className="text-xs text-slate-400 mt-0.5">Asigna escritos, subsanaciones y plazos internos a tu equipo</p>
          </div>

          <button 
            onClick={() => alert('Abrir modal de nueva tarea delegada')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" /> Asignar Nueva Tarea
          </button>
        </div>

        {/* Lista de Tareas */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className={`bg-slate-900/60 border rounded-2xl p-5 transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                task.estado === 'COMPLETADO' ? 'border-emerald-500/30 opacity-70' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-4">
                <button 
                  onClick={() => toggleStatus(task.id)}
                  className={`p-2 rounded-xl border mt-0.5 transition ${
                    task.estado === 'COMPLETADO' 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                      : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-400">{task.expediente}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                      task.prioridad === 'URGENTE' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {task.prioridad}
                    </span>
                  </div>

                  <h3 className={`text-sm font-semibold mt-1 ${task.estado === 'COMPLETADO' ? 'line-through text-slate-400' : 'text-white'}`}>
                    {task.titulo}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <UserCheck className="w-3.5 h-3.5 text-indigo-400" /> {task.asignadoA}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 self-end md:self-center text-xs">
                <div className="text-right">
                  <p className="text-slate-500">Límite Interno:</p>
                  <p className="text-white font-semibold flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> {task.plazoInterno}
                  </p>
                </div>

                <div className="text-right bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase">Fatal PJ</p>
                  <p className="text-amber-400 font-bold">{task.plazoFatalPJ}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}