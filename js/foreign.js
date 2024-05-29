const url = 'http://95.87.93.126/api/payment/vzr/request/';

var request_form = document.querySelector('.request_form');
request_form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        service: document.getElementById('service').value,
        summ: document.getElementById('summ').value,
        medical_documents: document.getElementById('paper1').files[0],
        departure_documents: document.getElementById('paper2').files[0],
        receipts: document.getElementById('paper3').files[0]
    };

    console.log(formData);

    fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
        },
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

});