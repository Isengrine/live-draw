function createCanvas(size) {
    area = size * size;
    for (let i = 0; i < area; i++) {
        const pixel = document.createElement("div");
        pixel.setAttribute("class", "pixel");
        canvas.appendChild(pixel);
        draw(pixel);
    }
    canvas.setAttribute("style",
    `grid-template-columns: repeat(${size}, 1fr);
    grid-template-rows: repeat(${size}, 1fr)`);
}

function draw(pixel) {
    pixel.addEventListener("mousedown", () => {
        pixel.setAttribute("style", `background-color: ${color.value};`);
    })
    pixel.addEventListener("mouseover", (event) => {
        if (event.buttons == 1) {
            pixel.setAttribute("style", `background-color: ${color.value};`);
        }});
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
let color = document.getElementById("color");
let clear = document.getElementById("clearbtn");
let size = slider.value;
value.textContent = slider.value;

window.onload = createCanvas(size);

clear.addEventListener("click", () => {
    removePixels();
    createCanvas(size);
})

slider.oninput = () => {
    value.textContent = slider.value;
    size = slider.value;
    removePixels();
    createCanvas(size);
}