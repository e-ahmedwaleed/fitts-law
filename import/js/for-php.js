var startTime;
var midTime;
var endTime;

function saveTurnData(resolutionH, resolutionW, times, buttonsProperties) {
    var userName = checkCookie("userName") ? getCookie("userName") : "anonymous";
    var ip = checkCookie("userIP") ? getCookie("userIP") : "...";

    var url_args = "?";
    url_args += ("user=" + userName + "&");
    url_args += ("ip=" + ip + "&");
    url_args += ("h=" + resolutionH + "&");
    url_args += ("w=" + resolutionW + "&");
    url_args += ("times=" + times[0] + ',' + times[1] + ',' + times[2] + "&");
    url_args += ("point1=" + buttonsProperties[0] + "&");
    url_args += ("point2=" + buttonsProperties[1] + "&");
    url_args += ("point3=" + buttonsProperties[2]);

    var url = "https://ahmedwaleed.csed22.com/fitts-law/results/";

    iFrame = document.createElement("iframe");
    iFrame.setAttribute('src', url + url_args);
    iFrame.setAttribute("style", "visibility: hidden;");
    iFrame.setAttribute("onload", "timeDestroy(this, 1000)");

    document.body.appendChild(iFrame);
}