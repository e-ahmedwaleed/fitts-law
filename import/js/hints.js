function trackStartPoint() {

    var hand = document.createElement("IMG");
    hand.setAttribute("class", "gif");
    hand.setAttribute("style", "visibility: hidden;");
    hand.setAttribute("onload", "timeDestroy(this)");

    //https://stackoverflow.com/questions/58589941/pure-javascript-remove-element-on-mouseover
    hand.addEventListener("mouseover", destroyOnHover);

    document.body.appendChild(hand);

    var button = document.getElementById("center-button");

    hand.style.width = button.offsetWidth * .3;

    var x = (parseInt(button.style.left.split("px")[0]) + button.offsetWidth / 1.5 + 20) - hand.offsetWidth / 2;
    var y = (parseInt(button.style.top.split("px")[0]) + button.offsetHeight / 1.5 + 20) - hand.offsetHeight / 2;

    hand.style.left = x;
    hand.style.top = y;

    // https://stackoverflow.com/questions/19831319/restart-a-gif-animation-without-reloading-the-file/24810221
    hand.src = "media/hand_clicking.gif";
    hand.style.visibility = "visible";
}

function destroyOnHover() {
    event.target.parentNode.removeChild(event.target);
}

function timeDestroy(gif) {
    sleep(1650).then(() => {
        if (gif.parentNode != null)
            gif.parentNode.removeChild(gif);
    });
}

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}