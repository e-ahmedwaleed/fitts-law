function trackStartPoint() {

    removeCurrentHintHand();

    var hand = document.createElement("IMG");
    hand.setAttribute("class", "gif");
    hand.setAttribute("style", "visibility: hidden;");
    hand.setAttribute("onload", "timeDestroy(this, 1650)");

    //https://stackoverflow.com/questions/58589941/pure-javascript-remove-element-on-mouseover
    hand.addEventListener("mouseover", destroyOnHover);

    document.body.appendChild(hand);

    var button = document.getElementById("center-button");

    hand.style.width = button.offsetWidth * .3;

    var x = (parsePixelPropertyValue(button.style.left) + button.offsetWidth / 1.5 + 20) - hand.offsetWidth / 2;
    var y = (parsePixelPropertyValue(button.style.top) + button.offsetHeight / 1.5 + 20) - hand.offsetHeight / 2;

    hand.style.left = x;
    hand.style.top = y;

    // https://stackoverflow.com/questions/19831319/restart-a-gif-animation-without-reloading-the-file/24810221
    hand.src = "media/hand_clicking.gif";
    hand.style.visibility = "visible";
}

function removeCurrentHintHand() {
    var hand = document.getElementsByClassName("gif")[0];
    destroy(hand);
}

function destroyOnHover() {
    destroy(event.target);
}

