// https://www.geeksforgeeks.org/how-to-get-client-ip-address-using-javascript/

// Add "https://ipinfo.io" statement 
// this will communicate with the ipify servers  
// in order to retrieve the IP address 

$.get("https://ipinfo.io", function (response) {
    setCookie("userIP", response.ip, 365);
}, "json")

// "json" shows that data will be fetched in json format