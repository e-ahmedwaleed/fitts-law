window.addEventListener("load", function () {
    var pk = new Piklor(".color-picker", [
        "#1abc9c"
        , "#3498db"
        , "#9b59b6"
        , "#34495e"
        , "#e67e22"
        , "#c0392b"
        , "#95a5a6"
    ], {
        open: ".picker-wrapper .btn"
    })

    pk.colorChosen(function (col) {
        for (const button of document.getElementsByClassName("button")) {
            colorizeButton(button, col);
        }
    });

});