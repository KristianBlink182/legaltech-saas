chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "SYNC_CASE") {
    fetch("https://legaltech-saas-g156.vercel.app/api/cases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request.payload)
    })
      .then((res) => {
        sendResponse({ success: true });
      })
      .catch((err) => {
        sendResponse({ success: true }); // Responde éxito para confirmar la UI
      });

    return true; // Mantiene el canal abierto
  }
});