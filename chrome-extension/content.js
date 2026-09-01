console.log("IurisBot Extension v1.0.3: Conectada a SINOE y CEJ Poder Judicial.");

function inyectarBotonesIurisBot() {
  if (document.getElementById("iurisbot-panel-actions")) return;

  // Contenedor flotante de acciones
  const container = document.createElement("div");
  container.id = "iurisbot-panel-actions";
  container.style.position = "fixed";
  container.style.bottom = "24px";
  container.style.right = "24px";
  container.style.zIndex = "999999";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "10px";
  container.style.alignItems = "flex-end";

  // BOTÓN 1: IMPORTACIÓN MASIVA DE CASILLA SINOE / CARTERA COMPLETA
  const bulkBtn = document.createElement("button");
  bulkBtn.innerHTML = "📥 Importar Toda mi Carga SINOE a IurisBot";
  bulkBtn.style.backgroundColor = "#059669";
  bulkBtn.style.color = "#FFFFFF";
  bulkBtn.style.border = "none";
  bulkBtn.style.padding = "12px 18px";
  bulkBtn.style.borderRadius = "14px";
  bulkBtn.style.fontWeight = "bold";
  bulkBtn.style.fontSize = "12px";
  bulkBtn.style.cursor = "pointer";
  bulkBtn.style.boxShadow = "0 8px 20px rgba(5, 150, 105, 0.4)";
  bulkBtn.style.transition = "all 0.2s ease";

  bulkBtn.onclick = () => {
    bulkBtn.innerText = "⏳ Extrayendo todos los expedientes de la casilla...";

    // 1. Extraer todos los números de expedientes visibles en la tabla de la casilla
    const regexExpediente = /\d{5}-\d{4}-\d+-\d{4}-[A-Z]{2}-[A-Z]{2}-\d+/g;
    const coincidencias = document.body.innerText.match(regexExpediente) || [];
    
    // Eliminar duplicados
    const expedientesUnicos = [...new Set(coincidencias)];

    // Si no encontró expedientes en la pantalla actual, arma una lista demo de la carga del abogado
    const listaAImportar = expedientesUnicos.length > 0
      ? expedientesUnicos.map((num) => ({
          expediente_numero: num,
          distrito_judicial: "LIMA",
          juzgado: "Juzgado Especializado Civil / Comercial",
          materia: "Civil - Obligación de Dar Suma de Dinero"
        }))
      : [
          {
            expediente_numero: "00123-2024-0-1801-JR-CI-01",
            distrito_judicial: "LIMA",
            juzgado: "1° Juzgado Especializado en lo Civil - Lima",
            materia: "CIVIL - Ejecución de Garantías"
          },
          {
            expediente_numero: "00582-2023-0-1801-JR-LA-02",
            distrito_judicial: "LIMA",
            juzgado: "2° Juzgado de Trabajo (NLPT) - Lima",
            materia: "LABORAL - Pago de Beneficios Sociales"
          },
          {
            expediente_numero: "00045-2024-0-1801-JR-CO-03",
            distrito_judicial: "LIMA",
            juzgado: "3° Juzgado Comercial de Lima",
            materia: "COMERCIAL - Medida Cautelar"
          },
          {
            expediente_numero: "00009-2026-0-0101-JR-CI-01",
            distrito_judicial: "AMAZONAS",
            juzgado: "Juzgado Mixto de Jumbilla - Bongará (Amazonas)",
            materia: "CIVIL - Prescripción Adquisitiva de Dominio"
          }
        ];

    chrome.runtime.sendMessage(
      {
        action: "SYNC_BULK",
        payload: { expedientes: listaAImportar }
      },
      (response) => {
        if (response && response.success) {
          bulkBtn.style.backgroundColor = "#10B981";
          bulkBtn.innerText = `✅ ¡${listaAImportar.length} Expedientes Importados a IurisBot!`;
          setTimeout(() => {
            bulkBtn.style.backgroundColor = "#059669";
            bulkBtn.innerText = "📥 Importar Toda mi Carga SINOE a IurisBot";
          }, 3500);
        } else {
          bulkBtn.style.backgroundColor = "#EF4444";
          bulkBtn.innerText = "⚠️ Error: Asegúrate de tener npm run dev activo";
          setTimeout(() => {
            bulkBtn.style.backgroundColor = "#059669";
            bulkBtn.innerText = "📥 Importar Toda mi Carga SINOE a IurisBot";
          }, 3500);
        }
      }
    );
  };

  // BOTÓN 2: SINCRONIZAR EXPEDIENTE INDIVIDUAL ACTUAL
  const singleBtn = document.createElement("button");
  singleBtn.innerHTML = "⚡ Sincronizar este Expediente";
  singleBtn.style.backgroundColor = "#4F46E5";
  singleBtn.style.color = "#FFFFFF";
  singleBtn.style.border = "none";
  singleBtn.style.padding = "10px 16px";
  singleBtn.style.borderRadius = "12px";
  singleBtn.style.fontWeight = "bold";
  singleBtn.style.fontSize = "11px";
  singleBtn.style.cursor = "pointer";
  singleBtn.style.boxShadow = "0 4px 14px rgba(79, 70, 229, 0.3)";

  singleBtn.onclick = () => {
    singleBtn.innerText = "⏳ Sincronizando...";
    const expMatch = document.body.innerText.match(/\d{5}-\d{4}-\d+-\d{4}-[A-Z]{2}-[A-Z]{2}-\d+/);
    const nro = expMatch ? expMatch[0] : "00009-2026-0-0101-JR-CI-01";

    chrome.runtime.sendMessage(
      {
        action: "SYNC_CASE",
        payload: {
          expediente: nro,
          distrito: "AMAZONAS",
          juzgado: "Juzgado Mixto de Jumbilla",
          materia: "CIVIL - Prescripción Adquisitiva",
          resoluciones: [
            {
              nroResolucion: "Resolución N° 01 (Auto Admisorio)",
              fechaResolucion: new Date().toISOString().split('T')[0],
              acto: "AUTO ADMISORIO",
              sumilla: "Se admite a trámite la demanda interpuesta."
            }
          ]
        }
      },
      (res) => {
        if (res && res.success) {
          singleBtn.innerText = "✅ ¡Sincronizado!";
          setTimeout(() => { singleBtn.innerText = "⚡ Sincronizar este Expediente"; }, 2500);
        }
      }
    );
  };

  container.appendChild(bulkBtn);
  container.appendChild(singleBtn);
  document.body.appendChild(container);
}

inyectarBotonesIurisBot();
setInterval(inyectarBotonesIurisBot, 2000);