const INTERACTIVE_SELECTOR =
    'a[href], area[href], input, textarea, select, ' +
    '[contenteditable]:not([contenteditable="false"]), [role="textbox"]';

function isInteractive(element) {
    return element instanceof Element &&
        element.closest(INTERACTIVE_SELECTOR);
}

document.addEventListener(
    "auxclick",
    (event) => {
        if (event.button !== 1) return;

        const path = event.composedPath();

        // Preserve normal behavior on links and editable fields
        if (
            path.some(isInteractive) ||
            isInteractive(document.activeElement)
        ) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        chrome.runtime
            .sendMessage({ type: "CLOSE_TAB" })
            .catch(() => { });
    },
    true
);