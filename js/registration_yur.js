var form = document.getElementById("form");

form.addEventListener("submit", function (event) {
   event.preventDefault();

    const organisationNameInput = document.getElementById('organisation_name');
    const codeOkpoInput = document.getElementById('code_okpo');
    const registrationNumberInput = document.getElementById('registration_number');
    const supervisorNameInput = document.getElementById('supervisor_name');
    const supervisorJobInput = document.getElementById('supervisor_job');
    const confidantNameInput = document.getElementById('confidant_name');
    const yurAddressInput = document.getElementById('yur_address');
    const factAddressInput = document.getElementById('fact_address');

    const organisationName_value = organisationNameInput.value;
    const codeOkpo_value = codeOkpoInput.value;
    const registrationNumber_value = registrationNumberInput.value;
    const supervisorName_value = supervisorNameInput.value;
    const supervisorJob_value = supervisorJobInput.value;
    const confidantName_value = confidantNameInput.value;
    const yurAddress_value = yurAddressInput.value;
    const factAddress_value = factAddressInput.value;

    // Создание объекта с ключами и значениями
    const formData = {
        "fullname": organisationNameInput.value,
        "okpo": codeOkpoInput.value,
        "registration_number": registrationNumberInput.value,
        "ceo": supervisorNameInput.value,
        "position_of_ceo": supervisorJobInput.value,
        "envoy": confidantNameInput.value,
        "legal_address": yurAddressInput.value,
        "actual_address": factAddressInput.value,
        "email": JSON.parse(localStorage.getItem("user_info")).email,
        "inn": JSON.parse(localStorage.getItem("user_info")).inn,
        "username": JSON.parse(localStorage.getItem("user_info")).login,
        "password": JSON.parse(localStorage.getItem("user_info")).password1,
    };
    console.log(JSON.stringify(formData));

    fetch('http://95.87.93.126/api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log(data);
            window.location.href = "profile.html";
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});