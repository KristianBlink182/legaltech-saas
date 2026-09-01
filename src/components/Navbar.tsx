import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scale, MessageSquare, Plus, Calendar, Shield, Sparkles, Building, Users, CreditCard, Award, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Logo JUDIBOT */}
          <div 
            onClick={() => router.push('/')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <div className="bg-indigo-600/20 p-2 rounded-xl border border-indigo-500/30 text-indigo-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg text-white tracking-tight">JUDIBOT</span>
                <span className="bg-indigo-500/10 text-indigo-400 text-[10px] px-1.5 py-0.2 rounded-md border border-indigo-500/20 font-bold">PRO</span>
              </div>
              <p className="text-[10px] text-slate-400 hidden xl:block">Inteligencia Judicial y Fiscal del Perú</p>
            </div>
          </div>

          {/* Menú de Botones Principales */}
          <div className="hidden md:flex items-center gap-1.5 flex-wrap justify-end">
            
            {/* BOTÓN CEJ EN VIVO (Siempre visible en pantallas medianas y grandes) */}
            <button 
              onClick={() => router.push('/cej-live')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/25 transition font-bold"
            >
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>CEJ Oficial en Vivo</span>
            </button>

            <button onClick={() => router.push('/drafting')} className="flex items-center gap-1 px-2.5 py-2 text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-xl hover:bg-indigo-500/20 transition font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Redactor IA</span>
            </button>

            <button onClick={() => router.push('/calendar')} className="flex items-center gap-1 px-2.5 py-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition font-medium">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Calendario</span>
            </button>

            <button onClick={() => router.push('/sunarp')} className="flex items-center gap-1 px-2.5 py-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl hover:bg-amber-500/20 transition font-medium">
              <Building className="w-3.5 h-3.5" />
              <span>SUNARP</span>
            </button>

            <button onClick={() => router.push('/indecopi')} className="flex items-center gap-1 px-2.5 py-2 text-xs text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-xl hover:bg-violet-500/20 transition font-medium">
              <Award className="w-3.5 h-3.5" />
              <span>INDECOPI</span>
            </button>

            <button onClick={() => router.push('/tasks')} className="flex items-center gap-1 px-2.5 py-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition font-medium">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>Equipo</span>
            </button>

            <button onClick={() => setIsWhatsAppOpen(true)} className="flex items-center gap-1 px-2.5 py-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition font-medium">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <button onClick={() => router.push('/pricing')} className="flex items-center gap-1 px-2.5 py-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-xl hover:bg-amber-500/20 transition font-medium">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Planes</span>
            </button>

            <button onClick={() => setIsFiscalOpen(true)} className="flex items-center gap-1 px-2.5 py-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl hover:bg-rose-500/20 transition font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span>+ Fiscalía</span>
            </button>

            {onOpenModal && (
              <button onClick={onOpenModal} className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition active:scale-95">
                <Plus className="w-4 h-4" />
                <span>Monitorear CEJ</span>
              </button>
            )}
          </div>

          {/* Menú para Móviles */}
          <div className="flex md:hidden items-center gap-1.5">
            <button 
              onClick={() => router.push('/cej-live')}
              className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>CEJ</span>
            </button>

            {onOpenModal && (
              <button onClick={onOpenModal} className="bg-indigo-600 text-white p-2 rounded-xl">
                <Plus className="w-4 h-4" />
              </button>
            )}

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="bg-slate-900 border border-slate-800 text-slate-300 p-2 rounded-xl"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Menú Desplegable Móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button onClick={() => { router.push('/cej-live'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 font-bold col-span-2">
              <Scale className="w-4 h-4" /> ⚖️ Abrir Portal Oficial CEJ en Vivo
            </button>
            <button onClick={() => { router.push('/drafting'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-indigo-400">
              <Sparkles className="w-4 h-4" /> Redactor IA
            </button>
            <button onClick={() => { router.push('/calendar'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
              <Calendar className="w-4 h-4 text-indigo-400" /> Calendario
            </button>
            <button onClick={() => { router.push('/sunarp'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-amber-400">
              <Building className="w-4 h-4" /> SUNARP
            </button>
            <button onClick={() => { router.push('/indecopi'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-violet-400">
              <Award className="w-4 h-4" /> INDECOPI
            </button>
            <button onClick={() => { router.push('/tasks'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
              <Users className="w-4 h-4 text-indigo-400" /> Tareas Equipo
            </button>
            <button onClick={() => { setIsWhatsAppOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400">
              <MessageSquare className="w-4 h-4" /> WhatsApp
            </button>
            <button onClick={() => { setIsFiscalOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-400 col-span-2">
              <Shield className="w-4 h-4" /> + Monitorear Carpeta Fiscal (MPFN)
            </button>
          </div>
        )}
      </header>

      <WhatsAppSettingsModal isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)} />
      <NewFiscalCaseModal isOpen={isFiscalOpen} onClose={() => setIsFiscalOpen(false)} onSuccess={() => onRefresh && onRefresh()} />
    </>
  );
};