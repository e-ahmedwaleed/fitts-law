// Add "https://ipinfo.io" statement 
// this will communicate with the ipify servers  
// in order to retrieve the IP address 

fetchIP();

function fetchIP() {
    $.get("https://ipinfo.io", function (response) {
        setCookie("userIP", response.ip, 365);
    }, "json")
}

// "json" shows that data will be fetched in json format 