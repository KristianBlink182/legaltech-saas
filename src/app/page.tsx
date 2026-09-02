'use client';

import React, { useEffect, useState } from 'react';
import { Case } from '@/types/database';
import { Navbar } from '@/components/Navbar';
import { StatsGrid } from '@/components/StatsGrid';
import { CaseList } from '@/components/CaseList';

export default function Dashboard() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCases = () => {
    try {
      const saved = localStorage.getItem('judibot_cases');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCases(parsed);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.log('Error reading localStorage');
    }
    setCases([]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCases();
    // Escuchar cambios automáticos cuando la extensión guarde en segundo plano
    window.addEventListener('storage', fetchCases);
    return () => window.removeEventListener('storage', fetchCases);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      <Navbar onRefresh={fetchCases} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <StatsGrid totalCases={cases.length} pendingDeadlines={cases.length > 0 ? 1 : 0} />

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Expedientes Judiciales y Carpetas Fiscales</h2>
            <p className="text-xs text-slate-400">Monitoreo activo sincronizado con CEJ y MPFN</p>
          </div>
        </div>

        <CaseList cases={cases} loading={loading} />
      </main>
    </div>
  );
}