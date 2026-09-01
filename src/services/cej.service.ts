import { supabase } from '@/lib/supabase';

export interface CEJResolutionResult {
  nro_resolucion: string;
  fecha_resolucion: string;
  acto: string;
  sumilla: string;
  documento_url?: string;
  resumen_ia: string;
}

export class CEJService {
  /**
   * Sincroniza un expediente buscando nuevas resoluciones
   */
  static async syncCase(caseId: string, nroExpediente: string): Promise<CEJResolutionResult[]> {
    console.log(`Iniciando rastreo en CEJ para: ${nroExpediente}`);

    // Simulador de extracción CEJ (aquí se conecta con Playwright / Scraper real)
    const simulatedResolutions: CEJResolutionResult[] = [
      {
        nro_resolucion: 'Res. N° 05',
        fecha_resolucion: new Date().toISOString().split('T')[0],
        acto: 'DECRETO - TRASLADO DE EXCEPCION',
        sumilla: 'Se corre traslado a la contraparte de la excepción deducida por el plazo de 3 días.',
        resumen_ia: 'El juzgado corre traslado de la excepción planteada. Tienes 3 DÍAS HÁBILES para absolverla.',
        documento_url: 'https://www.pj.gob.pe'
      }
    ];

    // Guardar en la base de datos Supabase
    for (const res of simulatedResolutions) {
      await supabase.from('resolutions').insert([
        {
          case_id: caseId,
          nro_resolucion: res.nro_resolucion,
          fecha_resolucion: res.fecha_resolucion,
          acto: res.acto,
          sumilla: res.sumilla,
          resumen_ia: res.resumen_ia,
          documento_url: res.documento_url
        }
      ]);
    }

    return simulatedResolutions;
  }
}