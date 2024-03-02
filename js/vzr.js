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


var trip_goal = '';
var insurance_territory = '';
// Создаем словарь
const TRAVEL_GOAL_CHOICES = [
    ['business_trip', 'Деловая поездка'],
    ['tourism', 'Туризм'],
    ['guest', 'Гостевая'],
    ['private', 'Частная'],
    ['sports', 'Спорт'],
    ['family_reunion', 'Воссоединение семьи'],
    ['treatment', 'Лечение'],
    ['education', 'Учеба'],
    ['internship', 'Стажировка']
];

// Находим все элементы с классом "tariff_link"
const tariffLinks1 = document.querySelectorAll('.tariff_link');
//
// Для каждой ссылки добавляем обработчик события клика
tariffLinks1.forEach(link => {
    link.addEventListener('click', function() {
        tariffs.style.display = "none";
        arrow_up.style.display = "none";
        arrow_down.style.display = "block";
        tariff_opened = false;
    });
});

// Находим все элементы с классом "tariff_link"
const tariffLinks = document.querySelectorAll('.tariff_link');

// Для каждой ссылки добавляем обработчик события клика
tariffLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Получаем значение атрибута data-key
        const key = this.getAttribute('data-key');

        if (['schengen', 'turkey', 'usa'].includes(key)) {
            // Если находится, присваиваем его к переменной choice1
            trip_goal = key;
        } else {
            // Если не находится, присваиваем его к переменной choice2
            insurance_territory = key;
        }
        // Выводим ключ в консоль
        tariffs_2.style.display = "none";
        arrow_up_2.style.display = "none";
        arrow_down_2.style.display = "block";
        tariff_opened_2 = false;
    });
});


const form = document.querySelector('.pay_form');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // предотвратить отправку формы
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;

    console.log(start_date);
    // создать JSON объект
    const formData = {
        "date_beginning": start_date,
        "date_expiration": end_date,
        "travelGoal": trip_goal,
        "place": insurance_territory,
        "price": 123,
        "insurance_company": 1
    };

    // отправить POST запрос
    fetch('http://35.192.170.245:8000/api/vzr/create/platform/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        body: JSON.stringify(formData)
    }).then(response => {
        // обработать ответ
        console.log('Response:', response);
    }).catch(error => {
        // обработать ошибку
        console.error('Error:', error);
    });
});