var startTime;
var midTime;
var endTime;
var isClicked = [false, false, false];

function lockButton(button, index) {
    if (isClicked[index]) return;

    switch (index) {
        case 0: // if center, start timer and remove hand if existed.
            startTime = new Date();
            startStopWatch();
            var hand = document.getElementsByClassName("gif")[0];
            if (hand != null && hand.parentNode != null)
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
            stop(); // stopwatch
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

    if (isClicked[0] && isClicked[1] && isClicked[2]) {
        difficulty -= 1;
        checkUnlockables();
        sleep(500).then(() => {
            // https://stackoverflow.com/questions/2024198/how-many-seconds-between-two-dates
            var times = [" ", " ", " "];
            times[0] = midTime.getTime() - startTime.getTime();
            times[1] = endTime.getTime() - midTime.getTime()
            times[2] = endTime.getTime() - startTime.getTime()

            var i = 0;
            var buttonsProperties = [" ", " ", " "];
            for (const button of document.getElementsByClassName("button")) {
                buttonsProperties[i] = parsePixelPropertyValue(button.style.top) + "," + parsePixelPropertyValue(button.style.left) + "," + button.offsetHeight + "," + button.offsetWidth;
                i++;
            }

            saveTurnData(window.innerHeight, window.innerWidth, times, buttonsProperties);
            randomizeButtons();
        });
    }
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
            button.childNodes[1].style.left = 2000;
            break;
    }
}

function initializeButtons() {
    initializeColors();
    randomizeButtons();
    showStopWatch();
    if (checkCookie("userName"))
        fullUnlock();
}

var _2D = false;

function randomizeButtons() {
    var i = 0;
    _2D = is2DEnabled();

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
    var color = "#95a5a6";
    for (const button of document.getElementsByClassName("button")) {
        colorizeButton(button, color);
    }
}

var difficulty = 100;
var forbidden_margin = 20;
var forbidden_top = 140;
var forbidden_bottom = 71;

function randomizeSize(button, index) {

    difficulty_factor = difficulty / 100;

    button.style.height = window.innerHeight - (forbidden_top + forbidden_bottom);

    var max_width = (window.innerWidth / 4) - forbidden_margin;
    var randomWidth = Math.floor(difficulty_factor * Math.random() * max_width);
    button.style.width = Math.max(randomWidth, 15) + "px";

    if (_2D)
        button.style.height = Math.max(Math.floor(difficulty_factor * Math.random() * (window.innerHeight - (forbidden_top + forbidden_bottom))), 15);

    if (index == 0) {
        button.style.width = Math.max(difficulty_factor * window.innerWidth / 8, 15);
        button.style.height = button.style.width;
    }

    button.children[1].style.fontSize = 0.8 * Math.min(button.offsetHeight, button.offsetWidth);
    button.children[0].children[0].style.width = Math.max(0.25 * Math.min(button.offsetHeight, button.offsetWidth), 10);
}

function randomizePosition(button, index) {

    index = (index + 1) % 3;
    var max_width = window.innerWidth;
    var min_width = max_width * index / 3;

    var max_height = window.innerHeight - button.offsetHeight - (forbidden_margin + forbidden_bottom);

    var randomY = max_height;
    if (_2D)
        randomY = Math.floor(Math.random() * max_height);
    button.style.top = Math.max(randomY, forbidden_top) + "px";

    var randomX = min_width - (button.offsetWidth + forbidden_margin) + Math.floor(Math.random() * (max_width / 3));
    button.style.left = Math.max(randomX, min_width + forbidden_margin) + "px";

    if (index == 1) {
        button.style.top = window.innerHeight / 2 - (button.offsetHeight + forbidden_margin) / 2;
        button.style.left = window.innerWidth / 2 - (button.offsetWidth + forbidden_margin) / 2;
    } else if (index == 2) {
        button.style.left = Math.max(randomX - forbidden_margin, min_width + forbidden_margin) + "px";
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

var num_of_count_downs = 3;

function checkUnlockables() {
    if (num_of_count_downs <= 0) return;

    var count_downs = document.getElementsByClassName("count-down");

    if (difficulty > 95) {
        count_downs[num_of_count_downs - 3].innerHTML = difficulty - 95;
    }
    if (difficulty > 90) {
        count_downs[num_of_count_downs - 2].innerHTML = difficulty - 90;
    }
    if (difficulty > 80) {
        count_downs[num_of_count_downs - 1].innerHTML = difficulty - 80;
    }

    switch (difficulty) {
        case 95:
            var dummy_tooltip = document.getElementsByClassName("count-down")[0].parentNode.parentNode;
            dummy_tooltip.parentNode.removeChild(dummy_tooltip);
            document.getElementsByClassName("picker-wrapper")[0].style.pointerEvents = "auto";
            num_of_count_downs--;
            break;
        case 90:
            var tooltip_text = document.getElementsByClassName("count-down")[0].parentNode;
            tooltip_text.parentNode.removeChild(tooltip_text);
            document.getElementById("enable_2D").style.pointerEvents = "auto";
            num_of_count_downs--;
            break;
        case 80:
            var leaderboard = document.getElementById("leaderboard");
            leaderboard.setAttribute("src", "media/trophy.png");
            leaderboard.setAttribute("onclick", "openLeaderboards()");
            var tooltip_text = document.getElementsByClassName("count-down")[0].parentNode;
            tooltip_text.parentNode.removeChild(tooltip_text);
            num_of_count_downs--;
            break;
    }
}

function fullUnlock() {
    var dummy_tooltip = document.getElementsByClassName("count-down")[0].parentNode.parentNode;
    dummy_tooltip.parentNode.removeChild(dummy_tooltip);
    document.getElementsByClassName("picker-wrapper")[0].style.pointerEvents = "auto";

    var tooltip_text = document.getElementsByClassName("count-down")[0].parentNode;
    tooltip_text.parentNode.removeChild(tooltip_text);
    document.getElementById("enable_2D").style.pointerEvents = "auto";
    num_of_count_downs--;

    var leaderboard = document.getElementById("leaderboard");
    leaderboard.setAttribute("src", "media/trophy.png");
    leaderboard.setAttribute("onclick", "openLeaderboards()");
    var tooltip_text = document.getElementsByClassName("count-down")[0].parentNode;
    tooltip_text.parentNode.removeChild(tooltip_text);
    num_of_count_downs--;
}