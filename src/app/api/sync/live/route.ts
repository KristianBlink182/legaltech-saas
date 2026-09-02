import { NextResponse } from 'next/server';
import { saveCase } from '@/app/actions';

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
    const body = await req.json();

    const saved = await saveCase({
      expediente_numero: body.expediente || body.expediente_numero || '00009-2026-0-0101-JR-CI-01',
      distrito_judicial: body.distrito || body.distrito_judicial || 'AMAZONAS',
      juzgado: body.juzgado || 'Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)',
      materia: body.materia || 'CIVIL - Prescripción Adquisitiva de Dominio'
    });

    return NextResponse.json(
      { success: true, message: 'Expediente sincronizado con éxito', data: saved },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}