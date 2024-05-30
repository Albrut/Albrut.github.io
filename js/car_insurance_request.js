const form = document.querySelector('form');
const user = JSON.parse(localStorage.getItem("user"));

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем данные из формы
    const place = document.getElementById('up').value;
    const photo = document.getElementById('paper').value; // Ваш файл для загрузки
    const file = document.querySelector('.input_file').files[0]; // Получаем файл из input

    // Создаем объект JSON
    const data = {
        "accidentPlace": place,
        "image": file, // Если нужно, вы можете добавить путь к файлу, но это может быть небезопасно
        "policy_num": 1
    };

    // Отправляем данные на сервер
    sendDataToServer(data);
});

function sendDataToServer(data) {
    // Преобразуем объект JSON в строку
    const jsonData = data;

    // Отправляем данные на сервер
    fetch('http://35.192.170.245:8000/api/payment/cargo/request/', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart-form/data',
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        body: jsonData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log(data); // Здесь вы можете обработать ответ от сервера
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}


var tariff_chooser_button_click = document.getElementById("tariff_chooser_button_click");
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
        tariffs.style.display = "none";
        arrow_up.style.display = "none";
        arrow_down.style.display = "block";
        tariff_opened = false;
    });
});
