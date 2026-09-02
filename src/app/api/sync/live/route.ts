import { NextResponse } from 'next/server';
import { saveCase } from '@/app/actions';

// Permite peticiones desde la extensión de Chrome sin bloqueos
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log('[JUDIBOT EXTENSION SYNC]:', data.expediente);

    const saved = await saveCase({
      expediente_numero: data.expediente || '00009-2026-0-0101-JR-CI-01',
      distrito_judicial: data.distrito || 'AMAZONAS',
      juzgado: data.juzgado || 'Juzgado Mixto - Sede de Jumbilla',
      materia: data.materia || 'CIVIL - Prescripción Adquisitiva de Dominio'
    });

    return NextResponse.json(
      { success: true, message: 'Expediente guardado con éxito en JUDIBOT', data: saved },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}