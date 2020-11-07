var modal_alive = false;
var prevent_double_activation = true;
var alreadyGreeted = false;

function openLeaderboards() {
    if (!checkUserName()) return;
    modal_alive = true;
    document.getElementById("Leaderboard_Modal").style.display = "block";
}

function checkUserName() {
    if (alreadyGreeted) return;
    var user = getCookie("username");
    if (user != "") {
        alreadyGreeted = true;
        alert("Welcome again " + user + ".");
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
            alreadyGreeted = true;
        }
    }
}

function is2DEnabled() {
    var box = document.getElementById("enable_2D")
    return box.children[0].checked;
}

function checkInitialState() {
    var box = document.getElementById("enable_2D")
    if (checkCookie("_2D"))
        box.children[0].checked = (getCookie("_2D") == "1");
}


// When the user clicks anywhere outside of the active modal, close it
window.onclick = function (event) {
    if (modal_alive && !prevent_double_activation) {
        var modals = document.getElementsByClassName("modal");
        var i;
        for (i = 0; i < modals.length; i++) {
            modals[i].style.display = "none";
        }
        modal_alive = false;
    }
    if (modal_alive)
        prevent_double_activation = false;
    else
        prevent_double_activation = true;
}