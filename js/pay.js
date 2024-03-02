var tariff_chooser_button_click = document.getElementById("tariff_chooser_button_click");
var arrow_up = document.getElementById("arrow_up");
var arrow_down = document.getElementById("arrow_down");
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


var accessToken = localStorage.getItem("accessToken");


var tariff_id = 0;
var tariffs = document.getElementById("tariffs");
var url = 'http://35.192.170.245:8000/api/tariffs/';
fetch(url, {
    headers: {
        'Authorization': 'Bearer ' + accessToken
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const tariffsContainer = document.getElementById("tariffs");

// Проходимся по массиву данных и создаем для каждого элемента HTML
        data.forEach(item => {
            // Создаем элемент <div> для обертки
            const div = document.createElement("div");

            // Создаем элемент <a> с классом "tariff_option" и href=""
            const link = document.createElement("a");
            link.setAttribute("class", "tariff_option");
            link.setAttribute("href", "");

            // Создаем элемент <span> с классом "hidden" и вписываем в него item.id
            const spanId = document.createElement("span");
            spanId.setAttribute("class", "hidden");
            spanId.textContent = item.id;

            // Создаем элемент <span> с классом "tariff_name" и текстом из данных
            const span = document.createElement("span");
            span.setAttribute("class", "tariff_name");
            span.textContent = item.name;

            // Вставляем элемент <span> в элемент <a>
            link.appendChild(span);

            // Вставляем элемент <a> в элемент <div>
            div.appendChild(link);

            // Вставляем элемент <div> в контейнер для тарифов
            tariffsContainer.appendChild(div);

            link.addEventListener("click", function (event) {
                event.preventDefault();

                tariff_id = spanId.innerText;
                tariffs.style.display = "none";
                arrow_up.style.display = "none";
                arrow_down.style.display = "block";
                tariff_opened = false;
            });
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


var pay_form = document.querySelector(".pay_form");

pay_form.addEventListener("submit", function (event) {
    event.preventDefault();

    var input_date_begin = document.getElementById("input_date_begin");
    var input_date_expire = document.getElementById("input_date_expire");


});

