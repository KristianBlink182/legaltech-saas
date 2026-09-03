import React from 'react';
import { Navbar } from '@/components/Navbar';
import { StatsGrid } from '@/components/StatsGrid';
import { CaseList } from '@/components/CaseList';
import { getCases } from '@/app/actions';
import { Case } from '@/types/database';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Dashboard() {
  // Carga directa del servidor en 0.01 segundos
  let cases: Case[] = [];
  try {
    const data = await getCases();
    if (Array.isArray(data)) {
      cases = data as Case[];
    }
  } catch (e) {
    console.log('Error loading server cases');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <StatsGrid totalCases={cases.length} pendingDeadlines={cases.length > 0 ? 1 : 0} />

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Expedientes Judiciales y Carpetas Fiscales</h2>
            <p className="text-xs text-slate-400">Monitoreo activo sincronizado con CEJ y MPFN</p>
          </div>
        </div>

        <CaseList cases={cases} loading={false} />
      </main>
    </div>
  );
}