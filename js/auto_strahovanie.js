var user = JSON.parse(localStorage.getItem("user"));



function toggleCheckbox(id) {
    var checkbox = document.getElementById(id);
    checkbox.classList.toggle("checked");
}
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
var tariff_names = document.querySelectorAll('.tariffs .tariff_name');
var tariff_chooser_span = document.querySelector(".tariff_chooser span")
tariff_names.forEach(function (tariff_name) {
    tariff_name.addEventListener('click', function (event) {
        tariff_chooser_span.innerHTML = event.target.innerHTML
        tariff_chooser_span.id = event.target.id
    });
});


const url = 'http://95.87.93.126/api/get_companies/';
const token = localStorage.getItem("accessToken"); // замените на ваш реальный Bearer Token

fetch(url, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        data.forEach(function (company) {
            if (user.company === company.name) {
                localStorage.setItem("company", company.id);
            } else {
                localStorage.setItem("company", 1);
            }
        })
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });



const form = document.getElementById('insurance_form');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвратить стандартное поведение формы

    // Считать значения из формы
    const checkbox_sobstven = document.getElementById('checkbox_sobstven').checked;
    const checkbox_drugie_sk = document.getElementById('checkbox_drugie_sk').checked;
    const car_model = document.getElementById('car_model').value;
    const car_mark = document.getElementById("car_mark").value;
    const car_year = document.getElementById('car_year').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    // const tariff = document.querySelector('.tariffs#tariffs .tariff_name.active').textContent;
    const insurance_territory = document.getElementById('insurance_territory').value;


    // // Создать объект FormData и добавить значения из формы
    // const formData = new FormData();
    // formData.append('user_is_owner', checkbox_sobstven);
    // formData.append('insured_elsewhere', checkbox_drugie_sk);
    // formData.append('car_mark', car_mark);
    // // formData.append('car_date_release', car_year);
    // formData.append('car_date_release', "2004");
    // formData.append('date_beginning', start_date);
    // formData.append('date_expiration', end_date);
    // formData.append('insurance_company', 1);
    // formData.append('insurance_territory', insurance_territory);
    // formData.append("price", 123);
    // formData.append("car_model", car_model);
    const formData = {
        "user_is_owner": checkbox_sobstven,
        "insured_elsewhere": checkbox_drugie_sk,
        "car_mark": car_mark,
        "car_date_release": car_year,
        "date_beginning": start_date,
        "date_expiration": end_date,
        "insurance_company": localStorage.getItem("company"),
        "insurance_territory": insurance_territory,
        "price": 123,
        "type_control": tariff_chooser_span.id,
        "car_model": car_model
    };


    console.log(JSON.stringify(formData));
    // Отправить данные на сервер
    fetch('http://95.87.93.126/api/cars/create/platform/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        body: JSON.stringify(formData)
    }).then(response => {
        // Обработать ответ
        console.log('Response:', response);
    }).catch(error => {
        // Обработать ошибку
        console.error('Error:', error);
    });
});