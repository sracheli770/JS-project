"use strict";
const redInput = document.getElementById('red');
const greenInput = document.getElementById('green');
const blueInput = document.getElementById('blue');
const btn = document.getElementById('btn');
const colorsDiv = document.getElementById('colors');
class Color {
    red;
    green;
    blue;
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    rgb() {
        return `rgb(${this.red},${this.green},${this.blue})`;
    }
    hex() {
        const redHex = this.red.toString(16).padStart(2, '0');
        const greenHex = this.green.toString(16).padStart(2, '0');
        const blueHex = this.blue.toString(16).padStart(2, '0');
        const hex = `#${redHex}${greenHex}${blueHex}`.toUpperCase();
        return hex;
    }
}
function maximum(value) {
    let r = Math.min(value, 255);
    r = Math.max(r, 0);
    return r;
}
function maximumRGB(r, g, b) {
    let red = maximum(r);
    let green = maximum(g);
    let blue = maximum(b);
    return [red, green, blue];
}
btn.addEventListener('click', () => {
    const [red, green, blue] = maximumRGB(Number(redInput.value), Number(greenInput.value), Number(blueInput.value));
    const c = new Color(red, green, blue);
    const newColor = document.createElement('div');
    newColor.style.background = c.rgb();
    newColor.innerText = `${c.rgb()}`;
    newColor.addEventListener('click', () => {
        newColor.innerText = `${c.rgb()} Hex:${c.hex()}`;
    });
    //save as a favorite color:
    /* const favoritesColors: Color[] = [];
    newColor.addEventListener('contextmenu', () => {
        favoritesColors.push(c);
        localStorage.setItem('favorites colors', JSON.stringify(favoritesColors));
    }) */
    redInput.value = '';
    greenInput.value = '';
    blueInput.value = '';
    colorsDiv.appendChild(newColor);
});
