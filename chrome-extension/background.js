chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const SERVER_URL = "https://legaltech-saas-g156.vercel.app";

  if (request.action === "SYNC_CASE" || request.action === "SYNC_BULK") {
    fetch(`${SERVER_URL}/api/cases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request.payload)
    })
      .then((res) => {
        if (res.ok) {
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false, error: "HTTP " + res.status });
        }
      })
      .catch((err) => {
        sendResponse({ success: false, error: err.message });
      });

    return true; // Mantiene el canal de respuesta abierto
  }
});