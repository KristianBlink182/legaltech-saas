console.log("JUDIBOT Extension: Monitor activo en el Poder Judicial.");

function inyectarBotonPJ() {
  if (!window.location.hostname.includes("pj.gob.pe")) return;
  if (document.getElementById("judibot-single-btn")) return;

  const btn = document.createElement("button");
  btn.id = "judibot-single-btn";
  btn.innerHTML = "⚡ Sincronizar este Expediente con JUDIBOT";
  btn.style.position = "fixed";
  btn.style.bottom = "24px";
  btn.style.right = "24px";
  btn.style.zIndex = "999999";
  btn.style.backgroundColor = "#4F46E5";
  btn.style.color = "#FFFFFF";
  btn.style.border = "none";
  btn.style.padding = "14px 20px";
  btn.style.borderRadius = "14px";
  btn.style.fontWeight = "bold";
  btn.style.fontSize = "12px";
  btn.style.cursor = "pointer";
  btn.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.4)";
  btn.style.transition = "all 0.2s ease";

  btn.onclick = () => {
    btn.innerText = "⏳ Guardando en JUDIBOT...";

    const texto = document.body.innerText;
    const expMatch = texto.match(/\d{5}-\d{4}-\d+-\d{4}-[A-Z]{2}-[A-Z]{2}-\d+/);
    const nroExp = expMatch ? expMatch[0] : "00009-2026-0-0101-JR-CI-01";

    chrome.runtime.sendMessage(
      {
        action: "SYNC_CASE",
        payload: {
          id: "case-amazonas",
          expediente_numero: nroExp,
          distrito_judicial: "AMAZONAS",
          juzgado: "Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)",
          materia: "CIVIL - Prescripción Adquisitiva de Dominio"
        }
      },
      (res) => {
        btn.style.backgroundColor = "#10B981";
        btn.innerText = "✅ ¡Expediente Guardado en JUDIBOT!";
        setTimeout(() => {
          btn.style.backgroundColor = "#4F46E5";
          btn.innerText = "⚡ Sincronizar este Expediente con JUDIBOT";
        }, 3000);
      }
    );
  };

  document.body.appendChild(btn);
}

inyectarBotonPJ();
setInterval(inyectarBotonPJ, 2000);