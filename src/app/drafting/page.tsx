'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, FileDown, Copy, Check, BookOpen } from 'lucide-react';

export default function DraftingStudioPage() {
  const router = useRouter();

  const [tipoEscrito, setTipoEscrito] = useState('RECURSO DE APELACIÓN');
  const [expediente, setExpediente] = useState('00420-2024-0-1801-JR-CI-05');
  const [juzgado, setJuzgado] = useState('5° Juzgado Especializado en lo Civil de Lima');
  const [demandante, setDemandante] = useState('BANCO DE CRÉDITO DEL PERÚ');
  const [demandado, setDemandado] = useState('INVERSIONES INMOBILIARIAS S.A.C.');
  const [argumentos, setArgumentos] = useState('Que el juzgado no valoró adecuadamente el contrato de fianza obrante a fojas 45.');
  
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setResultado('');

    setTimeout(() => {
      setResultado(
`EXPEDIENTE   : ${expediente}
ESPECIALISTA : Legal
CUADERNO     : Principal
ESCRITO      : 02-2024
SUMILLA      : INTERPONE ${tipoEscrito}

SEÑOR JUEZ DEL ${juzgado.toUpperCase()}:

[NOMBRE DEL LETRADO/PARTE], con Registro C.A.L. N° [____], en los seguidos por ${demandante} contra ${demandado}, ante usted con el debido respeto me presento y digo:

I. PETITORIO:
Que, dentro del plazo de ley, al amparo del artículo 364° y siguientes del Código Procesal Civil, interpongo formalmente ${tipoEscrito} contra la resolución emitida en autos, a fin de que sea elevada al Superior en Grado con el propósito de que sea REVOCADA o DECLARADA NULA, en atención a los siguientes fundamentos de hecho y derecho:

II. FUNDAMENTOS DEL AGRAVIO:
1. Conforme se desprende del petitorio, ${argumentos}
2. Se ha vulnerado el derecho constitucional a la debida motivación de las resoluciones judiciales garantizado por el Art. 139 inc. 5 de la Carta Magna.

III. SUSTENTO JURÍDICO:
- Artículo 139° incisos 3 y 5 de la Constitución Política del Perú.
- Artículos I del Título Preliminar y 364° del Código Procesal Civil.

POR TANTO:
A Usted Señor Juez, pido conceder el presente recurso y elevar los actuados a la Sala Superior.

Lima, ${new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}`
      );
      setLoading(false);
    }, 1000);
  };

  const handleDownloadWord = async () => {
    const res = await fetch('/api/ai/draft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        expediente,
        juzgado,
        demandante,
        demandado,
        tipoEscrito,
        instrucciones: argumentos
      })
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Escrito_${tipoEscrito.replace(/\s+/g, '_')}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 antialiased">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
          </button>
          <div className="flex items-center gap-2 text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-xl">
            <Sparkles className="w-4 h-4" /> Redactor Jurídico con IA
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Estudio de Redacción Legal Autónoma</h1>
          <p className="text-xs text-slate-400 mt-0.5">Genera escritos procesales completos con jurisprudencia y formato peruano</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Formulario de Entrada */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Tipo de Escrito Judicial</label>
              <select 
                value={tipoEscrito}
                onChange={(e) => setTipoEscrito(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="RECURSO DE APELACIÓN">Recurso de Apelación de Auto / Sentencia</option>
                <option value="CONTESTACIÓN DE DEMANDA">Contestación de Demanda</option>
                <option value="SOLICITUD DE MEDIDA CAUTELAR">Solicitud de Medida Cautelar Fuera / Dentro de Proceso</option>
                <option value="DEDUCE EXCEPCIÓN DE PRESCRIPCIÓN">Deduce Excepción Procesal</option>
                <option value="SOLICITA REQUERIMIENTO DE EJECUCIÓN">Solicita Requerimiento y Cumplimiento de Sentencia</option>
                <option value="TÉNGASE PRESENTE Y OTORGA FACULTADES">Téngase Presente y Nombramiento de Abogado</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Expediente N°</label>
                <input 
                  value={expediente} 
                  onChange={(e) => setExpediente(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Juzgado / Sala</label>
                <input 
                  value={juzgado} 
                  onChange={(e) => setJuzgado(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Demandante / Agraviado</label>
                <input 
                  value={demandante} 
                  onChange={(e) => setDemandante(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Demandado / Imputado</label>
                <input 
                  value={demandado} 
                  onChange={(e) => setDemandado(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Argumentos Clave / Instrucciones para la IA</label>
              <textarea 
                rows={4}
                value={argumentos}
                onChange={(e) => setArgumentos(e.target.value)}
                placeholder="Indica las razones por las cuales se apela, los medios probatorios omitidos o la pretensión..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Redactando con IA...' : 'Redactar Escrito con IA'}</span>
            </button>
          </div>

          {/* Panel de Vista Previa y Descarga */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Vista Previa del Escrito</span>
                {resultado && (
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(resultado);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
                  </button>
                )}
              </div>

              {resultado ? (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap max-h-[420px] overflow-y-auto leading-relaxed">
                  {resultado}
                </div>
              ) : (
                <div className="text-center py-24 text-slate-500">
                  <BookOpen className="w-10 h-10 mx-auto mb-2 text-slate-700" />
                  <p className="text-xs">Configura los datos a la izquierda y presiona "Redactar"</p>
                </div>
              )}
            </div>

            {resultado && (
              <button 
                onClick={handleDownloadWord}
                className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95"
              >
                <FileDown className="w-4 h-4" />
                <span>Descargar en Formato Word (.docx)</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}