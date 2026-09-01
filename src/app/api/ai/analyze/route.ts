import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { textoResolucion } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'tu_api_key_de_openai') {
      // Respuesta de prueba si aún no pusiste una API Key de OpenAI
      return NextResponse.json({
        resumen: "El juzgado resuelve tener por contestada la demanda y fija fecha de audiencia preliminar.",
        plazoDias: 3,
        accionRequerida: "Subsanar arancel judicial por derecho de notificación."
      });
    }

    const prompt = `Eres un asistente legal experto en derecho procesal peruano.
Analiza la siguiente resolución judicial y extrae en formato JSON:
1. "resumen": Resumen claro y conciso del fallo o decreto en máximo 3 oraciones.
2. "plazoDias": Número de días de plazo otorgado a las partes (si no hay plazo, pon 0).
3. "accionRequerida": Qué debe hacer el abogado (ej: "Apelar sentencia", "Subsanar arancel", "Ninguna acción inmediata").

Texto de la resolución:
"""
${textoResolucion}
"""

Responde ÚNICAMENTE un JSON válido con las claves: resumen, plazoDias, accionRequerida.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}