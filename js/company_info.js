// var companies_click = document.getElementById("companies_click");
// var company_details = document.getElementById("company_details");
// var arrow_up = document.getElementById("arrow_up");
// var arrow_down = document.getElementById("arrow_down");
// var details_opened = false;


// companies_click.addEventListener("click", function (event) {
//     event.preventDefault();

//     if (details_opened == false) {
//         company_details.style.display = "flex";
//         details_opened = true;
//         arrow_up.style.display = "inline";
//         arrow_down.style.display = "none";
//     } else {
//         company_details.style.display = "none";
//         details_opened = false;
//         arrow_up.style.display = "none";
//         arrow_down.style.display = "inline";
//     }
// });


// URL куда отправляется запрос
const url = 'http://95.87.93.126/api/get_companies/';

// Опции для fetch запроса (необязательно для GET, но можно использовать для добавления заголовков и других настроек)
const options = {
    method: 'GET', // Метод запроса
    headers: {
        'Accept': 'application/json', // Указываем, что ожидаем получить данные в формате JSON
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
    }
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

        data.forEach(function (company) {
            var container = document.querySelector(".container");
            // Функция для создания элемента
            // Создаем элементы
            const a = document.createElement('a');
            a.href = '';
            a.className = 'companies_click';
            a.id = 'companies_click';

            const companiesDiv = document.createElement('div');
            companiesDiv.className = 'companies';

            const companyNameWrapperDiv = document.createElement('div');
            companyNameWrapperDiv.className = 'company_name_wrapper';

            const companyNameSpan = document.createElement('span');
            companyNameSpan.className = 'company_name';
            companyNameSpan.textContent = company.name;

            const arrowDiv = document.createElement('div');
            arrowDiv.className = 'arrow';

            // Создаем SVG стрелку вверх
            const arrowUpSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            arrowUpSvg.setAttribute('id', 'arrow_up');
            arrowUpSvg.setAttribute('width', '14.828125');
            arrowUpSvg.setAttribute('height', '10.242645');
            arrowUpSvg.setAttribute('viewBox', '0 0 14.8281 10.2426');
            arrowUpSvg.setAttribute('fill', 'none');

            const arrowUpPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            arrowUpPath.setAttribute('id', 'Vector 3');
            arrowUpPath.setAttribute('d', 'M1.41406 8.82843L7.41406 2.82843L13.4141 8.82843');
            arrowUpPath.setAttribute('stroke', '#EACC76');
            arrowUpPath.setAttribute('stroke-opacity', '1.000000');
            arrowUpPath.setAttribute('stroke-width', '4.000000');

            arrowUpSvg.appendChild(arrowUpPath);

            // Создаем SVG стрелку вниз
            const arrowDownSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            arrowDownSvg.setAttribute('id', 'arrow_down');
            arrowDownSvg.setAttribute('width', '14.828125');
            arrowDownSvg.setAttribute('height', '10.242645');
            arrowDownSvg.setAttribute('viewBox', '0 0 14.8281 10.2426');
            arrowDownSvg.setAttribute('fill', 'none');

            const arrowDownPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            arrowDownPath.setAttribute('id', 'Vector 2');
            arrowDownPath.setAttribute('d', 'M13.4141 1.41422L7.41406 7.41422L1.41406 1.41422');
            arrowDownPath.setAttribute('stroke', '#EACC76');
            arrowDownPath.setAttribute('stroke-opacity', '1.000000');
            arrowDownPath.setAttribute('stroke-width', '4.000000');

            arrowDownSvg.appendChild(arrowDownPath);

            // Собираем все элементы вместе
            arrowDiv.appendChild(arrowUpSvg);
            arrowDiv.appendChild(arrowDownSvg);
            companyNameWrapperDiv.appendChild(companyNameSpan);
            companyNameWrapperDiv.appendChild(arrowDiv);
            companiesDiv.appendChild(companyNameWrapperDiv);
            a.appendChild(companiesDiv);

            // Создаем второй блок
            const companyDetailsDiv = document.createElement('div');
            companyDetailsDiv.className = 'company_details';
            companyDetailsDiv.id = 'company_details';

            const companyPropertiesWrapperDiv = document.createElement('div');
            companyPropertiesWrapperDiv.className = 'company_properties_wrapper';

            const companyImageDiv = document.createElement('div');
            companyImageDiv.className = 'company_image';

            const companyImage = document.createElement('img');
            companyImage.src = company.logo;
            companyImage.alt = '';

            companyImageDiv.appendChild(companyImage);

            const companyPropertiesDiv = document.createElement('div');
            companyPropertiesDiv.className = 'company_properties';

            const companyPropertiesText1 = document.createElement('span');
            companyPropertiesText1.className = 'company_properties_text';
            companyPropertiesText1.textContent = "почта: " + company.email;

            const companyPropertiesText2 = document.createElement('span');
            companyPropertiesText2.className = 'company_properties_text';
            companyPropertiesText2.textContent = 'Адрес: ' + company.description;

            const companyPropertiesText3 = document.createElement('span');
            companyPropertiesText3.className = 'company_properties_text';
            companyPropertiesText3.textContent = 'О компании: ' + company.description;

            companyPropertiesDiv.appendChild(companyPropertiesText1);
            companyPropertiesDiv.appendChild(companyPropertiesText2);
            companyPropertiesDiv.appendChild(companyPropertiesText3);

            companyPropertiesWrapperDiv.appendChild(companyImageDiv);
            companyPropertiesWrapperDiv.appendChild(companyPropertiesDiv);

            companyDetailsDiv.appendChild(companyPropertiesWrapperDiv);

            // Добавляем элементы на страницу
            container.appendChild(a);
            container.appendChild(companyDetailsDiv);
            var detailsOpened = false

            // Добавляем обработчик события для клика
            a.addEventListener('click', function(event) {
                event.preventDefault(); // предотвращаем переход по ссылке

                if (!detailsOpened) {
                    companyDetailsDiv.style.display = 'flex';
                    detailsOpened = true;
                    arrowUpSvg.style.display = 'inline';
                    arrowDownSvg.style.display = 'none';
                } else {
                    companyDetailsDiv.style.display = 'none';
                    detailsOpened = false;
                    arrowUpSvg.style.display = 'none';
                    arrowDownSvg.style.display = 'inline';
                }
            });
        })
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error); // Обрабатываем ошибки
    });
