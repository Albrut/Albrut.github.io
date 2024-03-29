var responseUnprocessedContent = [];
var responseProcessedContent = [];

const accessToken = localStorage.getItem("accessToken");

fetch("http://212.112.103.137:6457/api/profile/", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(localStorage.getItem("accessToken"));
        console.log(data.user);
        var name = document.getElementById("name");
        var inn = document.getElementById("inn");
        name.innerHTML = data.user.first_name + " " + data.user.last_name;
        inn.innerHTML = data.user.inn;
    })
    .catch(error => {
        console.error("Error:", error);
    });

fetch("http://212.112.103.137:6457/api/my_payments/", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
})
    .then(response => response.json())
    .then(data => {
        var payments = data;
        var responsesContainer = document.querySelector(".responses");

        console.log(payments);
        // Проходимся по каждому элементу в массиве данных
        payments.forEach(function (request) {
            if (request.processed == true) {
                // Создаем новый элемент response_processed
                var responseProcessed = document.createElement("div");
                responseProcessed.classList.add("response_processed");
                responseProcessed.id = "response_processed_content";

                // Создаем и заполняем спаны для каждого свойства заявки
                var idSpan = document.createElement("span");
                idSpan.classList.add("id");
                idSpan.textContent = request.id;

                var serviceSpan = document.createElement("span");
                serviceSpan.classList.add("service");
                serviceSpan.textContent = request.service;

                var askedSumSpan = document.createElement("span");
                askedSumSpan.classList.add("asked_sum");
                askedSumSpan.textContent = request.paymentSumm;

                var approvedSumSpan = document.createElement("span");
                approvedSumSpan.classList.add("approved_sum");
                approvedSumSpan.textContent = request.finalSumm;

                // Добавляем спаны в элемент response_processed
                responseProcessed.appendChild(idSpan);
                responseProcessed.appendChild(serviceSpan);
                responseProcessed.appendChild(askedSumSpan);
                responseProcessed.appendChild(approvedSumSpan);

                // Добавляем элемент response_processed в контейнер responsesContainer
                responsesContainer.appendChild(responseProcessed);

                responseProcessedContent = document.querySelectorAll("#response_processed_content");
            } else if (request.processed == false) {
                // Создаем новый элемент response_unprocessed
                var responseUnprocessed = document.createElement("div");
                responseUnprocessed.classList.add("response_unprocessed");
                responseUnprocessed.id = "response_unprocessed_content";

                // Создаем и заполняем спаны для каждого свойства заявки
                var idSpan = document.createElement("span");
                idSpan.classList.add("id");
                idSpan.textContent = request.id;

                var serviceSpan = document.createElement("span");
                serviceSpan.classList.add("service");
                serviceSpan.textContent = request.service;

                var askedSumSpan = document.createElement("span");
                askedSumSpan.classList.add("asked_sum_unprocessed");
                askedSumSpan.textContent = request.paymentSumm;

                // Добавляем спаны в элемент response_unprocessed
                responseUnprocessed.appendChild(idSpan);
                responseUnprocessed.appendChild(serviceSpan);
                responseUnprocessed.appendChild(askedSumSpan);

                // Добавляем элемент response_unprocessed в контейнер responsesContainer
                responsesContainer.appendChild(responseUnprocessed);
                responseUnprocessedContent = document.querySelectorAll("#response_unprocessed_content");
                responseUnprocessedContent.forEach(function (element) {
                    element.style.display = "none";
                });
            }
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });


var responseProcessed = document.getElementById("response_processed");
var responseUnprocessed = document.getElementById("response_unprocessed");


var processedRequests = document.getElementById("processed_requests");
var unprocessedRequests = document.getElementById("unprocessed_requests");

var urlProcessedRequests = document.getElementById("url_processed_requests");
var urlUnprocessedRequests = document.getElementById("url_unprocessed_requests");

responseUnprocessed.style.display = "none";

urlProcessedRequests.addEventListener("click", function (event) {
    event.preventDefault();

    responseUnprocessed.style.display = "none";
    responseProcessed.style.display = "flex";

    responseUnprocessedContent.forEach(function (element) {
        element.style.display = "none";
    });
    responseProcessedContent.forEach(function (element) {
        element.style.display = "flex";
    });

    processedRequests.style.background = "#0B3C32";
    urlProcessedRequests.style.color = "#EACC76";
    unprocessedRequests.style.background = "#0000";
    urlUnprocessedRequests.style.color = "#0B3C32";
});

urlUnprocessedRequests.addEventListener("click", function (event) {
    event.preventDefault();

    responseProcessed.style.display = "none";

    responseProcessedContent.forEach(function (element) {
        element.style.display = "none";
    });
    responseUnprocessedContent.forEach(function (element) {
        element.style.display = "flex";
    })

    responseUnprocessed.style.display = "flex";

    unprocessedRequests.style.background = "#0B3C32";
    urlUnprocessedRequests.style.color = "#EACC76";
    processedRequests.style.background = "#0000";
    urlProcessedRequests.style.color = "#0B3C32";
});

var buttonDropdownOpenLink = document.getElementById("button_dropdown_open_link");
var buttonDropdownCloseLink = document.getElementById("dropdown_button_close_link");
var dropdownContent = document.getElementById("dropdown_content");
dropdownContent.style.display = "none";

buttonDropdownOpenLink.addEventListener("click", function (event) {
    event.preventDefault();
    buttonDropdownOpenLink.style.display = "none";

    dropdownContent.style.display = "flex";
});

buttonDropdownCloseLink.addEventListener("click", function (event) {
    event.preventDefault();

    dropdownContent.style.display = "none";
    buttonDropdownOpenLink.style.display = "block";
});


