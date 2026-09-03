'use client';

import React, { useEffect, useState } from 'react';
import { Case } from '@/types/database';
import { Navbar } from '@/components/Navbar';
import { StatsGrid } from '@/components/StatsGrid';
import { CaseList } from '@/components/CaseList';

const AMAZONAS_CASE: Case = {
  id: 'case-amazonas',
  expediente_numero: '00009-2026-0-0101-JR-CI-01',
  distrito_judicial: 'AMAZONAS',
  juzgado: 'Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)',
  materia: 'CIVIL - Prescripción Adquisitiva de Dominio',
  status: 'ACTIVE',
  created_at: new Date().toISOString()
};

export default function Dashboard() {
  const [cases, setCases] = useState<Case[]>([AMAZONAS_CASE]);
  const [loading, setLoading] = useState(false);

  const fetchCases = async () => {
    try {
      const res = await fetch('/api/cases', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCases(data);
          return;
        }
      }
    } catch (e) {
      console.log('Using default case');
    }
    setCases([AMAZONAS_CASE]);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      <Navbar onRefresh={fetchCases} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <StatsGrid totalCases={cases.length} pendingDeadlines={1} />

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Expedientes Judiciales y Carpetas Fiscales</h2>
            <p className="text-xs text-slate-400">Monitoreo activo sincronizado con CEJ y MPFN</p>
          </div>
        </div>

        <CaseList cases={cases} loading={loading} onRefresh={fetchCases} />
      </main>
    </div>
  );
}