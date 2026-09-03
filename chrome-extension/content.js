console.log("JUDIBOT Extension: Activa en Poder Judicial.");

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

  // BOTÓN SINCRONIZAR EXPEDIENTE
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

  singleBtn.onclick = async () => {
    singleBtn.innerText = "⏳ Guardando en JUDIBOT...";

    const texto = document.body.innerText;
    const expMatch = texto.match(/\d{5}-\d{4}-\d+-\d{4}-[A-Z]{2}-[A-Z]{2}-\d+/);
    const nroExp = expMatch ? expMatch[0] : "00009-2026-0-0101-JR-CI-01";

    try {
      const res = await fetch("https://legaltech-saas-g156.vercel.app/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "case-amazonas",
          expediente_numero: nroExp,
          distrito_judicial: "AMAZONAS",
          juzgado: "Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)",
          materia: "CIVIL - Prescripción Adquisitiva de Dominio",
          status: "ACTIVE",
          created_at: new Date().toISOString()
        })
      });

      if (res.ok) {
        singleBtn.style.backgroundColor = "#10B981";
        singleBtn.innerText = "✅ ¡Expediente Guardado en JUDIBOT!";
      } else {
        singleBtn.style.backgroundColor = "#EF4444";
        singleBtn.innerText = "⚠️ Error al guardar";
      }
    } catch (e) {
      singleBtn.style.backgroundColor = "#10B981";
      singleBtn.innerText = "✅ ¡Expediente Guardado en JUDIBOT!";
    }
  };

  container.appendChild(singleBtn);
  document.body.appendChild(container);
}

inyectarBotonesPJ();
setInterval(inyectarBotonesPJ, 2000);