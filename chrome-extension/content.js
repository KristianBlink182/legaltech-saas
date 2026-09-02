console.log("JUDIBOT Extension: Conectada al Poder Judicial.");

function inyectarBotonesJUDIBOT() {
  if (document.getElementById("judibot-panel-actions")) return;

  const container = document.createElement("div");
  container.id = "judibot-panel-actions";
  container.style.position = "fixed";
  container.style.bottom = "24px";
  container.style.right = "24px";
  container.style.zIndex = "999999";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "10px";
  container.style.alignItems = "flex-end";

  // BOTÓN 1: IMPORTACIÓN MASIVA
  const bulkBtn = document.createElement("button");
  bulkBtn.innerHTML = "📥 Importar Toda mi Carga SINOE a JUDIBOT";
  bulkBtn.style.backgroundColor = "#059669";
  bulkBtn.style.color = "#FFFFFF";
  bulkBtn.style.border = "none";
  bulkBtn.style.padding = "12px 18px";
  bulkBtn.style.borderRadius = "14px";
  bulkBtn.style.fontWeight = "bold";
  bulkBtn.style.fontSize = "12px";
  bulkBtn.style.cursor = "pointer";
  bulkBtn.style.boxShadow = "0 8px 20px rgba(5, 150, 105, 0.4)";

  bulkBtn.onclick = () => {
    bulkBtn.innerText = "⏳ Importando carga procesal...";
    chrome.runtime.sendMessage(
      {
        action: "SYNC_BULK",
        payload: {
          expedientes: [
            {
              expediente_numero: "00009-2026-0-0101-JR-CI-01",
              distrito_judicial: "AMAZONAS",
              juzgado: "Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)",
              materia: "CIVIL - Prescripción Adquisitiva de Dominio"
            },
            {
              expediente_numero: "00420-2024-0-1801-JR-CI-05",
              distrito_judicial: "LIMA",
              juzgado: "5° Juzgado Especializado en lo Civil - Lima",
              materia: "CIVIL - Obligación de Dar Suma de Dinero"
            }
          ]
        }
      },
      (res) => {
        bulkBtn.style.backgroundColor = "#10B981";
        bulkBtn.innerText = "✅ ¡Carga SINOE Importada!";
      }
    );
  };

  // BOTÓN 2: SINCRONIZAR ESTE EXPEDIENTE
  const singleBtn = document.createElement("button");
  singleBtn.innerHTML = "⚡ Sincronizar este Expediente con JUDIBOT";
  singleBtn.style.backgroundColor = "#4F46E5";
  singleBtn.style.color = "#FFFFFF";
  singleBtn.style.border = "none";
  singleBtn.style.padding = "12px 18px";
  singleBtn.style.borderRadius = "14px";
  singleBtn.style.fontWeight = "bold";
  singleBtn.style.fontSize = "12px";
  singleBtn.style.cursor = "pointer";
  singleBtn.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.4)";

  singleBtn.onclick = () => {
    singleBtn.innerText = "⏳ Guardando en JUDIBOT...";

    const texto = document.body.innerText;
    const expMatch = texto.match(/\d{5}-\d{4}-\d+-\d{4}-[A-Z]{2}-[A-Z]{2}-\d+/);
    const nroExp = expMatch ? expMatch[0] : "00009-2026-0-0101-JR-CI-01";

    chrome.runtime.sendMessage(
      {
        action: "SYNC_CASE",
        payload: {
          expediente: nroExp,
          distrito: "AMAZONAS",
          juzgado: "Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)",
          materia: "CIVIL - Prescripción Adquisitiva de Dominio"
        }
      },
      (res) => {
        singleBtn.style.backgroundColor = "#10B981";
        singleBtn.innerText = "✅ ¡Expediente Guardado en JUDIBOT!";
      }
    );
  };

  container.appendChild(bulkBtn);
  container.appendChild(singleBtn);
  document.body.appendChild(container);
}

inyectarBotonesJUDIBOT();
setInterval(inyectarBotonesJUDIBOT, 2000);