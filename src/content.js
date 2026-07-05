const INTERACTIVE_SELECTOR = [
    'a[href]',
    'area[href]',
    'button',
    'input',
    'textarea',
    'select',
    'summary',
    '[contenteditable]:not([contenteditable="false"])',
    '[role="button"]',
    '[role="link"]',
    '[role="textbox"]'
].join(', ');

function isInteractive(element) {
    return element instanceof Element &&
        element.closest(INTERACTIVE_SELECTOR) !== null;
}

document.addEventListener(
    'auxclick',
    (event) => {
        if (event.button !== 1) return;

        // Preserve normal behavior on links, controls, and editable fields.
        if (event.composedPath().some(isInteractive)) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        chrome.runtime
            .sendMessage({ type: 'CLOSE_TAB' })
            .catch(() => { });
    },
    true
);