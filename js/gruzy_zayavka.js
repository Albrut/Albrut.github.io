const form = document.querySelector('form');
var tariff_chooser_span = document.querySelector(".tariff_chooser span")

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
        "policy_num": tariff_chooser_span.id
    };

    console.log(data);
    // Отправляем данные на сервер
    sendDataToServer(data);
});

function sendDataToServer(data) {
    // Преобразуем объект JSON в строку
    const jsonData = data;

    // Отправляем данные на сервер
    fetch('http://95.87.93.126/api/payment/cargo/request/', {
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

var tariff_links = document.querySelectorAll('.tariffs .tariff_link');
tariff_links.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        tariff_id = link.id;
        tariffs.style.display = "none";
        arrow_up.style.display = "none";
        arrow_down.style.display = "block";
        tariff_opened = false;

        tariff_chooser_span.textContent = link.textContent;
        tariff_chooser_span.id = link.id;
    });
})