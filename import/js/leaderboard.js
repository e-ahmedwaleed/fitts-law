function loadModaliFrames() {

    highscores = getBorderlessiFrame("https://ahmedwaleed.csed22.com/fitts-law/results/leaderboard/?embed");
    document.getElementById("highscores").appendChild(highscores);

    results_1d = getBorderlessiFrame("https://ahmedwaleed.csed22.com/fitts-law/results/plot-1D.html?embed");
    document.getElementById("results-1d").appendChild(results_1d);

    results_2d = getBorderlessiFrame("https://ahmedwaleed.csed22.com/fitts-law/results/plot-2D.html?embed");
    document.getElementById("results-2d").appendChild(results_2d);

}

function getBorderlessiFrame(link) {
    iframe = document.createElement("iframe");
    iframe.setAttribute("src", link);
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("width", window.innerWidth / 2);
    iframe.setAttribute("height", window.innerHeight / 2);
    iframe.setAttribute("frameBorder", "0");
    return iframe;
}