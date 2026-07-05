const closingTabs = new Set();

function closeTab(tabId) {
    if (!Number.isInteger(tabId) || closingTabs.has(tabId)) return;

    closingTabs.add(tabId);

    chrome.tabs
        .remove(tabId)
        .catch(() => { })
        .finally(() => closingTabs.delete(tabId));
}

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message?.type !== 'CLOSE_TAB') return;

    closeTab(sender.tab?.id);
});

chrome.action.onClicked.addListener((tab) => {
    closeTab(tab.id);
});