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
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
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

        else if (highlighter) {
            pixel.addEventListener("mousedown", (event) => {
                let currentOpacity = window.getComputedStyle(event.currentTarget).getPropertyValue("opacity");
                currentOpacity = parseFloat(currentOpacity);

                if (!pixel.classList.contains("modified") && currentOpacity >= 1) {
                    pixel.setAttribute("style", `background-color: ${color.value}; opacity: 0.2;`);
                    pixel.classList.add("modified");
                }

                else {
                    pixel.setAttribute("style", `background-color: ${color.value}; opacity: ${currentOpacity + 0.1};`);
                    pixel.classList.add("modified");
                }
            })
            pixel.addEventListener("mouseover", (event) => {
                if (event.buttons == 1) {
                    let currentOpacity = window.getComputedStyle(event.currentTarget).getPropertyValue("opacity");
                    currentOpacity = parseFloat(currentOpacity);
    
                    if (!pixel.classList.contains("modified") && currentOpacity >= 1) {
                        pixel.setAttribute("style", `background-color: ${color.value}; opacity: 0.2;`);
                        pixel.classList.add("modified");
                    }
    
                    else {
                        pixel.setAttribute("style", `background-color: ${color.value}; opacity: ${currentOpacity + 0.1};`);
                        pixel.classList.add("modified");
                    }
                }
            });
        }

        else if (picker) {
            pixel.addEventListener("click", (event) => {
                let pickedColor = window.getComputedStyle(event.currentTarget).getPropertyValue("background-color");
                color.value = RGBtoHex(pickedColor);
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
    })
}

function removePixels() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.remove();
    });
}

function removeListeners() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        let cleanPixel = pixel.cloneNode(true);
        pixel.parentNode.replaceChild(cleanPixel, pixel);
    })
}

function addGrid() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.classList.toggle("border");
    });
}

function RGBtoHex(rgb) {
    let hex = "#";
    let tmp = rgb.split("(")[1].split(")")[0];
    tmp = tmp.split(",");

    for (let i = 0; i < 3; i++) {
        let value = parseInt(tmp[i].trim(), 10).toString(16);
        if (value.length == 1) {
            hex += "0" + value;
          } 
        
        else {
            hex += value;
        }
    }
    
    return hex;
}

function changeBG() {
    const pixels = document.querySelectorAll(".pixel:not(.modified)");
    pixels.forEach(pixel => {
        pixel.setAttribute("style", `background-color: ${bgcolor.value};`);
    })
}

function dropdown() {
    document.getElementById("dropdownID").classList.toggle("show");
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
let sizeElements = document.getElementsByClassName("drop-element");
let btns = document.querySelectorAll(".toolbtn");

let pencilbtn = document.getElementById("pencilbtn");
let highlightbtn = document.getElementById("highlighterbtn");
let pickbtn = document.getElementById("pickerbtn");
let fillbtn = document.getElementById("fillbtn");
let eraserbtn = document.getElementById("eraserbtn");
let clearbtn = document.getElementById("clearbtn");
let gridbtn = document.getElementById("gridbtn");
let sizebtn = document.getElementById("sizebtn");

let size = 16;
let opacity = 0.1;

let active = false;
let pencil = false;
let eraser = false;
let grid = false;
let picker = false;
let highlighter = false;

window.onload = createCanvas(size), changeBG();

window.onclick = (event) => {
    if (!event.target.matches(".sizebtn")) {
        let dropdown = document.getElementById("dropdownID");
        if (dropdown.classList.contains("show")) {
            dropdown.classList.remove("show");
        }
        
        if (sizebtn.classList.contains("active")) {
            sizebtn.classList.remove("active");
        }
    }
}

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
            btn.classList.remove("active");
        }

        else {
            btns.forEach(btn => {
                if (!btn.id.includes("gridbtn")) {
                    btn.classList.remove("active")
                  }
                });

                if (!btn.id.includes("clearbtn") && !btn.id.includes("snapbtn")) {
                    btn.classList.add("active");
                }
        }
    })
});

pencilbtn.addEventListener("click", () => {
    pencil = true;
    picker = false;
    eraser = false;
    highlighter = false;
    removeListeners();
    draw();
})

highlightbtn.addEventListener("click", () => {
    pencil = false;
    picker = false;
    eraser = false;
    highlighter = true;
    removeListeners();
    draw();
})

pickbtn.addEventListener("click", () => {
    pencil = false;
    picker = true;
    eraser = false;
    highlighter = false;
    removeListeners();
    draw();
})

eraserbtn.addEventListener("click", () => {
    pencil = false;
    picker = false;
    eraser = true;
    highlighter = false;
    removeListeners();
    draw();
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

for (let sizeElement of sizeElements) {
    sizeElement.addEventListener("click", (event) => {
        size = parseInt(event.target.id);
        removePixels();
        createCanvas(size);
        changeBG();
    });
}