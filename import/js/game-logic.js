var isClicked = [false, false, false];

function lockButton(button, index) {
    if (isClicked[index]) return;

    switch (index) {
        case 0: // if center, start timer and remove hand if existed.
            startTime = new Date();
            startStopWatch();
            removeCurrentHintHand();
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

function initializeButtons() {
    initializeButtonColors();
    randomizeButtons();
    showStopWatch();
    if (checkCookie("userName"))
        fullUnlock();
}

function initializeButtonColors() {
    var color = "#95a5a6";
    for (const button of document.getElementsByClassName("button")) {
        colorizeButton(button, color);
    }
}

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
