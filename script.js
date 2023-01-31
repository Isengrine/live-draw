function createCanvas(size) {
    let area = size * size;
    for (let i = 0; i < area; i++) {
        const pixel = document.createElement("div");
        pixel.setAttribute("class", "pixel");
        canvas.appendChild(pixel);
        pixels.push(pixel);
    }
    canvas.setAttribute("style",
    `grid-template-columns: repeat(${size}, 1fr);
    grid-template-rows: repeat(${size}, 1fr);`);

    if (grid) {
        addGrid();
    }

    return pixels;
}

function draw() {
    for (const pixel of pixels) {
        pixel.ondragstart = () => {
            return false;
            };

        if (pencil) {
            pixel.addEventListener("mousedown", () => {
                pixel.setAttribute("style", `background-color: ${color.value};`);
                pixel.classList.add("modified");
            })
            pixel.addEventListener("mouseover", (event) => {
                if (event.buttons == 1) {
                    pixel.setAttribute("style", `background-color: ${color.value};`);
                    pixel.classList.add("modified");
                }
            });
        }

        else if (eraser) {
            pixel.addEventListener("mousedown", () => {
                pixel.setAttribute("style", `background-color: ${bgcolor.value};`);
                pixel.classList.remove("modified");
            })
            pixel.addEventListener("mouseover", (event) => {
                if (event.buttons == 1) {
                    pixel.setAttribute("style", `background-color: ${bgcolor.value};`);
                    pixel.classList.remove("modified");
                }
            });
        }
    }
}

function removePixels() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.remove();
    });
}

function addGrid() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.classList.toggle("border");
    });
}

function changeBG() {
    const pixels = document.querySelectorAll(".pixel:not(.modified)");
    pixels.forEach(pixel => {
        pixel.setAttribute("style", `background-color: ${bgcolor.value};`);
    })
}

function downloadImg() {
    html2canvas(document.getElementById("canvas")).then((canvas) => {
        let link = document.createElement("a");
        link.download = "image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

let canvas = document.getElementById("canvas");
let pixels = [];
let value = document.getElementById("value");
let slider = document.getElementById("slider");
let color = document.getElementById("color");
let bgcolor = document.getElementById("bgcolor");

let pencilbtn = document.getElementById("pencilbtn");
let highlightbtn = document.getElementById("highlighterbtn");
let pickbtn = document.getElementById("pickerbtn");
let fillbtn = document.getElementById("fillbtn");
let eraserbtn = document.getElementById("eraserbtn");
let clearbtn = document.getElementById("clearbtn");
let gridbtn = document.getElementById("gridbtn");
let sizebtn = document.getElementById("sizebtn");
let size = slider.value;
value.textContent = slider.value;

let pencil = true;
let eraser = false;
let grid = false;

window.onload = createCanvas(size); draw(pixels);

pencilbtn.addEventListener("click", () => {
    pencil = true;
    eraser = false;
    draw(pixels);
})

eraserbtn.addEventListener("click", () => {
    pencil = false;
    eraser = true;
    draw(pixels);
})

clearbtn.addEventListener("click", () => {
    removePixels();
    createCanvas(size);
    changeBG();
})

gridbtn.addEventListener("click", () => {
    grid = !grid;
    addGrid();
})

bgcolor.oninput = () => {
    changeBG();
}

slider.oninput = () => {
    value.textContent = slider.value;
    size = slider.value;
    removePixels();
    createCanvas(size);
    changeBG();
}