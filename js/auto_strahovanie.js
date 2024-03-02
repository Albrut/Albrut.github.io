function toggleCheckbox(id) {
    var checkbox = document.getElementById(id);
    checkbox.classList.toggle("checked");
}
var tariff_chooser_button_click = document.getElementById("tariff_chooser_button_click");
var arrow_up = document.getElementById("arrow_up");
var arrow_down= document.getElementById("arrow_down");
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


const form = document.getElementById('insurance_form');

form.addEventListener('submit', function(event) {
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
        "car_date_release": "2004",
        "date_beginning": start_date,
        "date_expiration": end_date,
        "insurance_company": 1,
        "insurance_territory": insurance_territory,
        "price": 123,
        "type_control": "default",
        "car_model": car_model
    };


    console.log(JSON.stringify(formData));
    // Отправить данные на сервер
    fetch('http://35.192.170.245:8000/api/cars/create/platform/', {
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