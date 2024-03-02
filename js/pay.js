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

var tariff_chooser_button_click_2 = document.getElementById("tariff_chooser_button_click_2");
var arrow_up_2 = document.getElementById("arrow_up_2");
var arrow_down_2 = document.getElementById("arrow_down_2");
var tariffs_2 = document.getElementById("tariffs_2");
var tariff_opened_2 = false;

tariff_chooser_button_click_2.addEventListener("click", function (event) {
    event.preventDefault();

    if (tariff_opened_2 == false) {
        tariffs_2.style.display = "flex";
        arrow_down_2.style.display = "none";
        arrow_up_2.style.display = "block";
        tariff_opened_2 = true;
    } else {
        tariffs_2.style.display = "none";
        arrow_up_2.style.display = "none";
        arrow_down_2.style.display = "block";
        tariff_opened_2 = false;
    }
});


