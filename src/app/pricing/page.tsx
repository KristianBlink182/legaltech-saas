'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Zap, Shield, Crown, Sparkles } from 'lucide-react';

export default function PricingPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Abogado Independiente',
      desc: 'Ideal para litigantes individuales que buscan automatizar sus alertas.',
      price: billingCycle === 'monthly' ? 79 : 65,
      icon: Zap,
      popular: false,
      features: [
        'Monitoreo de hasta 25 expedientes CEJ',
        'Alertas inmediatas por Correo y Dashboard',
        '10 consultas de IA al mes',
        'Generador de escritos Word básico',
        'Calendario de plazos judiciales'
      ],
      btnText: 'Comenzar Plan Starter',
      btnColor: 'bg-slate-800 hover:bg-slate-700 text-white'
    },
    {
      name: 'IurisBot PRO (Recomendado)',
      desc: 'Para abogados activos que necesitan WhatsApp directo y redacción IA.',
      price: billingCycle === 'monthly' ? 149 : 119,
      icon: Crown,
      popular: true,
      features: [
        'Monitoreo de hasta 100 expedientes (CEJ + MPFN)',
        'Alertas instantáneas por WhatsApp con Audio IA',
        'Copiloto IA ilimitado por caso',
        'Descarga de Escritos Word (.docx) ilimitados',
        'Reportes en PDF con Marca Blanca para clientes',
        'Analítica Predictiva de Juzgados y Jueces'
      ],
      btnText: 'Activar Prueba Gratuita (7 días)',
      btnColor: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
    },
    {
      name: 'Estudios Jurídicos (Firm)',
      desc: 'Para firmas y áreas legales corporativas con múltiples abogados.',
      price: billingCycle === 'monthly' ? 299 : 249,
      icon: Shield,
      popular: false,
      features: [
        'Expedientes Ilimitados (CEJ, MPFN, INDECOPI, OSCE)',
        'Hasta 5 usuarios / abogados del estudio',
        'Módulo de delegación y asignación de tareas',
        'Integración con Casilla Electrónica SINOE',
        'Extensión de Chrome Corporativa',
        'Soporte prioritario 24/7 por WhatsApp'
      ],
      btnText: 'Contactar Ventas Corporativas',
      btnColor: 'bg-slate-800 hover:bg-slate-700 text-white'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
          </button>
          <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full">
            Planes Flexibles en Soles (PEN)
          </span>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Invierte en tu tranquilidad profesional
          </h1>
          <p className="text-sm text-slate-400">
            Nunca más pierdas un plazo fatal ni gastes horas armando reportes para tus clientes.
          </p>

          {/* Toggle Mensual / Anual */}
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-2xl mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-medium rounded-xl transition ${
                billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pago Mensual
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-medium rounded-xl transition flex items-center gap-1 ${
                billingCycle === 'annual' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Pago Anual</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 py-0.2 rounded-md">Ahorra 20%</span>
            </button>
          </div>
        </div>

        {/* Tarjetas de Precios */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`relative bg-slate-900/70 border rounded-3xl p-7 flex flex-col justify-between transition duration-200 ${
                plan.popular ? 'border-indigo-500/80 shadow-2xl shadow-indigo-500/10' : 'border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Más Elegido por Litigantes
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-bold text-white">{plan.name}</span>
                  <div className="p-2 rounded-xl bg-slate-800 text-indigo-400">
                    <plan.icon className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-6 leading-relaxed">{plan.desc}</p>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">S/ {plan.price}</span>
                  <span className="text-xs text-slate-500">/ mes {billingCycle === 'annual' ? '(facturado anual)' : ''}</span>
                </div>

                <div className="space-y-3 border-t border-slate-800 pt-6">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => alert(`Iniciando pasarela de pago para el plan: ${plan.name}`)}
                className={`w-full font-semibold text-xs py-3 rounded-xl transition mt-8 active:scale-95 ${plan.btnColor}`}
              >
                {plan.btnText}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}