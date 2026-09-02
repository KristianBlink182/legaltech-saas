chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const SERVER_URL = "https://legaltech-saas-g156.vercel.app";

  if (request.action === "SYNC_CASE" || request.action === "SYNC_BULK") {
    fetch(`${SERVER_URL}/api/cases`, {
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
        sendResponse({ success: false, error: err.message });
      });

    return true;
  }
});