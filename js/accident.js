const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Получаем значения из полей формы
    const startDate = document.querySelector('#dates input[type="date"]').value;
    const endDate = document.querySelector('#konec_data input[type="date"]').value;
    const insuranceTerritory = document.querySelector('input[type="text"]').value;
    const checkboxSobstven = document.getElementById('checkbox_sobstven').checked;

    // Формируем JSON объект
    const formData = {
        "date_beginning": startDate,
        "date_expiration": endDate,
        "insurance_territory": insuranceTerritory,
        "insured_elsewhere": checkboxSobstven,
        "price": 123,
        "insurance_company": 1
    };

    // Отправляем данные на сервер
    fetch('http://35.192.170.245:8000/api/accidient/create/platform/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            // Обработка ответа сервера
            console.log('Response:', response);
        })
        .catch(error => {
            // Обработка ошибки
            console.error('Error:', error);
        });
});
