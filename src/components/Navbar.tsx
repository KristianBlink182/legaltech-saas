import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scale, Calendar, Sparkles, Search, FileUp, Shield, Menu, X } from 'lucide-react';
import { WhatsAppSettingsModal } from '@/components/WhatsAppSettingsModal';
import { NewFiscalCaseModal } from '@/components/NewFiscalCaseModal';
import { UploadCedulaModal } from '@/components/UploadCedulaModal';
import { UserProfileMenu } from '@/components/UserProfileMenu';

interface NavbarProps {
  onRefresh?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRefresh }) => {
  const router = useRouter();
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isFiscalOpen, setIsFiscalOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
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
              <p className="text-[10px] text-slate-400 hidden xl:block">Inteligencia Judicial y Fiscal de Perú</p>
            </div>
          </div>

          {/* Menú Central Limpio (Solo 4 herramientas clave) */}
          <div className="hidden md:flex items-center gap-2">
            
            {/* CEJ Oficial en Vivo */}
            <button 
              onClick={() => router.push('/cej-live')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/25 transition font-bold"
            >
              <Scale className="w-4 h-4" />
              <span>CEJ Oficial en Vivo</span>
            </button>

            {/* Cargar Cédula PDF */}
            <button 
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition font-semibold shadow-lg shadow-indigo-600/30 active:scale-95"
            >
              <FileUp className="w-4 h-4" />
              <span>+ Cargar Cédula PDF</span>
            </button>

            {/* Redactor IA */}
            <button 
              onClick={() => router.push('/drafting')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 hover:text-white rounded-xl transition font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Redactor IA</span>
            </button>

            {/* Calendario Judicial */}
            <button 
              onClick={() => router.push('/calendar')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 hover:text-white rounded-xl transition font-medium"
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Agenda Judicial</span>
            </button>

            {/* Registros SUNARP / INDECOPI Unificados */}
            <button 
              onClick={() => router.push('/registros')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 hover:text-white rounded-xl transition font-medium"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Registros & Marcas</span>
            </button>
          </div>

          {/* Menú del Abogado / Perfil a la Derecha */}
          <div className="flex items-center gap-2">
            <UserProfileMenu onOpenWhatsApp={() => setIsWhatsAppOpen(true)} />

            {/* Botón Menú Móvil */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden bg-slate-900 border border-slate-800 text-slate-300 p-2 rounded-xl"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Menú Desplegable Móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button onClick={() => { router.push('/cej-live'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 font-bold col-span-2">
              <Scale className="w-4 h-4" /> ⚖️ Abrir Portal Oficial CEJ en Vivo
            </button>
            <button onClick={() => { setIsUploadOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-indigo-600 rounded-xl text-xs text-white font-bold col-span-2">
              <FileUp className="w-4 h-4" /> 📄 Cargar Cédula / Notificación en PDF
            </button>
            <button onClick={() => { router.push('/drafting'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-indigo-400">
              <Sparkles className="w-4 h-4" /> Redactor IA
            </button>
            <button onClick={() => { router.push('/calendar'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
              <Calendar className="w-4 h-4 text-indigo-400" /> Agenda Judicial
            </button>
            <button onClick={() => { router.push('/registros'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-amber-400 col-span-2">
              <Search className="w-4 h-4" /> Registros SUNARP & INDECOPI
            </button>
            <button onClick={() => { setIsFiscalOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-400 col-span-2">
              <Shield className="w-4 h-4" /> + Monitorear Carpeta Fiscal (MPFN)
            </button>
          </div>
        )}
      </header>

      <WhatsAppSettingsModal isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)} />
      <NewFiscalCaseModal isOpen={isFiscalOpen} onClose={() => setIsFiscalOpen(false)} onSuccess={() => onRefresh && onRefresh()} />
      <UploadCedulaModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} onSuccess={() => onRefresh && onRefresh()} />
    </>
  );
};