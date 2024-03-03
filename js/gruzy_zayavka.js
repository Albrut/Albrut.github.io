const form = document.querySelector('form');

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
    const jsonData = JSON.stringify(data);

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
