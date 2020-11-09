function loadModaliFrames() {

    highscores = document.createElement("iframe");
    highscores.setAttribute("src", "https://ahmedwaleed.csed22.com/fitts-law/results/leaderboard/?embed");
    highscores.setAttribute("scrolling", "no");
    highscores.setAttribute("width", window.innerWidth / 2);
    highscores.setAttribute("height", window.innerHeight / 2);
    highscores.setAttribute("frameBorder", "0");
    document.getElementById("highscores").appendChild(highscores);

    results_1d = document.createElement("iframe");
    results_1d.setAttribute("src", "https://ahmedwaleed.csed22.com/fitts-law/results/plot-1D.html?embed");
    results_1d.setAttribute("scrolling", "no");
    results_1d.setAttribute("width", window.innerWidth / 2);
    results_1d.setAttribute("height", window.innerHeight / 2);
    results_1d.setAttribute("frameBorder", "0");
    document.getElementById("results-1d").appendChild(results_1d);

    results_2d = document.createElement("iframe");
    results_2d.setAttribute("src", "https://ahmedwaleed.csed22.com/fitts-law/results/plot-2D.html?embed");
    results_2d.setAttribute("scrolling", "no");
    results_2d.setAttribute("width", window.innerWidth / 2);
    results_2d.setAttribute("height", window.innerHeight / 2);
    results_2d.setAttribute("frameBorder", "0");
    document.getElementById("results-2d").appendChild(results_2d);

}