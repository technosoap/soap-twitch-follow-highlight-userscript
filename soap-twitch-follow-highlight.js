// ==UserScript==
// @name         soap-twitch-follow-highlight
// @namespace    http://tampermonkey.net/
// @version      2025-04-28
// @description  Selectively change text color in twitch.tv "Followed Channels" sidebar.
// @author       Technosoap
// @match        https://www.twitch.tv/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitch.tv
// @grant        none
// ==/UserScript==

// TODO breaks the FrankerFaceZ extension "Hide Offline Channels" feature :(

(function() {
    'use strict';

    // The long term plan is that this JSON would be stored in local storage and modified by some sort of configuration interface. For now, we hard-code it.
    // assumption: trusted input
    //
    // TODO nest the highlights one layer deeper, within an object with one-key
    // value pair called "usersToHighlight". Generally nice to have the
    // top-level use only keys under our control.
    const highlightsJson = '{"GiantBombForever": "#888888", "OldTimeyComputerShow": "#888888"}';

    // Revive with Object.create(null), to avoid issues of a namespace collision
    // between Object's prototype and twitch users (imagine a twitch streamer
    // called toString...).
    //
    // ref:
    // https://esdiscuss.org/topic/proposal-add-an-option-to-omit-prototype-of-objects-created-by-json-parse#content-1
    // via https://stackoverflow.com/a/48260948
    const highlights = JSON.parse(highlightsJson, function(key, value) {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return Object.assign(Object.create(null), value);
        }
        return value;
    });

    const changeColor = function() {
        for (const titleElem of document.getElementsByClassName("side-nav-card__title")) {
            const handle = titleElem.firstElementChild.title;
            const highlightColor = highlights[handle];
            if (highlightColor) {
                titleElem.firstElementChild.setAttribute('style', `color: ${highlightColor} !important`);
            }
        }
    };

    // TODO inefficient but simple. Consider
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    setInterval(changeColor, 1000);

})();
