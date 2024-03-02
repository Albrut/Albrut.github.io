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

var company_chooser_button_click = document.getElementById("company_chooser_button_click");
var arrow_up_company = document.getElementById("arrow_up_company");
var arrow_down_company = document.getElementById("arrow_down_company");
var companies = document.getElementById("companies");
var companies_opened = false;
arrow_up_company.style.display = "none";

company_chooser_button_click.addEventListener("click", function (event) {
    event.preventDefault();

    if (companies_opened == false) {
        companies.style.display = "flex";
        arrow_down_company.style.display = "none";
        arrow_up_company.style.display = "block";
        companies_opened = true;
    } else {
        companies.style.display = "none";
        arrow_up_company.style.display = "none";
        arrow_down_company.style.display = "block";
        companies_opened = false;
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
                console.log(tariff_id);
            });
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

var company_id = 0;
var companies = document.getElementById("companies");
var url = 'http://35.192.170.245:8000/api/get_companies/';
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
        data.forEach(company => {
            const div = document.createElement("div");
            const link = document.createElement("a");
            link.setAttribute("class", "company_option");
            link.setAttribute("href", "");

            const spanId = document.createElement("span");
            spanId.setAttribute("class", "hidden");
            spanId.textContent = company.id; // изменение здесь

            const span = document.createElement("span");
            span.setAttribute("class", "company_name");
            span.textContent = company.name;

            link.appendChild(spanId);
            link.appendChild(span);

            div.appendChild(link);

            companies.appendChild(div);

            link.addEventListener("click", function (event) {
                event.preventDefault();

                company_id = spanId.innerText;
                // дальнейшая обработка клика по ссылке на компанию
                console.log(company_id);
            });
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


var pay_form = document.querySelector(".pay_form");

pay_form.addEventListener("submit", function (event) {
    event.preventDefault();
    var input_date_begin = document.getElementById("input_date_begin").value;
    var input_date_expire = document.getElementById("input_date_expire").value;
    var upload_file = document.getElementById("upload_file").files[0];

    var formData = new FormData();
    formData.append('date_beginning', input_date_begin);
    formData.append('date_expiration', input_date_expire);
    formData.append('exel_form', upload_file);
    formData.append("tariff", tariff_id);
    formData.append("insurance_company", company_id);
    formData.append("price", 123);
    console.log(formData);


    fetch("http://35.192.170.245:8000/api/dms/create/", {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Обработка успешного ответа сервера
        })
        .catch(error => {
            console.error('There was an error with the request:', error);
        });
});

