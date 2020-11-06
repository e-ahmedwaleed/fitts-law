var isClicked = [false, false, false];

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

function timeDestroy(gif) {
    sleep(1800).then(() => {
        gif.parentNode.removeChild(gif);
    });
}

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}