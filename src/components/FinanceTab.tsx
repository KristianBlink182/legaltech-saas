import React, { useState } from 'react';
import { DollarSign, Plus, CheckCircle2, Clock, Receipt, TrendingUp, AlertCircle } from 'lucide-react';

interface Expense {
  id: string;
  concepto: string;
  monto: number;
  tipo: 'HONORARIO' | 'GASTO_JUDICIAL' | 'TASA';
  estado: 'PAGADO' | 'PENDIENTE';
  fecha: string;
}

export const FinanceTab: React.FC = () => {
  const [finances, setFinances] = useState<Expense[]>([
    {
      id: '1',
      concepto: 'Honorarios Iniciales - Presentación de Demanda',
      monto: 2500,
      tipo: 'HONORARIO',
      estado: 'PAGADO',
      fecha: '2024-03-01'
    },
    {
      id: '2',
      concepto: 'Arancel Judicial por Ofrecimiento de Pruebas (PJ)',
      monto: 185,
      tipo: 'TASA',
      estado: 'PAGADO',
      fecha: '2024-03-24'
    },
    {
      id: '3',
      concepto: 'Honorarios de Éxito - Sentencia Favorable (Etapa 2)',
      monto: 3500,
      tipo: 'HONORARIO',
      estado: 'PENDIENTE',
      fecha: '2024-05-15'
    }
  ]);

  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState<'HONORARIO' | 'GASTO_JUDICIAL' | 'TASA'>('GASTO_JUDICIAL');

  const totalHonorarios = finances.filter(f => f.tipo === 'HONORARIO').reduce((acc, curr) => acc + curr.monto, 0);
  const totalGastos = finances.filter(f => f.tipo !== 'HONORARIO').reduce((acc, curr) => acc + curr.monto, 0);
  const totalCobrado = finances.filter(f => f.estado === 'PAGADO').reduce((acc, curr) => acc + curr.monto, 0);
  const totalPendiente = finances.filter(f => f.estado === 'PENDIENTE').reduce((acc, curr) => acc + curr.monto, 0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concepto || !monto) return;

    const newItem: Expense = {
      id: Date.now().toString(),
      concepto,
      monto: parseFloat(monto),
      tipo,
      estado: 'PENDIENTE',
      fecha: new Date().toISOString().split('T')[0]
    };

    setFinances([newItem, ...finances]);
    setConcepto('');
    setMonto('');
  };

  const toggleStatus = (id: string) => {
    setFinances(finances.map(f => f.id === id ? { ...f, estado: f.estado === 'PAGADO' ? 'PENDIENTE' : 'PAGADO' } : f));
  };

  return (
    <div className="space-y-6">
      
      {/* Tarjetas de Resumen Financiero */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
          <span className="text-[11px] font-semibold uppercase text-slate-400">Honorarios Totales</span>
          <div className="text-xl font-bold text-white font-mono mt-1">S/ {totalHonorarios.toLocaleString()}</div>
          <span className="text-[10px] text-indigo-400">Pactados con el cliente</span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
          <span className="text-[11px] font-semibold uppercase text-slate-400">Gastos / Tasas Judiciales</span>
          <div className="text-xl font-bold text-amber-400 font-mono mt-1">S/ {totalGastos.toLocaleString()}</div>
          <span className="text-[10px] text-slate-400">Aranceles del Poder Judicial</span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
          <span className="text-[11px] font-semibold uppercase text-emerald-400">Cobrado / Liquidado</span>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-1">S/ {totalCobrado.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-500">Ingresos recibidos</span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
          <span className="text-[11px] font-semibold uppercase text-rose-400">Saldo Pendiente de Cobro</span>
          <div className="text-xl font-bold text-rose-400 font-mono mt-1">S/ {totalPendiente.toLocaleString()}</div>
          <span className="text-[10px] text-rose-500">Por cobrar al cliente</span>
        </div>
      </div>

      {/* Formulario de Registro Rápido */}
      <form onSubmit={handleAdd} className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[200px]">
          <input 
            placeholder="Concepto (Ej: Tasa judicial de apelación, 2da cuota...)"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="w-32">
          <input 
            type="number"
            placeholder="Monto (S/)"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>

        <div className="w-40">
          <select 
            value={tipo}
            onChange={(e: any) => setTipo(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="HONORARIO">Honorarios</option>
            <option value="TASA">Tasa / Arancel PJ</option>
            <option value="GASTO_JUDICIAL">Gasto / Notificación</option>
          </select>
        </div>

        <button 
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Agregar Movimiento
        </button>
      </form>

      {/* Tabla de Movimientos */}
      <div className="space-y-2">
        {finances.map((item) => (
          <div key={item.id} className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => toggleStatus(item.id)}
                className={`p-2 rounded-xl border transition ${
                  item.estado === 'PAGADO' 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                    : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    item.tipo === 'HONORARIO' 
                      ? 'bg-indigo-500/20 text-indigo-300' 
                      : item.tipo === 'TASA' 
                      ? 'bg-amber-500/20 text-amber-300' 
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.tipo}
                  </span>
                  <span className="text-xs text-slate-400">{item.fecha}</span>
                </div>
                <h4 className={`text-xs font-semibold mt-1 ${item.estado === 'PAGADO' ? 'text-slate-300' : 'text-white'}`}>
                  {item.concepto}
                </h4>
              </div>
            </div>

            <div className="text-right">
              <span className="text-sm font-bold text-white font-mono block">S/ {item.monto.toLocaleString()}</span>
              <span className={`text-[10px] font-bold uppercase ${item.estado === 'PAGADO' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {item.estado}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};