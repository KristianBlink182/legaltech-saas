'use server';

import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'database_cases.json');

const INITIAL_DEMO_CASES = [
  {
    id: '1',
    expediente_numero: '00009-2026-0-0101-JR-CI-01',
    distrito_judicial: 'AMAZONAS',
    juzgado: 'Juzgado Mixto de Jumbilla - Bongará (Amazonas)',
    materia: 'CIVIL - Prescripción Adquisitiva de Dominio',
    status: 'ACTIVE',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    expediente_numero: '00420-2024-0-1801-JR-CI-05',
    distrito_judicial: 'LIMA',
    juzgado: '5° Juzgado Especializado en lo Civil - Lima',
    materia: 'CIVIL - Obligación de Dar Suma de Dinero',
    status: 'ACTIVE',
    created_at: new Date().toISOString()
  }
];

function readDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const fileData = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.log('Using memory database fallback');
  }
  return INITIAL_DEMO_CASES;
}

function writeDb(data: any[]) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.log('Error writing local file on serverless');
  }
}

export async function getCases() {
  return readDb();
}

export async function saveCase(formData: {
  expediente_numero: string;
  distrito_judicial: string;
  juzgado: string;
  materia: string;
}) {
  try {
    const cases = readDb();
    const newCase = {
      id: Date.now().toString(),
      expediente_numero: formData.expediente_numero,
      distrito_judicial: formData.distrito_judicial,
      juzgado: formData.juzgado,
      materia: formData.materia,
      status: 'ACTIVE',
      created_at: new Date().toISOString()
    };

    cases.unshift(newCase);
    writeDb(cases);
    return { success: true, data: newCase };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function getCaseById(id: string) {
  const cases = readDb();
  const found = cases.find((c: any) => c.id === id);
  return found || INITIAL_DEMO_CASES[0];
}

export async function syncCaseCEJ(caseId: string) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    success: true,
    resolution: {
      id: Date.now().toString(),
      case_id: caseId,
      nro_resolucion: 'Resolución N° 02 (Auto de Saneamiento)',
      fecha_resolucion: new Date().toISOString().split('T')[0],
      acto: 'AUTO QUE DECLARA SANEADO EL PROCESO',
      sumilla: 'Se declara la existencia de una relación jurídica procesal válida y se fijan los puntos controvertidos.',
      resumen_ia: '✅ El juez declaró saneado el proceso legal. No existen nulidades pendientes.'
    }
  };
}