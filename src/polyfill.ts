import browser from 'webextension-polyfill';

if (typeof globalThis !== 'undefined') {
    globalThis.browser = browser;
}
if (typeof global !== 'undefined') {
    global.browser = browser;
}
if (typeof window !== 'undefined') {
    window.browser = browser;
}
