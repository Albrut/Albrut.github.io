const form = document.querySelector('.cargo');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвратить стандартное поведение формы

    // Считываем значения из всех полей
    const up = document.getElementById('up').value;
    const checkbox_sobstven = document.getElementById('checkbox_sobstven').checked;
    const checkbox_drugie_sk = document.getElementById('checkbox_drugie_sk').checked;
    const gabaritLength = document.querySelector('.gabaritLength').value;
    const gabaritWidth = document.querySelector('.gabaritWidth').value;
    const gabaritHeight = document.querySelector('.gabaritHeight').value;
    const volumeWeight = document.getElementById('volumeWeight').value;
    const cargoUnits = document.querySelector('.cargoUnits').value;
    const cargoPlaces = document.querySelector('.cargoPlaces').value;
    const tractorNumber = document.getElementById('tractorNumber').value;
    const trailerNumber = document.getElementById('trailerNumber').value;
    const departurePoint = document.getElementById('departurePoint').value;
    const destinationPoint = document.getElementById('destinationPoint').value;
    const insuranceAmount = document.getElementById('insuranceAmount').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Формируем JSON объект
    const cargoData = {
        "cargo_name": up,
        "isnew_cargo": checkbox_sobstven,
        "is_fragile": checkbox_drugie_sk,
        "length": gabaritLength,
        "width": gabaritWidth,
        "height": gabaritHeight,
        // "cargo_weight": 123,
        "cargo_volume": volumeWeight,
        "cargo_unit_amount": cargoUnits,
        "cargo_quantity_amount": cargoPlaces,
        "tractor_number": tractorNumber,
        "trailerNumber": trailerNumber,
        "departurePoint": departurePoint,
        "destinationPoint": destinationPoint,
        "insurance_price": insuranceAmount,
        "date_beginning": startDate,
        "date_expiration": endDate,
        "insurance_company": 2,
        "price": 123,
        "actual_price": 123
    };
    console.log(JSON.stringify(cargoData));

    // Отправляем данные на сервер
    fetch('http://35.192.170.245:8000/api/cargos/create/platform/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        body: JSON.stringify(cargoData)
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
