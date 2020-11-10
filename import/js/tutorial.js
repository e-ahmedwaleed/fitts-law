var difficulty = 100;
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
            unlockColors();
            break;
        case 90:
            unlock2D();
            break;
        case 80:
            unlockLeaderBoard();
            break;
    }

}

function fullUnlock() {
    unlockColors();
    unlock2D();
    unlockLeaderBoard();
}

function unlockColors() {
    var dummy_tooltip = document.getElementsByClassName("count-down")[0].parentNode.parentNode;
    dummy_tooltip.parentNode.removeChild(dummy_tooltip);
    document.getElementsByClassName("picker-wrapper")[0].style.pointerEvents = "auto";
    num_of_count_downs--;
}

function unlock2D() {
    var tooltip_text = document.getElementsByClassName("count-down")[0].parentNode;
    tooltip_text.parentNode.removeChild(tooltip_text);
    document.getElementById("enable_2D").style.pointerEvents = "auto";
    num_of_count_downs--;
}

function unlockLeaderBoard() {
    var leaderboard = document.getElementById("leaderboard");
    leaderboard.setAttribute("src", "media/trophy.png");
    leaderboard.setAttribute("onclick", "openLeaderboards()");
    var tooltip_text = document.getElementsByClassName("count-down")[0].parentNode;
    tooltip_text.parentNode.removeChild(tooltip_text);
    num_of_count_downs--;
}