import { NextResponse } from 'next/server';
import { saveCase } from '@/app/actions';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No se subió ningún archivo' }, { status: 400 });
    }

    console.log(`[OCR IA] Procesando cédula judicial: ${file.name} (${file.size} bytes)...`);

    // Simulador de lectura profunda de PDF Judicial por IA
    // En producción se usa pdf-parse / GPT-4o Vision
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const expedienteExtraido = `00${Math.floor(100 + Math.random() * 900)}-2024-0-1801-JR-CI-01`;
    const juzgadoExtraido = '1° Juzgado Especializado en lo Civil de Lima';
    const materiaExtraida = 'CIVIL - Obligación de Dar Suma de Dinero';
    const sumillaExtraida = 'Se concede el plazo de 3 DÍAS HÁBILES para absolver el traslado de la excepción deducida.';

    // Guardar el caso extraído en la base de datos
    const nuevoCaso = await saveCase({
      expediente_numero: expedienteExtraido,
      distrito_judicial: 'LIMA',
      juzgado: juzgadoExtraido,
      materia: materiaExtraida
    });

    return NextResponse.json({
      success: true,
      data: {
        expediente: expedienteExtraido,
        juzgado: juzgadoExtraido,
        materia: materiaExtraida,
        resolucion: 'Resolución N° 02 (Auto)',
        sumilla: sumillaExtraida,
        plazoDias: 3,
        casoId: nuevoCaso.data?.id
      }
    });
  } catch (err: any) {
    console.error('Error procesando cédula:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}