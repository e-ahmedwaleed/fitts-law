var isClicked = [false, false, false];
var isLoaded = [false, false, false];


function lockButton(button, index) {
    if (isClicked[index]) return;
    isClicked[index] = true;

    button.childNodes[1].style.left = 0;
    button.childNodes[3].text = "";
    button.style.pointerEvents = "none";
    button.style.backgroundColor = "#bfc0c0";

    if (isClicked[-1] && isClicked[0] && isClicked[1])
        sleep(500).then(() => {
            location.reload();
        });

}

function randomizePositions() {
    sleep(500).then(() => {
        var i = 0;
        for (const button of document.getElementsByClassName("button")) {

            var max_width = window.innerWidth;
            var min_width = max_width * i / 3;
            console.log(max_width + ", " + min_width)

            var max_height = window.innerHeight - (button.offsetHeight * 2);
            console.log(max_height)

            var randomY = Math.floor(Math.random() * max_height) - 20;
            button.style.top = Math.max(randomY, 20) + "px";
            var randomX = min_width - (button.offsetWidth + 20) + Math.floor(Math.random() * (max_width / 3));
            button.style.left = Math.max(randomX, min_width + 20) + "px";
            button.style.visibility = "visible";

            console.log(button)
            console.log(button.offsetWidth)

            i++;
        }
    });
}

function randomizeButton(button, index) {
    button.style.top = Math.floor(Math.random() * window.innerWidth) + "px";
    button.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
    button.style.visibility = "visible";
}

function timeDestroy(gif) {
    sleep(1800).then(() => {
        gif.parentNode.removeChild(gif);
    });
}

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}