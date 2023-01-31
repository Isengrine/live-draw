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
    pixel.ondragstart = () => {
        return false;
      };
    pixel.addEventListener("mousedown", () => {
        pixel.setAttribute("style", `background-color: ${color.value};`);
        pixel.classList.add("modified");
    })
    pixel.addEventListener("mouseover", (event) => {
        if (event.buttons == 1) {
            pixel.setAttribute("style", `background-color: ${color.value};`);
            pixel.classList.add("modified");
        }});
}

function removePixels() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.remove();
    });
}

function changeBG() {
    const pixels = document.querySelectorAll(".pixel:not(.modified)");
    pixels.forEach(pixel => {
        pixel.setAttribute("style", `background-color: ${bgcolor.value};`);
})}

function downloadImg() {
    html2canvas(document.getElementById("canvas"), {imageSmoothingEnabled: false}).then(function(canvas) {
        let link = document.createElement("a");
        link.download = "image.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}

let canvas = document.getElementById("canvas");
let value = document.getElementById("value");
let slider = document.getElementById("slider");
let color = document.getElementById("color");
let bgcolor = document.getElementById("bgcolor");
let erase = document.getElementById("eraserbtn");
let clear = document.getElementById("clearbtn");
let grid = document.getElementById("gridbtn");
let size = slider.value;
value.textContent = slider.value;

window.onload = createCanvas(size);

clear.addEventListener("click", () => {
    removePixels();
    createCanvas(size);
    changeBG();
})

grid.addEventListener("click", () => {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.classList.toggle("border");
    });
})

bgcolor.oninput = () => {
    changeBG();
    console.log(bgcolor.value);
}

slider.oninput = () => {
    value.textContent = slider.value;
    size = slider.value;
    removePixels();
    createCanvas(size);
    changeBG();
}