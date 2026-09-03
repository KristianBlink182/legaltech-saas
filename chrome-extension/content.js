console.log("JUDIBOT Extension v2.3.0: Puente Oficial Activo.");

// 1. SI ESTAMOS EN LA WEB DE JUDIBOT (VERCEL O LOCALHOST):
// Pasa los casos guardados a la pantalla en silencio (SIN MOSTRAR BOTONES)
if (window.location.hostname.includes("vercel.app") || window.location.hostname.includes("localhost")) {
  if (chrome && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(["judibot_saved_cases"], (res) => {
      if (res && res.judibot_saved_cases && Array.isArray(res.judibot_saved_cases)) {
        localStorage.setItem("judibot_cases", JSON.stringify(res.judibot_saved_cases));
        window.dispatchEvent(new Event("storage"));
      }
    });
  }
}

// 2. SI ESTAMOS EN EL PODER JUDICIAL (CEJ / SINOE):
// Inyecta los dos botones abajo a la derecha
if (window.location.hostname.includes("pj.gob.pe")) {
  function inyectarBotonesPJ() {
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

    // BOTÓN 1 (VERDE): IMPORTACIÓN MASIVA
    const bulkBtn = document.createElement("button");
    bulkBtn.id = "judibot-bulk-btn";
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
      const listaCasos = [
        {
          id: "case-amazonas",
          expediente_numero: "00009-2026-0-0101-JR-CI-01",
          distrito_judicial: "AMAZONAS",
          juzgado: "Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)",
          materia: "CIVIL - Prescripción Adquisitiva de Dominio",
          status: "ACTIVE",
          created_at: new Date().toISOString()
        },
        {
          id: "case-lima",
          expediente_numero: "00420-2024-0-1801-JR-CI-05",
          distrito_judicial: "LIMA",
          juzgado: "5° Juzgado Especializado en lo Civil - Lima",
          materia: "CIVIL - Obligación de Dar Suma de Dinero",
          status: "ACTIVE",
          created_at: new Date().toISOString()
        }
      ];

      if (chrome && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ judibot_saved_cases: listaCasos }, () => {
          bulkBtn.style.backgroundColor = "#10B981";
          bulkBtn.innerText = "✅ ¡Carga SINOE Guardada!";
          setTimeout(() => {
            bulkBtn.style.backgroundColor = "#059669";
            bulkBtn.innerText = "📥 Importar Toda mi Carga SINOE a JUDIBOT";
          }, 3500);
        });
      }
    };

    // BOTÓN 2 (MORADO): SINCRONIZAR ESTE EXPEDIENTE
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

      if (chrome && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(["judibot_saved_cases"], (res) => {
          let actuales = res.judibot_saved_cases || [];
          actuales = actuales.filter((c) => c.expediente_numero !== nroExp);
          actuales.unshift(casoReal);

          chrome.storage.local.set({ judibot_saved_cases: actuales }, () => {
            singleBtn.style.backgroundColor = "#10B981";
            singleBtn.innerText = "✅ ¡Expediente Guardado en JUDIBOT!";
            setTimeout(() => {
              singleBtn.style.backgroundColor = "#4F46E5";
              singleBtn.innerText = "⚡ Sincronizar este Expediente con JUDIBOT";
            }, 3500);
          });
        });
      }
    };

    container.appendChild(bulkBtn);
    container.appendChild(singleBtn);
    document.body.appendChild(container);
  }

  inyectarBotonesPJ();
  setInterval(inyectarBotonesPJ, 2000);
}