'use client';

import React, { useEffect, useState } from 'react';
import { Case } from '@/types/database';
import { Navbar } from '@/components/Navbar';
import { StatsGrid } from '@/components/StatsGrid';
import { CaseList } from '@/components/CaseList';
import { getCases } from '@/app/actions';

const DEFAULT_CASES: Case[] = [
  {
    id: '1',
    expediente_numero: '00009-2026-0-0101-JR-CI-01',
    distrito_judicial: 'AMAZONAS',
    juzgado: 'Juzgado Mixto de Jumbilla - Bongará (Amazonas)',
    materia: 'CIVIL - Prescripción Adquisitiva de Dominio',
    status: 'ACTIVE',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    expediente_numero: '00420-2024-0-1801-JR-CI-05',
    distrito_judicial: 'LIMA',
    juzgado: '5° Juzgado Especializado en lo Civil - Lima',
    materia: 'CIVIL - Obligación de Dar Suma de Dinero',
    status: 'ACTIVE',
    created_at: new Date().toISOString()
  }
];

export default function Dashboard() {
  const [cases, setCases] = useState<Case[]>(DEFAULT_CASES);
  const [loading, setLoading] = useState(false);

  const fetchCases = async () => {
    try {
      const data = await getCases();
      if (data && data.length > 0) {
        setCases(data as Case[]);
      }
    } catch (e) {
      console.log('Using default cases');
    } finally {
      setLoading(false);
    }
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

        <CaseList cases={cases} loading={loading} />
      </main>
    </div>
  );
}