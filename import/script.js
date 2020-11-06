var isClicked = [false, false, false];
var isLoaded = [false, false, false];


function lockButton(button, index) {
    if (isClicked[index]) return;
    isClicked[index] = true;

    button.childNodes[1].style.top = 0;
    button.childNodes[1].style.left = 0;
    button.childNodes[3].text = "";
    button.style.pointerEvents = "none";

    if (isClicked[-1] && isClicked[0] && isClicked[1])
        sleep(500).then(() => {
            location.reload();
        });

}

function randomizeButtons() {
    initializeColors();
    sleep(100).then(() => {
        var i = 0;
        for (const button of document.getElementsByClassName("button")) {
            randomizeSize(button, i);
            randomizePosition(button, i);
            i++;
        }
        for (const button of document.getElementsByClassName("button")) {
            button.style.visibility = "visible";
            button.children[1].style.visibility = "visible";
        }
    });
}

function initializeColors() {
    for (const button of document.getElementsByClassName("button")) {
        colorizeButton(button, "#95a5a6");
    }
}

function randomizeSize(button, index) {

    var max_height = window.innerHeight / 3;
    var max_width = (window.innerWidth / 6) / (index == 1 ? 2 : 1);

    var randomHeight = Math.floor(Math.random() * max_height);
    button.style.height = Math.max(randomHeight, 25) + "px";

    var randomWidth = Math.floor(Math.random() * max_width);
    button.style.width = Math.max(randomWidth, 25) + "px";

    if (index == 1)
        button.style.height = button.style.width;

    button.children[1].style.fontSize = 0.8 * Math.min(button.offsetHeight, button.offsetWidth);
}

function randomizePosition(button, index) {
    var max_width = window.innerWidth;
    var min_width = max_width * index / 3;

    var max_height = window.innerHeight - (button.offsetHeight * 2);

    var randomY = Math.floor(Math.random() * max_height) - 20;
    button.style.top = Math.max(randomY, 160) + "px";

    var randomX = min_width - (button.offsetWidth + 20) + Math.floor(Math.random() * (max_width / 3));
    button.style.left = Math.max(randomX, min_width + 20) + "px";
}

function timeDestroy(gif) {
    sleep(1800).then(() => {
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