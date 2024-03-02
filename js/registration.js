document.addEventListener("DOMContentLoaded", function (event) {

    var button_registration = document.getElementById("button_registration");
    var registration_form = document.querySelector(".registration_form");

    registration_form.addEventListener("submit", function (event) {
        event.preventDefault();

        const personNameInput = document.getElementById("form_field_person_name");
        const personSurnameInput = document.getElementById("form_field_person_surname");
        const birthPlaceInput = document.getElementById("birth_place");
        const birthDateInput = document.getElementById("birth_date");
        const passNumberInput = document.getElementById("pass_number");
        const passDateInput = document.getElementById("pass_date");
        const passExpirationDateInput = document.getElementById("pass_expiration_date");
        const registrationAddressInput = document.getElementById("registration_address");
        const addressInput = document.getElementById("address");

        const formData = {
            "first_name": personNameInput.value,
            "last_name": personSurnameInput.value,
            "place_of_birth": birthPlaceInput.value,
            "date_of_birth": birthDateInput.value,
            "passport_number": passNumberInput.value,
            "date_of_issue": passDateInput.value,
            "date_of_expiration": passExpirationDateInput.value,
            "residential_addres": registrationAddressInput.value,
            "place_of_residence": addressInput.value,
            "email": JSON.parse(localStorage.getItem("user_info")).email,
            "inn": JSON.parse(localStorage.getItem("user_info")).inn,
            "username": JSON.parse(localStorage.getItem("user_info")).login,
            "password": JSON.parse(localStorage.getItem("user_info")).password1,
        }
        fetch('http://35.192.170.245:8000/api/register/', {
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
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

    });
});