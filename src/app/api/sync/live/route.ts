import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'database_cases.json');

export async function POST(req: Request) {
  try {
    const { expediente, distrito, juzgado, materia, resoluciones } = await req.json();

    if (!expediente) {
      return NextResponse.json({ error: 'Número de expediente requerido' }, { status: 400 });
    }

    let cases = [];
    if (fs.existsSync(DB_FILE)) {
      cases = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    }

    // Buscar si el caso ya existe o crear uno nuevo con los datos reales
    let existingCase = cases.find((c: any) => c.expediente_numero === expediente);

    if (!existingCase) {
      existingCase = {
        id: Date.now().toString(),
        expediente_numero: expediente,
        distrito_judicial: distrito || 'LIMA',
        juzgado: juzgado || 'Juzgado Especializado',
        materia: materia || 'Civil',
        status: 'ACTIVE',
        created_at: new Date().toISOString(),
        resoluciones: resoluciones || []
      };
      cases.unshift(existingCase);
    } else {
      existingCase.resoluciones = resoluciones || [];
      existingCase.ultimo_movimiento = new Date().toISOString();
    }

    fs.writeFileSync(DB_FILE, JSON.stringify(cases, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Expediente y resoluciones sincronizadas en tiempo real',
      caseId: existingCase.id
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}