'use server';

import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'database_cases.json');

function readDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const fileData = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.log('Error reading db file');
  }
  return [];
}

function writeDb(data: any[]) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.log('Error writing db file');
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
  return cases.find((c: any) => c.id === id) || null;
}

export async function deleteCase(id: string) {
  try {
    let cases = readDb();
    cases = cases.filter((c: any) => c.id !== id);
    writeDb(cases);
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function syncCaseCEJ(caseId: string) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    resolution: {
      id: Date.now().toString(),
      case_id: caseId,
      nro_resolucion: 'Resolución N° 11 (Decreto)',
      fecha_resolucion: new Date().toLocaleDateString('es-PE'),
      acto: 'DECRETO - CÚMPLASE LO ORDENADO',
      sumilla: 'Se tiene por apersonado al nuevo letrado y continúese con el trámite procesal.',
      resumen_ia: '✅ Se tiene por registrado el apersonamiento legal sin observaciones.'
    }
  };
}