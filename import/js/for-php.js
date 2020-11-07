function saveTurnData(resolution, times, buttonsProperties) {
    var userName = checkCookie("username") ? getCookie("username") : "anonymous";
    var ip = checkCookie("userIP") ? getCookie("userIP") : "...";
    console.log(userName + "@" + ip);
    console.log(resolution);
    console.log(times);
    console.log(buttonsProperties);
}