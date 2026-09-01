import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'database_cases.json');

export async function POST(req: Request) {
  try {
    const { expedientes } = await req.json();

    if (!Array.isArray(expedientes) || expedientes.length === 0) {
      return NextResponse.json({ error: 'Lista de expedientes vacía o inválida' }, { status: 400 });
    }

    let cases = [];
    if (fs.existsSync(DB_FILE)) {
      cases = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    }

    let insertados = 0;
    let actualizados = 0;

    for (const exp of expedientes) {
      const index = cases.findIndex((c: any) => c.expediente_numero === exp.expediente_numero);

      if (index === -1) {
        // Caso nuevo: lo insertamos al inicio
        cases.unshift({
          id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
          expediente_numero: exp.expediente_numero,
          distrito_judicial: exp.distrito_judicial || 'LIMA',
          juzgado: exp.juzgado || 'Juzgado Especializado',
          materia: exp.materia || 'Civil / Comercial',
          status: 'ACTIVE',
          created_at: new Date().toISOString(),
          resoluciones: exp.resoluciones || []
        });
        insertados++;
      } else {
        // Caso existente: actualizamos sus resoluciones
        if (exp.resoluciones && exp.resoluciones.length > 0) {
          cases[index].resoluciones = exp.resoluciones;
        }
        cases[index].ultimo_movimiento = new Date().toISOString();
        actualizados++;
      }
    }

    fs.writeFileSync(DB_FILE, JSON.stringify(cases, null, 2));

    return NextResponse.json({
      success: true,
      message: `Carga masiva SINOE completada: ${insertados} nuevos expedientes importados, ${actualizados} sincronizados.`,
      totalImportados: insertados,
      totalSincronizados: actualizados
    });
  } catch (err: any) {
    console.error('Error en bulk sync:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}