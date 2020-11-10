var _2D = false;
var forbidden_margin = 20;
var forbidden_top = 140;
var forbidden_bottom = 71;

function unlockButton(button, index) {
    // https://stackoverflow.com/questions/3506050/how-to-reset-the-style-properties-to-their-css-defaults-in-javascript
    button.childNodes[1].attributeStyleMap.delete('top');
    button.childNodes[1].attributeStyleMap.delete('left');

    switch (index) {
        case 0:
            button.childNodes[3].text = "1";
            break;
        case 1:
            button.childNodes[3].text = "2";
            break;
        case 2: // Fix mobile bug.
            button.childNodes[3].text = "3";
            button.childNodes[3].style.left = 0;
            button.childNodes[1].style.left = 2000;
            break;
    }

}

function randomizeSize(button, index) {

    var difficulty_factor = difficulty / 100;

    var max_height = window.innerHeight - (forbidden_top + forbidden_bottom);
    if (_2D)
        button.style.height = Math.max(Math.floor(difficulty_factor * Math.random() * max_height), 10);
    else
        button.style.height = max_height;

    var max_width = (window.innerWidth / 4) - forbidden_margin;
    button.style.width = Math.max(Math.floor(difficulty_factor * Math.random() * max_width), 10);

    if (index == 0) {
        button.style.width = Math.max(difficulty_factor * window.innerWidth / 8, 15);
        button.style.height = button.style.width;
    }

    button.children[1].style.fontSize = 0.8 * Math.min(button.offsetHeight, button.offsetWidth);
    button.children[0].children[0].style.width = Math.max(0.25 * Math.min(button.offsetHeight, button.offsetWidth), 5);

}

function randomizePosition(button, index) {

    var screen_div = (index + 1) % 3;
    var max_width = window.innerWidth;
    var min_width = max_width * screen_div / 3;

    var max_height = window.innerHeight - button.offsetHeight - (forbidden_margin + forbidden_bottom);

    if (_2D)
        button.style.top = Math.max(Math.floor(Math.random() * max_height), forbidden_top);
    else
        button.style.top = Math.max(max_height, forbidden_top);

    var randomX = min_width - (button.offsetWidth + 2 * forbidden_margin) + Math.floor(Math.random() * (max_width / 3));
    button.style.left = Math.max(randomX, min_width + forbidden_margin);

    if (index == 0) {
        button.style.top = window.innerHeight / 2 - (button.offsetHeight + forbidden_margin) / 2;
        button.style.left = window.innerWidth / 2 - (button.offsetWidth + forbidden_margin) / 2;
    }

}

function colorizeButton(button, col) {

    button.style.backgroundColor = col

    var borderCol = adjust(col, -40);
    button.style.borderColor = borderCol;

    var fontCol = adjust(col, 80);
    button.children[1].style.color = fontCol;

    var hoverCol = adjust(col, 40);
    button.children[0].style.backgroundColor = hoverCol;

}