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
            var button = document.getElementsByClassName("button")[2];
            button.style.pointerEvents = "all";
            // Fix mobile bug.
            button.childNodes[1].attributeStyleMap.delete('left');
            button.childNodes[3].attributeStyleMap.delete('left');
            break;
    }

    if (isClicked[0] && isClicked[1] && isClicked[2])
        sleep(500).then(() => {
            var resolution = window.innerHeight + "," + window.innerWidth;

            // https://stackoverflow.com/questions/2024198/how-many-seconds-between-two-dates
            var times = [" ", " ", " "];
            times[0] = midTime.getTime() - startTime.getTime();
            times[1] = endTime.getTime() - midTime.getTime()
            times[2] = endTime.getTime() - startTime.getTime()

            var i = 0;
            var buttonsProperties = [" ", " ", " "];
            for (const button of document.getElementsByClassName("button")) {
                buttonsProperties[i] = button.style.top + "," + button.style.left + "," + button.offsetHeight + "," + button.offsetWidth;
                i++;
            }

            saveTurnData(resolution, times, buttonsProperties);
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
        case 2: // Fix mobile bug.
            button.childNodes[3].text = "3";
            button.childNodes[3].style.left = 0;
            button.childNodes[1].style.left = 500;
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
    var color = checkCookie("prefColor") ? getCookie("prefColor") : "#95a5a6";
    for (const button of document.getElementsByClassName("button")) {
        colorizeButton(button, color);
    }
}

function randomizeSize(button, index) {

    var max_width = (window.innerWidth / 4);

    button.style.height = window.innerHeight - 200;

    var randomWidth = Math.floor(Math.random() * max_width);
    button.style.width = Math.max(randomWidth, 25) + "px";

    if (index == 0) {
        button.style.width = window.innerWidth / 8;
        button.style.height = button.style.width;
    }

    button.children[1].style.fontSize = 0.8 * Math.min(button.offsetHeight, button.offsetWidth);
}

function randomizePosition(button, index) {

    index = (index + 1) % 3;
    var max_width = window.innerWidth;
    var min_width = max_width * index / 3;

    var max_height = window.innerHeight - button.offsetHeight - 20 - 60;

    var randomY = max_height;
    button.style.top = Math.max(randomY, 140) + "px";

    var randomX = min_width - (button.offsetWidth + 20) + Math.floor(Math.random() * (max_width / 3));
    button.style.left = Math.max(randomX, min_width + 20) + "px";

    if (index == 1) {
        button.style.top = window.innerHeight / 2 - (button.offsetHeight + 20) / 2;
        button.style.left = window.innerWidth / 2 - (button.offsetWidth + 20) / 2;
    } else if (index == 2) {
        button.style.left = Math.max(randomX - 20, min_width + 20) + "px";
    }
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

// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function adjust(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}