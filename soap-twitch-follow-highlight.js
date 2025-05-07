// ==UserScript==
// @name         soap-twitch-follow-highlight
// @namespace    http://tampermonkey.net/
// @version      2025-04-28
// @description  Selectively change text color in twitch.tv "Followed Channels" sidebar.
// @author       Technosoap
// @match        https://www.twitch.tv/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitch.tv
// @grant        GM_addStyle
// ==/UserScript==
//
// TODO should run it on streamer pages too (rather than just twitch homepage),
// e.g. https://www.twitch.tv/oldtimeycomputershow ,
// https://www.twitch.tv/oldtimeycomputershow/videos

(function() {
    'use strict';

    GM_addStyle('.soap-twitch-follow-highlight-gray { color: gray !important; }');
    GM_addStyle('.soap-twitch-follow-highlight-lime { color: lime !important; }');

    // The long term plan is that this JSON would be stored in local storage and
    // modified by some sort of configuration interface. For now, we hard-code
    // it.
    //
    // assumption: trusted input
    //
    // TODO validate that colours here have a corresponding soap-twitch-follow-highlight-* class.
    const userConfigJson = '{"highlights": {"GiantBombForever": "gray", "OldTimeyComputerShow": "gray", "WonderlandRogue": "lime"}}';

    // Revive with Object.create(null), to avoid issues of a namespace collision
    // between Object's prototype and twitch users (imagine a twitch streamer
    // called toString...).
    //
    // ref:
    // https://esdiscuss.org/topic/proposal-add-an-option-to-omit-prototype-of-objects-created-by-json-parse#content-1
    // via https://stackoverflow.com/a/48260948
    const userConfig = JSON.parse(userConfigJson, function(key, value) {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return Object.assign(Object.create(null), value);
        }
        return value;
    });

    const changeColor = function() {
        for (const titleElem of document.getElementsByClassName("side-nav-card__title")) {
            const handle = titleElem.firstElementChild.title;
            const highlightColor = userConfig.highlights[handle];
            if (highlightColor) {
                titleElem.firstElementChild.classList.toggle(`soap-twitch-follow-highlight-${highlightColor}`, true);
            }
        }
    };

    // TODO inefficient but simple. Consider
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    setInterval(changeColor, 1000);

})();
