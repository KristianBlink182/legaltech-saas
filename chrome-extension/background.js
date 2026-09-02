chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const SERVER_URL = "https://legaltech-saas-g156.vercel.app";

  if (request.action === "SYNC_CASE") {
    fetch(`${SERVER_URL}/api/sync/live`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request.payload)
    })
      .then(async (res) => {
        const data = await res.json();
        sendResponse({ success: res.ok, data });
      })
      .catch((err) => {
        sendResponse({ success: false, error: err.message });
      });

    return true;
  }

  if (request.action === "SYNC_BULK") {
    fetch(`${SERVER_URL}/api/sync/bulk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request.payload)
    })
      .then(async (res) => {
        const data = await res.json();
        sendResponse({ success: res.ok, data });
      })
      .catch((err) => {
        sendResponse({ success: false, error: err.message });
      });

    return true;
  }
});