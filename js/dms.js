console.log(localStorage.getItem('user'));
var user = localStorage.getItem("user");

// Находим все элементы с классом "tariff_link"
const tariffLinks1 = document.querySelectorAll('.tariff_link');
//

var span = document.querySelector('.tariff_chooser span');
// Для каждой ссылки добавляем обработчик события клика
tariffLinks1.forEach(link => {
  link.addEventListener('click', function () {
    tariffs.style.display = "none";
    arrow_up.style.display = "none";
    arrow_down.style.display = "block";
    tariff_opened = false;


    span.innerHTML = link.textContent;
    span.id = link.id;
  });
});

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



var pay_form = document.querySelector('.pay_form');

pay_form.addEventListener('submit', function (event) {
  event.preventDefault();

  var start_date = document.getElementById('start_date').value;
  var end_date = document.getElementById("end_date").value;

  var tariff = document.querySelector(".span_tariff").id;
  var excel_form = document.querySelector('.download_excel_button').files[0];




  // URL куда отправляется запрос
  const url = 'http://95.87.93.126/api/dms/create/';

  // Данные, которые вы хотите отправить
  var formData = {
    "date_beginning": start_date,
    "date_expiration": end_date,
    "tariff": tariff,
    "insurance_company": localStorage.getItem('company'),
    "exel_form": excel_form
  }
  console.log(formData.exel_form);
  console.log(JSON.stringify(formData));

  // Опции для fetch запроса
  const options = {
    method: 'POST', // Метод запроса
    headers: {
      'Content-Type': 'application/json', // Указываем, что данные отправляются в формате JSON
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: formData // Преобразуем объект данных в JSON строку
  };

  // Выполняем запрос
  fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Парсим ответ как JSON
    })
    .then(data => {
      console.log('Success:', data); // Обрабатываем полученные данные
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error); // Обрабатываем ошибки
    });

});