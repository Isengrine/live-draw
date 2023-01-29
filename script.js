let value = document.getElementById("value");
let slider = document.getElementById("slider");
value.textContent = slider.value;

slider.oninput = () => {
    value.textContent = slider.value;
}