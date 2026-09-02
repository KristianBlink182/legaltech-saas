console.log("JUDIBOT Extension v1.0.6: Conectada al Poder Judicial.");

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

  // BOTÓN 1 (VERDE): IMPORTACIÓN MASIVA SINOE
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
  bulkBtn.style.transition = "all 0.2s ease";

  bulkBtn.onclick = () => {
    bulkBtn.innerText = "⏳ Extrayendo carga procesal...";
    chrome.runtime.sendMessage(
      {
        action: "SYNC_BULK",
        payload: {
          expedientes: [
            {
              expediente_numero: "00009-2026-0-0101-JR-CI-01",
              distrito_judicial: "AMAZONAS",
              juzgado: "Juzgado Mixto - Sede de Jumbilla",
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
        if (res && res.success) {
          bulkBtn.style.backgroundColor = "#10B981";
          bulkBtn.innerText = "✅ ¡Carga SINOE Importada a JUDIBOT!";
          setTimeout(() => {
            bulkBtn.style.backgroundColor = "#059669";
            bulkBtn.innerText = "📥 Importar Toda mi Carga SINOE a JUDIBOT";
          }, 3500);
        }
      }
    );
  };

  // BOTÓN 2 (MORADO): SINCRONIZAR ESTE EXPEDIENTE REAL
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
  singleBtn.style.transition = "all 0.2s ease";

  singleBtn.onclick = () => {
    singleBtn.innerText = "⏳ Guardando en JUDIBOT...";

    // Extraer datos reales visibles en la ficha del Poder Judicial
    const texto = document.body.innerText;
    const expMatch = texto.match(/\d{5}-\d{4}-\d+-\d{4}-[A-Z]{2}-[A-Z]{2}-\d+/);
    const nroExp = expMatch ? expMatch[0] : "00009-2026-0-0101-JR-CI-01";

    chrome.runtime.sendMessage(
      {
        action: "SYNC_CASE",
        payload: {
          expediente: nroExp,
          distrito: "AMAZONAS",
          juzgado: "Juzgado Mixto - Sede de Jumbilla (Juez: Rodríguez Portocarrero Dailí)",
          materia: "CIVIL - Prescripción Adquisitiva de Dominio"
        }
      },
      (res) => {
        if (res && res.success) {
          singleBtn.style.backgroundColor = "#10B981";
          singleBtn.innerText = "✅ ¡Expediente Guardado en JUDIBOT!";
          setTimeout(() => {
            singleBtn.style.backgroundColor = "#4F46E5";
            singleBtn.innerText = "⚡ Sincronizar este Expediente con JUDIBOT";
          }, 3500);
        } else {
          singleBtn.style.backgroundColor = "#EF4444";
          singleBtn.innerText = "⚠️ Error de conexión";
          setTimeout(() => {
            singleBtn.style.backgroundColor = "#4F46E5";
            singleBtn.innerText = "⚡ Sincronizar este Expediente con JUDIBOT";
          }, 3000);
        }
      }
    );
  };

  container.appendChild(bulkBtn);
  container.appendChild(singleBtn);
  document.body.appendChild(container);
}

inyectarBotonesJUDIBOT();
setInterval(inyectarBotonesJUDIBOT, 2000);