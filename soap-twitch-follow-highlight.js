// ==UserScript==
// @name         soap-twitch-follow-highlight
// @namespace    http://tampermonkey.net/
// @version      2025-04-28
// @description  try to take over the world!
// @author       You
// @match        https://www.twitch.tv/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitch.tv
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log(`hello everybody`);
    document.body.style.padding = "32px";

    const changeColor = function() {
        //document.getElementsByClassName("side-nav-card__title")[1].firstElementChild.style.backgroundColor = "#ffff00";
        //document.getElementsByClassName("side-nav-card__title")[1].firstElementChild.style.color = "#ff0000 !important";
        document.getElementsByClassName("side-nav-card__title")[1].firstElementChild.setAttribute( 'style', 'color: #ff0000 !important' );
    };

    setInterval(changeColor, 1000);

})();
