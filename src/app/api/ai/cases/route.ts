import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'database_cases.json');
let memoryCases: any[] = [];

function getDbCases() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const fileData = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        memoryCases = parsed;
        return memoryCases;
      }
    }
  } catch (e) {
    console.log('Using memory cases');
  }
  return memoryCases;
}

function saveDbCases(data: any[]) {
  memoryCases = data;
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.log('Error writing local file');
  }
}

// 1. MANEJADOR DE SEGURIDAD CORS PARA EXTENSIÓN DE CHROME
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
    },
  });
}

// 2. OBTENER EXPEDIENTES
export async function GET() {
  const cases = getDbCases();
  return NextResponse.json(cases, {
    headers: { 'Access-Control-Allow-Origin': '*' }
  });
}

// 3. GUARDAR / SINCRONIZAR EXPEDIENTE
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let cases = getDbCases();

    const nroExp = body.expediente || body.expediente_numero || '00009-2026-0-0101-JR-CI-01';

    cases = cases.filter((c: any) => c.expediente_numero !== nroExp);

    const newCase = {
      id: body.id || Date.now().toString(),
      expediente_numero: nroExp,
      distrito_judicial: body.distrito || body.distrito_judicial || 'AMAZONAS',
      juzgado: body.juzgado || 'Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)',
      materia: body.materia || 'CIVIL - Prescripción Adquisitiva de Dominio',
      status: 'ACTIVE',
      created_at: new Date().toISOString(),
      resoluciones: body.resoluciones || [
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
    };

    cases.unshift(newCase);
    saveDbCases(cases);

    return NextResponse.json({ success: true, data: newCase }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
}

// 4. ELIMINAR EXPEDIENTE
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    let cases = getDbCases();
    cases = cases.filter((c: any) => c.id !== id);
    saveDbCases(cases);

    return NextResponse.json({ success: true }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
}