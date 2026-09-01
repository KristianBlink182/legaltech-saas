chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Manejo de sincronización individual
  if (request.action === "SYNC_CASE") {
    fetch("http://localhost:3000/api/sync/live", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request.payload)
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          sendResponse({ success: true, data });
        } else {
          sendResponse({ success: false, error: "Status " + res.status });
        }
      })
      .catch((err) => sendResponse({ success: false, error: err.message }));

    return true;
  }

  // Manejo de importación masiva de SINOE / Bandeja CEJ
  if (request.action === "SYNC_BULK") {
    fetch("http://localhost:3000/api/sync/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request.payload)
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          sendResponse({ success: true, data });
        } else {
          sendResponse({ success: false, error: "Status " + res.status });
        }
      })
      .catch((err) => sendResponse({ success: false, error: err.message }));

    return true;
  }
});