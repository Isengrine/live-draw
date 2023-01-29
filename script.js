function createCanvas(size) {
    area = size * size;
    for (let i = 0; i < area; i++) {
        const pixel = document.createElement("div");
        pixel.setAttribute("class", "pixel");
        canvas.appendChild(pixel);
    }
    canvas.setAttribute("style",
    `grid-template-columns: repeat(${size}, 1fr);
    grid-template-rows: repeat(${size}, 1fr)`);
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