var companies_click = document.getElementById("companies_click");
var company_details = document.getElementById("company_details");
var arrow_up = document.getElementById("arrow_up");
var arrow_down = document.getElementById("arrow_down");
var details_opened= false;


companies_click.addEventListener("click", function (event) {
    event.preventDefault();

    if (details_opened == false) {
        company_details.style.display = "flex";
        details_opened = true;
        arrow_up.style.display = "inline";
        arrow_down.style.display = "none";
    } else {
        company_details.style.display = "none";
        details_opened = false;
        arrow_up.style.display = "none";
        arrow_down.style.display = "inline";
    }
});