// ==UserScript==
// @name         Facebook Feed Cleaner
// @author       Stephen Chapman - Twitter: @Chapman | GitHub: dsasmblr
// @version      0.1
// @description  Your FB feed the way it used to be.
// @match        *://*.facebook.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=facebook.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const t = document.body;
    const c = { childList: true, subtree: true };
    const cl = '[role="feed"] > div > div';
    const rem = (el) => {
        el.closest(cl).remove();
    };

    const cb = (mutList, obs) => {
        mutList.forEach((mut) => {
            // Kill suggested
            document.querySelectorAll('span').forEach(el => {
                const isSuggested = el.innerHTML.includes('Suggested');
                isSuggested ? rem(el) : null;
            });

            // Kill ads
            document.querySelectorAll('[aria-label="Actions for this post"]').forEach(el => {
                const isAd = el.parentElement.parentElement.nextSibling === null;
                isAd ? rem(el) : null;
            });
        });
    };

    const obs = new MutationObserver(cb);

    obs.observe(t, c);
})();
