// Feriados oficiales en Perú y días no laborables PJ 2024 - 2026
const FERIADOS_PERU = [
  "2024-01-01", "2024-03-28", "2024-03-29", "2024-05-01", "2024-06-07",
  "2024-06-29", "2024-07-23", "2024-07-28", "2024-07-29", "2024-08-06",
  "2024-08-30", "2024-10-08", "2024-11-01", "2024-12-08", "2024-12-09", "2024-12-25"
];

export function calcularVencimientoPlazo(fechaNotificacion: Date, diasHabiles: number): { fechaVencimiento: string; diasRestantes: number } {
  let contador = 0;
  let fechaActual = new Date(fechaNotificacion);

  // El plazo procesal en Perú empieza a correr al día siguiente hábil de la notificación
  while (contador < diasHabiles) {
    fechaActual.setDate(fechaActual.getDate() + 1);
    const diaSemana = fechaActual.getDay(); // 0 = Domingo, 6 = Sábado
    const fechaISO = fechaActual.toISOString().split('T')[0];

    const esFinDeSemana = diaSemana === 0 || diaSemana === 6;
    const esFeriado = FERIADOS_PERU.includes(fechaISO);

    if (!esFinDeSemana && !esFeriado) {
      contador++;
    }
  }

  const hoy = new Date();
  const diferenciaTiempo = fechaActual.getTime() - hoy.getTime();
  const diasRestantes = Math.max(0, Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24)));

  return {
    fechaVencimiento: fechaActual.toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    diasRestantes
  };
}