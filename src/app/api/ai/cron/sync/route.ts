import { NextResponse } from 'next/server';
import { getCases } from '@/app/actions';
import { sendWhatsAppAlert } from '@/services/whatsapp.service';

// Endpoint automático llamado por el servidor en segundo plano
export async function GET() {
  try {
    const cases = await getCases();
    let updatesCount = 0;

    for (const item of cases) {
      // Simula la revisión del expediente en el CEJ del Poder Judicial
      console.log(`[CRON AUTO] Verificando expediente: ${item.expediente_numero}`);
      
      // Si el CEJ publica una novedad, se despacha el WhatsApp de inmediato:
      await sendWhatsAppAlert({
        to: '51987654321',
        expediente: item.expediente_numero,
        nroResolucion: 'Resolución N° 06 (Auto Calificatorio)',
        resumenIA: 'Se admite la demanda a trámite y se confiere traslado al demandado.',
        plazoDias: 5
      });

      updatesCount++;
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      expedientesRevisados: cases.length,
      alertasEnviadas: updatesCount
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}