chrome.runtime.onMessage.addListener((message, sender) => {
    if (message?.type !== "CLOSE_TAB") return;

    const tabId = sender.tab?.id;

    if (tabId !== undefined) {
        chrome.tabs.remove(tabId).catch(() => { });
    }
});

chrome.action.onClicked.addListener((tab) => {
    if (tab.id !== undefined) {
        chrome.tabs.remove(tab.id).catch(() => { });
    }
});