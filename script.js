function createCanvas(size) {
    area = size * size;
    for (let i = 0; i < area; i++) {
        const pixel = document.createElement("div");
        pixel.setAttribute("class", "pixel");
        canvas.appendChild(pixel);
        pixel.addEventListener("mouseover", () => 
        pixel.setAttribute("style", "background-color: black;"));
    }
    canvas.setAttribute("style",
    `grid-template-columns: repeat(${size}, 1fr);
    grid-template-rows: repeat(${size}, 1fr)`);
}

function removePixels() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.remove();
    });
}

let canvas = document.getElementById("canvas");
let value = document.getElementById("value");
let slider = document.getElementById("slider");
let size = slider.value
value.textContent = slider.value;

window.onload = createCanvas(size);

slider.oninput = () => {
    value.textContent = slider.value;
    size = slider.value;
    removePixels();
    createCanvas(size);
}