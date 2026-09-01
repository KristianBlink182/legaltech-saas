export interface WhatsAppAlertPayload {
  to: string; // Número de teléfono (ej: "51999888777")
  expediente: string;
  nroResolucion: string;
  resumenIA: string;
  plazoDias?: number;
}

export async function sendWhatsAppAlert(payload: WhatsAppAlertPayload) {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;

  if (!token || !phoneId) {
    console.log('[MOCK WHATSAPP] Notificación simulada enviada a:', payload.to);
    return { success: true, mock: true };
  }

  const messageText = `⚖️ *IurisBot Alerta Judicial*\n\n` +
    `📂 *Expediente:* ${payload.expediente}\n` +
    `📄 *Actuación:* ${payload.nroResolucion}\n\n` +
    `🤖 *Resumen IA:*\n${payload.resumenIA}\n\n` +
    (payload.plazoDias ? `⚠️ *Plazo Fatal:* ${payload.plazoDias} días hábiles.\n\n` : '') +
    `👉 Ingresa a tu panel para ver el expediente y generar escritos automáticos.`;

  try {
    const res = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: payload.to,
        type: 'text',
        text: { body: messageText }
      })
    });

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error enviando WhatsApp:', error);
    return { success: false, error };
  }
}