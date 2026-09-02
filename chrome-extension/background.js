chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const SERVER_URL = "https://legaltech-saas-g156.vercel.app";

  if (request.action === "SYNC_CASE" || request.action === "SYNC_BULK") {
    const endpoint = request.action === "SYNC_CASE" ? "/api/sync/live" : "/api/sync/bulk";

    fetch(`${SERVER_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request.payload)
    })
      .then((res) => res.json())
      .then((data) => {
        sendResponse({ success: true, data });
      })
      .catch((err) => {
        console.error("Error en sync:", err);
        sendResponse({ success: false, error: err.message });
      });

    return true; // Mantiene el canal abierto
  }
});