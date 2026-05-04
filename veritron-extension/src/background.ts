chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "contentScriptReady") {
    console.log("Content script is ready in tab:", sender.tab?.id);
  }
});

// Initialize extension on first install
chrome.runtime.onInstalled.addListener(() => {
  console.log("Veritron AI extension installed");
  // Environment variables are available during build time
  // They are embedded in the built scripts via Vite
});

// Keep content script persistent
chrome.runtime.onStartup.addListener(() => {
  console.log("Veritron AI extension started");
});
