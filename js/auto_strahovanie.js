function toggleCheckbox(id) {
    var checkbox = document.getElementById(id);
    checkbox.classList.toggle("checked");
}
var tariff_chooser_button_click = document.getElementById("tariff_chooser_button_click");
var arrow_up = document.getElementById("arrow_up");
var arrow_down= document.getElementById("arrow_down");
var tariffs = document.getElementById("tariffs");
var tariff_opened = false;

tariff_chooser_button_click.addEventListener("click", function (event) {
    event.preventDefault();

    if (tariff_opened == false) {
        tariffs.style.display = "flex";
        arrow_down.style.display = "none";
        arrow_up.style.display = "block";
        tariff_opened = true;
    } else {
        tariffs.style.display = "none";
        arrow_up.style.display = "none";
        arrow_down.style.display = "block";
        tariff_opened = false;
    }
});