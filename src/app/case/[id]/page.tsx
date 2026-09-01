'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCaseById, syncCaseCEJ } from '@/app/actions';
import { Case, Resolution } from '@/types/database';
import { ArrowLeft, Building2, User, Sparkles, AlertTriangle, Send, FileDown, RefreshCw, Printer, DollarSign, Share2, Copy, Check } from 'lucide-react';
import { TimelineItem } from '@/components/TimelineItem';
import { CourtAnalytics } from '@/components/CourtAnalytics';
import { FinanceTab } from '@/components/FinanceTab';

export default function CaseDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [caso, setCaso] = useState<Case | null>(null);
  const [activeTab, setActiveTab] = useState<'timeline' | 'finances'>('timeline');
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', text: 'Hola, soy tu copiloto legal para este caso. He detectado la última resolución del CEJ y calculé que tienes un plazo fatal de 3 días hábiles.' }
  ]);

  const [resolutions, setResolutions] = useState<Resolution[]>([
    {
      id: '1',
      case_id: id as string,
      nro_resolucion: 'Resolución N° 04 (Auto)',
      fecha_resolucion: '2024-03-24',
      acto: 'AUTO QUE DECLARA INADMISIBLE LA DEMANDA',
      sumilla: 'Se concede a la parte demandante el plazo de 3 DÍAS HÁBILES a fin de que cumpla con adjuntar arancel judicial por ofrecimiento de pruebas.',
      resumen_ia: '⚠️ El juez concede 3 DÍAS para subsanar arancel judicial bajo apercibimiento de rechazo de plano.'
    },
    {
      id: '2',
      case_id: id as string,
      nro_resolucion: 'Resolución N° 03 (Decreto)',
      fecha_resolucion: '2024-03-12',
      acto: 'DECRETO - TRASLADO DE ESCRITO',
      sumilla: 'Téngase por apersonado al letrado y estese a lo resuelto.',
      resumen_ia: 'Se tiene por apersonado al abogado de la contraparte.'
    }
  ]);

  useEffect(() => {
    async function load() {
      if (id) {
        const data = await getCaseById(id as string);
        if (data) setCaso(data);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const handleCopyClientLink = () => {
    const url = `${window.location.origin}/client-portal/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSyncCEJ = async () => {
    setSyncing(true);
    const res = await syncCaseCEJ(id as string);
    setSyncing(false);

    if (res.success && res.resolution) {
      setResolutions(prev => [res.resolution as any, ...prev]);
      alert('¡Sincronización completada! Se detectó un nuevo movimiento en el CEJ.');
    }
  };

  const handleDownloadDraft = async () => {
    setDownloading(true);
    try {
      const res = await fetch('/api/ai/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expediente: caso?.expediente_numero,
          juzgado: caso?.juzgado,
          demandante: 'PARTE DEMANDANTE',
          demandado: 'PARTE DEMANDADA',
          tipoEscrito: 'CUMPLE MANDATO Y SUBSANA ARANCEL',
          instrucciones: 'Se adjunta arancel judicial correspondiente y se solicita tener por subsanada la demanda.'
        })
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Escrito_Subsanacion_${caso?.expediente_numero}.docx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert('Error generando documento.');
      }
    } catch (e) {
      alert('Error de conexión.');
    } finally {
      setDownloading(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    setChatMessage('');

    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          text: `Entendido. Con base en la Resolución N° 04 de este expediente, tu plazo vence en 2 días hábiles. Puedes presionar el botón "Generar Escrito Word" arriba a la derecha para descargar la contestación/subsanación lista para firmar.` 
        }
      ]);
    }, 600);
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Cargando expediente...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Barra Superior */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a expedientes
          </button>

          <div className="flex flex-wrap items-center gap-3">
            {/* Botón Compartir Portal Cliente */}
            <button 
              onClick={handleCopyClientLink}
              className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-sm font-medium px-3.5 py-2.5 rounded-xl transition"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? '¡Enlace Copiado!' : 'Portal del Cliente'}</span>
            </button>

            <button 
              onClick={() => router.push(`/case/${id}/report`)}
              className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-sm font-medium px-3.5 py-2.5 rounded-xl transition"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              <span>Reporte PDF</span>
            </button>

            <button 
              onClick={handleSyncCEJ}
              disabled={syncing}
              className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-sm font-medium px-3.5 py-2.5 rounded-xl transition"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin text-indigo-400' : ''}`} />
              <span>{syncing ? 'Consultando CEJ...' : 'Verificar CEJ en Vivo'}</span>
            </button>

            <button 
              onClick={handleDownloadDraft}
              disabled={downloading}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition active:scale-95"
            >
              <FileDown className="w-4 h-4" />
              <span>{downloading ? 'Generando Word...' : 'Generar Escrito Word (.docx)'}</span>
            </button>
          </div>
        </div>

        {/* Encabezado del caso */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-bold text-white font-mono">{caso?.expediente_numero}</h1>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Monitoreo Activo CEJ
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-slate-500" /> {caso?.juzgado} ({caso?.distrito_judicial})</span>
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-500" /> {caso?.materia}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 px-5 py-3.5 rounded-2xl">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 animate-bounce" />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Plazo Fatal Detectado</p>
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded">DÍA 2 DE 3</span>
              </div>
              <p className="text-xs text-amber-200/90 mt-0.5">Vence en 2 días hábiles (Subsanación de arancel)</p>
            </div>
          </div>
        </div>

        {/* Pestañas: Actuaciones vs Finanzas */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button 
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === 'timeline' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            Línea de Tiempo y Resoluciones ({resolutions.length})
          </button>

          <button 
            onClick={() => setActiveTab('finances')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'finances' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Honorarios y Gastos Judiciales</span>
          </button>
        </div>

        {activeTab === 'timeline' ? (
          <>
            {/* Analítica Predictiva */}
            <CourtAnalytics juzgado={caso?.juzgado || ''} />

            {/* Timeline + Copiloto IA */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="pt-2">
                  {resolutions.map((res) => (
                    <TimelineItem key={res.id} resolution={res} />
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 flex flex-col h-[550px] sticky top-6">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
                  <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Copiloto Legal IurisBot</h4>
                    <p className="text-[11px] text-slate-400">Asistente conectado al expediente</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2 text-xs">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                        msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800/80 border border-slate-700/50 text-slate-200'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex items-center gap-2">
                  <input 
                    placeholder="Pregúntale algo sobre el expediente..." 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button type="submit" className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <FinanceTab />
        )}

      </div>
    </div>
  );
}