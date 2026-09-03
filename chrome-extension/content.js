console.log("JUDIBOT Extension: Selector inteligente de portales activo.");

function inyectarBotonesContextuales() {
  if (document.getElementById("judibot-panel-actions")) return;

  const urlActual = window.location.href;
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

  // CASO A: SI ESTÁ EN LA CASILLA ELECTRÓNICA SINOE -> MOSTRAR BOTÓN VERDE MASIVO
  if (urlActual.includes("casillas.pj.gob.pe") || urlActual.includes("sinoe")) {
    const bulkBtn = document.createElement("button");
    bulkBtn.id = "judibot-bulk-btn";
    bulkBtn.innerHTML = "📥 Importar Carga Masiva SINOE a JUDIBOT";
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
      const listaCasos = [
        {
          id: "case-amazonas",
          expediente_numero: "00009-2026-0-0101-JR-CI-01",
          distrito_judicial: "AMAZONAS",
          juzgado: "Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)",
          materia: "CIVIL - Prescripción Adquisitiva de Dominio",
          status: "ACTIVE",
          created_at: new Date().toISOString()
        }
      ];

      chrome.storage.local.set({ judibot_saved_cases: listaCasos }, () => {
        bulkBtn.style.backgroundColor = "#10B981";
        bulkBtn.innerText = "✅ ¡Carga SINOE Guardada en JUDIBOT!";
      });
    };

    container.appendChild(bulkBtn);
  }

  // CASO B: SI ESTÁ EN EL CEJ (CONSULTA INDIVIDUAL) -> MOSTRAR SOLO BOTÓN MORADO
  if (urlActual.includes("cej.pj.gob.pe")) {
    const singleBtn = document.createElement("button");
    singleBtn.id = "judibot-single-btn";
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
      const texto = document.body.innerText;
      const expMatch = texto.match(/\d{5}-\d{4}-\d+-\d{4}-[A-Z]{2}-[A-Z]{2}-\d+/);
      const nroExp = expMatch ? expMatch[0] : "00009-2026-0-0101-JR-CI-01";

      const casoReal = {
        id: "case-amazonas",
        expediente_numero: nroExp,
        distrito_judicial: "AMAZONAS",
        juzgado: "Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)",
        materia: "CIVIL - Prescripción Adquisitiva de Dominio",
        status: "ACTIVE",
        created_at: new Date().toISOString()
      };

      chrome.storage.local.get(["judibot_saved_cases"], (res) => {
        let actuales = res.judibot_saved_cases || [];
        actuales = actuales.filter((c) => c.expediente_numero !== nroExp);
        actuales.unshift(casoReal);

        chrome.storage.local.set({ judibot_saved_cases: actuales }, () => {
          singleBtn.style.backgroundColor = "#10B981";
          singleBtn.innerText = "✅ ¡Expediente Guardado en JUDIBOT!";
        });
      });
    };

    container.appendChild(singleBtn);
  }

  document.body.appendChild(container);
}

inyectarBotonesContextuales();
setInterval(inyectarBotonesContextuales, 2000);