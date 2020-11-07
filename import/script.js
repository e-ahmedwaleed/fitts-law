var startTime;
var midTime;
var endTime;
var isClicked = [false, false, false];

function lockButton(button, index) {
    if (isClicked[index]) return;

    switch (index) {
        case 0: // if center, start timer and remove hand if existed.
            startTime = new Date();
            var hand = document.getElementsByClassName("gif")[0];
            if (hand != null)
                hand.parentNode.removeChild(hand);
            break;
        case 1: // if right, check center.
            if (!isClicked[0])
                return;
            midTime = new Date();
            break;
        case 2: // if left, check center and right.
            if (!(isClicked[0] && isClicked[1]))
                return;
            endTime = new Date();
            break;
    }

    isClicked[index] = true;

    button.childNodes[1].style.top = 0;
    button.childNodes[1].style.left = 0;
    button.childNodes[3].text = "";
    button.style.pointerEvents = "none";
    switch (index) {
        case 0: // if center, active right.
            document.getElementsByClassName("button")[1].style.pointerEvents = "all";
            break;
        case 1: // if right, active left.
            document.getElementsByClassName("button")[2].style.pointerEvents = "all";
            break;
    }

    if (isClicked[0] && isClicked[1] && isClicked[2])
        sleep(500).then(() => {
            console.log(window.innerHeight + "," + window.innerWidth);
            // https://stackoverflow.com/questions/2024198/how-many-seconds-between-two-dates
            console.log((midTime.getTime() - startTime.getTime()) + "," + (endTime.getTime() - midTime.getTime()) + "," + (endTime.getTime() - startTime.getTime()));

            for (const button of document.getElementsByClassName("button")) {
                console.log(button.style.top + "," + button.style.left + "," + button.offsetHeight + "," + button.offsetWidth);
            }

            randomizeButtons();
        });

}

function unlockButton(button, index) {
    // https://stackoverflow.com/questions/3506050/how-to-reset-the-style-properties-to-their-css-defaults-in-javascript
    button.childNodes[1].attributeStyleMap.delete('top');
    button.childNodes[1].attributeStyleMap.delete('left');

    switch (index) {
        case 0:
            button.childNodes[3].text = "1";
            break;
        case 1:
            button.childNodes[3].text = "2";
            break;
        case 2:
            button.childNodes[3].text = "3";
            break;
    }
}

function initializeButtons() {
    initializeColors();
    randomizeButtons();
}

function randomizeButtons() {
    var i = 0;
    var buttons = document.getElementsByClassName("button")
    for (const button of buttons) {
        isClicked[i] = false;
        randomizeSize(button, i);
        randomizePosition(button, i);
        unlockButton(button, i);
        i++;
    }
    for (const button of buttons) {
        button.style.visibility = "visible";
        button.children[1].style.visibility = "visible";
    }
    buttons[0].style.pointerEvents = "all";
    sleep(100).then(() => {
        trackStartPoint();
    });
}

function initializeColors() {
    for (const button of document.getElementsByClassName("button")) {
        colorizeButton(button, "#95a5a6");
    }
}

function randomizeSize(button, index) {

    var max_height = window.innerHeight / 3;
    var max_width = (window.innerWidth / 6) / (index == 0 ? 2 : 1);

    var randomHeight = Math.floor(Math.random() * max_height);
    button.style.height = Math.max(randomHeight, 25) + "px";

    var randomWidth = Math.floor(Math.random() * max_width);
    button.style.width = Math.max(randomWidth, 25) + "px";

    if (index == 0)
        button.style.height = button.style.width;

    button.children[1].style.fontSize = 0.8 * Math.min(button.offsetHeight, button.offsetWidth);
}

function randomizePosition(button, index) {

    index = (index + 1) % 3;
    var max_width = window.innerWidth;
    var min_width = max_width * index / 3;

    var max_height = window.innerHeight - (button.offsetHeight * 2);

    var randomY = Math.floor(Math.random() * max_height) - 20;
    button.style.top = Math.max(randomY, 160) + "px";

    var randomX = min_width - (button.offsetWidth + 20) + Math.floor(Math.random() * (max_width / 3));
    button.style.left = Math.max(randomX, min_width + 20) + "px";
}

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

function colorizeButton(button, col) {
    button.style.backgroundColor = col
    var borderCol = adjust(col, -40);
    button.style.borderColor = borderCol;
    var fontCol = adjust(col, 80);
    button.children[1].style.color = fontCol;
    var shapeCol = adjust(col, 40);
    button.children[0].style.backgroundColor = shapeCol;
}

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function adjust(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}