const user = JSON.parse(localStorage.getItem("user"));
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
        "insurance_company": localStorage.getItem("company")
    };
    console.log(JSON.stringify(formData));

    // Отправляем данные на сервер
    fetch('http://95.87.93.126/api/accidient/create/platform/', {
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
