import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scale, MessageSquare, Plus, Calendar, Shield, Sparkles, Building, Users, CreditCard, Award } from 'lucide-react';
import { WhatsAppSettingsModal } from '@/components/WhatsAppSettingsModal';
import { NewFiscalCaseModal } from '@/components/NewFiscalCaseModal';

interface NavbarProps {
  onOpenModal?: () => void;
  onRefresh?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal, onRefresh }) => {
  const router = useRouter();
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isFiscalOpen, setIsFiscalOpen] = useState(false);

  return (
    <>
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => router.push('/')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="bg-indigo-600/20 p-2.5 rounded-xl border border-indigo-500/30 text-indigo-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">IurisBot</span>
                <span className="bg-indigo-500/10 text-indigo-400 text-xs px-2 py-0.5 rounded-full border border-indigo-500/20 font-medium">PRO</span>
              </div>
              <p className="text-xs text-slate-400">Inteligencia Judicial y Fiscal del Perú</p>
            </div>
          </div>

          {/* Menú Completo */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Tareas Equipo */}
            <button 
              onClick={() => router.push('/tasks')}
              className="flex items-center gap-1 p-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition"
            >
              <Users className="w-4 h-4 text-indigo-400" />
              <span className="hidden xl:inline font-medium">Equipo</span>
            </button>

            {/* Redactor IA */}
            <button 
              onClick={() => router.push('/drafting')}
              className="flex items-center gap-1 p-2 text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-xl hover:bg-indigo-500/20 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden lg:inline font-medium">Redactor IA</span>
            </button>

            {/* INDECOPI */}
            <button 
              onClick={() => router.push('/indecopi')}
              className="flex items-center gap-1 p-2 text-xs text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-xl hover:bg-violet-500/20 transition"
            >
              <Award className="w-4 h-4" />
              <span className="hidden lg:inline font-medium">INDECOPI</span>
            </button>

            {/* SUNARP */}
            <button 
              onClick={() => router.push('/sunarp')}
              className="flex items-center gap-1 p-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl hover:bg-amber-500/20 transition"
            >
              <Building className="w-4 h-4" />
              <span className="hidden lg:inline font-medium">SUNARP</span>
            </button>

            {/* Calendario */}
            <button 
              onClick={() => router.push('/calendar')}
              className="flex items-center gap-1 p-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition"
            >
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="hidden md:inline font-medium">Calendario</span>
            </button>

            {/* WhatsApp */}
            <button 
              onClick={() => setIsWhatsAppOpen(true)}
              className="flex items-center gap-1 p-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">WhatsApp</span>
            </button>

            {/* Planes y Precios */}
            <button 
              onClick={() => router.push('/pricing')}
              className="flex items-center gap-1 p-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-xl hover:bg-amber-500/20 transition"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden md:inline font-medium">Planes</span>
            </button>

            {/* + Fiscalía */}
            <button 
              onClick={() => setIsFiscalOpen(true)}
              className="flex items-center gap-1 p-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl hover:bg-rose-500/20 transition"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">+ Fiscalía</span>
            </button>
            
            {/* Monitorear CEJ */}
            {onOpenModal && (
              <button 
                onClick={onOpenModal}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Monitorear CEJ</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <WhatsAppSettingsModal 
        isOpen={isWhatsAppOpen} 
        onClose={() => setIsWhatsAppOpen(false)} 
      />

      <NewFiscalCaseModal
        isOpen={isFiscalOpen}
        onClose={() => setIsFiscalOpen(false)}
        onSuccess={() => onRefresh && onRefresh()}
      />
    </>
  );
};