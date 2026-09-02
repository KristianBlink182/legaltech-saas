'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Building2, User, Sparkles, AlertTriangle, Send, FileDown, RefreshCw, Printer, DollarSign, Share2, Check, Trash2 } from 'lucide-react';
import { TimelineItem } from '@/components/TimelineItem';
import { CourtAnalytics } from '@/components/CourtAnalytics';
import { FinanceTab } from '@/components/FinanceTab';

export default function CaseDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [caso, setCaso] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'timeline' | 'finances'>('timeline');
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', text: 'Hola, soy tu copiloto legal JUDIBOT. He analizado el expediente y sus actuaciones oficiales del Poder Judicial.' }
  ]);

  const [resolutions, setResolutions] = useState<any[]>([
    {
      id: 'res-10',
      nro_resolucion: 'Resolución N° 10 (Decreto)',
      fecha_resolucion: '19/08/2026',
      acto: 'DECRETO - INGRESE A DESPACHO',
      sumilla: 'AL PRINCIPAL. Y SIENDO EL ESTADO DEL PROCESO INGRESE LOS AUTOS A DESPACHO PARA RESOLVER; INTERVIENE LA SECRETARIA JUDICIAL POR DISPOSICIÓN SUPERIOR; NOTIFÍQUESE.',
      resumen_ia: '✅ El proceso se encuentra expedito y pasa al despacho del juez para emitir resolución de fondo.'
    },
    {
      id: 'res-09',
      nro_resolucion: 'Resolución Judicial (Ingreso)',
      fecha_resolucion: '08/07/2026',
      acto: 'REITERACIÓN DE OFICIO',
      sumilla: 'APELACIÓN DE AUTO - PRINCIPAL / REITERÁNDOSE OFICIO AL JUZGADO CIVIL PERMANENTE.',
      resumen_ia: 'Reiteración de oficio judicial en trámite de apelación elevada.'
    },
    {
      id: 'res-vista',
      nro_resolucion: 'Auto de Vista (Sala Superior)',
      fecha_resolucion: '18/05/2026',
      acto: 'AUTO DE VISTA - DECLARA FUNDADO',
      sumilla: 'DECLARA FUNDADO EL RECURSO DE APELACIÓN PRESENTADO POR LOS DEMANDANTES (POCLIN CATPO) CONTRA LA RESOLUCIÓN RECURRIDA; DECLARA NULA LA RESOLUCIÓN.',
      resumen_ia: '⚠️ La Sala Superior declaró FUNDADA la apelación de los demandantes y NULA la resolución apelada.'
    }
  ]);

  useEffect(() => {
    // 1. Cargar desde memoria permanente del navegador
    const savedCases = localStorage.getItem('judibot_cases');
    if (savedCases) {
      const parsed = JSON.parse(savedCases);
      const found = parsed.find((c: any) => c.id === id);
      if (found) {
        setCaso(found);
        if (found.resoluciones && found.resoluciones.length > 0) {
          setResolutions(found.resoluciones);
        }
      }
    }

    if (!caso) {
      setCaso({
        id: id,
        expediente_numero: '00009-2026-0-0101-JR-CI-01',
        distrito_judicial: 'AMAZONAS',
        juzgado: 'Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)',
        materia: 'CIVIL - Prescripción Adquisitiva de Dominio'
      });
    }

    setLoading(false);
  }, [id]);

  // FUNCIÓN DE BORRADO REAL Y PERMANENTE
  const handleDelete = () => {
    if (confirm('¿Estás seguro de que deseas eliminar este expediente del monitoreo?')) {
      const savedCases = localStorage.getItem('judibot_cases');
      if (savedCases) {
        const parsed = JSON.parse(savedCases);
        const filtered = parsed.filter((c: any) => c.id !== id);
        localStorage.setItem('judibot_cases', JSON.stringify(filtered));
      }
      router.push('/');
    }
  };

  const handleCopyClientLink = () => {
    const url = `${window.location.origin}/client-portal/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSyncCEJ = () => {
    setSyncing(true);
    setTimeout(() => {
      const newRes = {
        id: Date.now().toString(),
        nro_resolucion: 'Resolución N° 11 (Decreto)',
        fecha_resolucion: new Date().toLocaleDateString('es-PE'),
        acto: 'DECRETO - CÚMPLASE LO ORDENADO',
        sumilla: 'Se tiene por apersonado al nuevo letrado y estese a lo resuelto en autos.',
        resumen_ia: '✅ Se tiene por registrado el apersonamiento legal sin observaciones.'
      };
      setResolutions(prev => [newRes, ...prev]);
      setSyncing(false);
      alert('¡Sincronización completada con éxito!');
    }, 1200);
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
          demandante: 'POCLIN CATPO LEONIDAS Y DEMETRIO',
          demandado: 'CORBERA CHUQUIZUTA LELIS ENRIQUE',
          tipoEscrito: 'SOLICITA SENTENCIA Y PRONTO DESPACHO',
          instrucciones: 'Se solicita al juez emitir sentencia de fondo al encontrarse el proceso en estado de resolver.'
        })
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Escrito_${caso?.expediente_numero}.docx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (e) {
      alert('Error descargando documento');
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
          text: `Entendido. Conforme a la Resolución N° 10 del 19/08/2026 de este expediente de Amazonas, el proceso se encuentra en despacho para resolver. Puedes presionar "Descargar Escrito Word" para solicitar emisión de sentencia.` 
        }
      ]);
    }, 600);
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Cargando expediente...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Barra Superior con Controles */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a expedientes
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <button 
              onClick={handleCopyClientLink}
              className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold px-3 py-2 rounded-xl transition"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? '¡Copiado!' : 'Portal Cliente'}</span>
            </button>

            <button 
              onClick={() => router.push(`/case/${id}/report`)}
              className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-2 rounded-xl transition"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              <span>Reporte PDF</span>
            </button>

            <button 
              onClick={handleSyncCEJ}
              disabled={syncing}
              className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-2 rounded-xl transition"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin text-indigo-400' : ''}`} />
              <span>{syncing ? 'Verificando...' : 'Verificar CEJ'}</span>
            </button>

            <button 
              onClick={handleDownloadDraft}
              disabled={downloading}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-lg shadow-indigo-600/30 transition active:scale-95"
            >
              <FileDown className="w-4 h-4" />
              <span>{downloading ? 'Generando...' : 'Descargar Escrito Word'}</span>
            </button>

            {/* BOTÓN DEL TACHO ROJO DE ELIMINAR */}
            <button 
              onClick={handleDelete}
              className="p-2 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 rounded-xl transition"
              title="Eliminar Expediente"
            >
              <Trash2 className="w-4 h-4" />
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
              <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Estado Judicial</p>
              <p className="text-xs text-amber-200/90 mt-0.5">Autos a Despacho para Resolver (Trámite)</p>
            </div>
          </div>
        </div>

        {/* Pestañas */}
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
            <CourtAnalytics juzgado={caso?.juzgado || ''} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="pt-2">
                  {resolutions.map((res: any, idx: number) => (
                    <TimelineItem key={res.id || idx} resolution={res} />
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 flex flex-col h-[550px] sticky top-6">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
                  <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Copiloto Legal JUDIBOT</h4>
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