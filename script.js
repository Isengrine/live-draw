function createCanvas(size) {
    console.log("canvas created");
    for (let i = 0; i < size; i++) {
        const pixel = document.createElement("div");
        pixel.setAttribute("class", "pixel");
        canvas.appendChild(pixel);
    }
}

let canvas = document.getElementById("canvas");
let value = document.getElementById("value");
let slider = document.getElementById("slider");
let size = slider.value
value.textContent = slider.value;

window.onload = createCanvas(size);

slider.oninput = () => {
    value.textContent = slider.value;
}