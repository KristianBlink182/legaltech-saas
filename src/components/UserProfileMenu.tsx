import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Crown, Users, CreditCard, HelpCircle, MessageSquare, ShieldCheck, LogOut, ChevronDown } from 'lucide-react';

interface Props {
  onOpenWhatsApp: () => void;
}

export const UserProfileMenu: React.FC<Props> = ({ onOpenWhatsApp }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón Avatar */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 pl-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl transition"
      >
        <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
          KH
        </div>
        <div className="text-left hidden xl:block">
          <p className="text-xs font-bold text-white leading-none">Dr. Kristian Hoppus</p>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Plan PRO Activo
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-2 z-50 space-y-1">
          
          {/* Cabecera del Usuario */}
          <div className="p-3 border-b border-slate-800">
            <p className="text-xs font-bold text-white">Dr. Kristian Hoppus</p>
            <p className="text-[11px] text-slate-400">Estudio Jurídico Principal</p>
            <div className="mt-2 bg-indigo-950/40 border border-indigo-500/30 p-2 rounded-xl flex items-center justify-between text-[11px]">
              <span className="text-indigo-300 font-semibold flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-400" /> JUDIBOT PRO
              </span>
              <span className="text-slate-400">Renueva: 30 Abr</span>
            </div>
          </div>

          {/* Opciones */}
          <button 
            onClick={() => { router.push('/tasks'); setIsOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Gestión de Equipo y Roles</span>
          </button>

          <button 
            onClick={() => { onOpenWhatsApp(); setIsOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-emerald-400 hover:bg-slate-800 rounded-xl transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Configurar Alertas WhatsApp</span>
          </button>

          <button 
            onClick={() => { router.push('/pricing'); setIsOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>Membresía y Facturación</span>
          </button>

          <a 
            href="https://wa.me/51987654321?text=Hola%20deseo%20soporte%20con%20JUDIBOT" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span>Soporte Prioritario 24/7</span>
          </a>

          <div className="border-t border-slate-800 pt-1">
            <button 
              onClick={() => alert('Sesión cerrada')}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};