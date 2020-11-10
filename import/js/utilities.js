// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function adjust(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function parsePixelPropertyValue(property) {
    return parseInt(property.split("px")[0]);
}

function destroy(element) {
    if (element != null && element.parentNode != null) {
        element.parentNode.removeChild(element);
        return true;
    }
    return false;
}

function timeDestroy(item, time) {
    sleep(time).then(() => {
        destroy(item);
    });
}

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}