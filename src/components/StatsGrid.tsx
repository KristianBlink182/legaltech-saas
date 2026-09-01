import React from 'react';
import { FolderGit2, AlertCircle, Clock, Zap } from 'lucide-react';

interface StatsProps {
  totalCases: number;
  pendingDeadlines: number;
}

export const StatsGrid: React.FC<StatsProps> = ({ totalCases, pendingDeadlines }) => {
  const stats = [
    {
      title: "Expedientes Activos",
      value: totalCases,
      desc: "Monitoreo CEJ 24/7",
      icon: FolderGit2,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20"
    },
    {
      title: "Plazos por Vencer",
      value: pendingDeadlines,
      desc: "Próximos 5 días hábiles",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20"
    },
    {
      title: "Alertas WhatsApp",
      value: "Activo",
      desc: "Notificaciones directas",
      icon: Zap,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
      title: "IA Judicial",
      value: "v2.5 Flash",
      desc: "OCR y resúmenes listos",
      icon: AlertCircle,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.title}</span>
            <div className={`p-2 rounded-xl border ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
          <p className="text-xs text-slate-500 mt-1">{stat.desc}</p>
        </div>
      ))}
    </div>
  );
};