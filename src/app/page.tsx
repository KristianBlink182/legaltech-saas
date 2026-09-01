'use client';

import React, { useEffect, useState } from 'react';
import { Case } from '@/types/database';
import { Navbar } from '@/components/Navbar';
import { StatsGrid } from '@/components/StatsGrid';
import { CaseList } from '@/components/CaseList';
import { NewCaseModal } from '@/components/NewCaseModal';
import { getCases } from '@/app/actions';

export default function Dashboard() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCases = async () => {
    setLoading(true);
    const data = await getCases();
    setCases(data as Case[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      <Navbar onOpenModal={() => setIsModalOpen(true)} onRefresh={fetchCases} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <StatsGrid totalCases={cases.length} pendingDeadlines={1} />

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Expedientes Judiciales y Carpetas Fiscales</h2>
            <p className="text-xs text-slate-400">Monitoreo activo sincronizado con CEJ y MPFN</p>
          </div>
        </div>

        <CaseList cases={cases} loading={loading} />
      </main>

      <NewCaseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchCases}
      />
    </div>
  );
}