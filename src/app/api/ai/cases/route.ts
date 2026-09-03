import { NextResponse } from 'next/server';

// Memoria global rápida y compatible con Vercel Serverless
let memoryCases: any[] = [
  {
    id: '1',
    expediente_numero: '00009-2026-0-0101-JR-CI-01',
    distrito_judicial: 'AMAZONAS',
    juzgado: 'Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)',
    materia: 'CIVIL - Prescripción Adquisitiva de Dominio',
    status: 'ACTIVE',
    created_at: new Date().toISOString(),
    resoluciones: [
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
    ]
  }
];

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}

export async function GET() {
  return NextResponse.json(memoryCases, {
    headers: { 'Access-Control-Allow-Origin': '*' }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const nroExp = body.expediente || body.expediente_numero || '00009-2026-0-0101-JR-CI-01';

    memoryCases = memoryCases.filter((c: any) => c.expediente_numero !== nroExp);

    const newCase = {
      id: body.id || Date.now().toString(),
      expediente_numero: nroExp,
      distrito_judicial: body.distrito || body.distrito_judicial || 'AMAZONAS',
      juzgado: body.juzgado || 'Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)',
      materia: body.materia || 'CIVIL - Prescripción Adquisitiva de Dominio',
      status: 'ACTIVE',
      created_at: new Date().toISOString(),
      resoluciones: body.resoluciones || memoryCases[0]?.resoluciones
    };

    memoryCases.unshift(newCase);

    return NextResponse.json({ success: true, data: newCase }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return NextResponse.json({ success: true, data: memoryCases[0] }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  memoryCases = memoryCases.filter((c: any) => c.id !== id);

  return NextResponse.json({ success: true }, {
    headers: { 'Access-Control-Allow-Origin': '*' }
  });
}