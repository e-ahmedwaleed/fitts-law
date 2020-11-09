var modal_alive = false;
var prevent_double_activation = true;
var alreadyGreeted = false;

function openLeaderboards() {
    if (!alreadyGreeted) {
        checkUserName();
    }
    if (!alreadyGreeted) return;
    modal_alive = true;
    document.getElementById("Leaderboard_Modal").style.display = "block";
}

function checkUserName() {
    if (alreadyGreeted) return;
    var user = getCookie("userName");
    if (user != "") {
        alreadyGreeted = true;
        alert("Welcome again " + user + ".");
        loadModaliFrames();
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("userName", user, 365);
            alreadyGreeted = true;
            loadModaliFrames();
        }
    }
}

function is2DEnabled() {
    var box = document.getElementById("enable_2D")
    return box.children[0].checked;
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