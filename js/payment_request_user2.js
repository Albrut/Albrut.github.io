document.getElementById('payment_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form values
    const paymentSumm = document.querySelector('.input_price:nth-of-type(2)').value;
    const medDocuments = document.getElementById('med_documents').files[0];
    const departureDocuments = document.getElementById('departure_documents').files[0];
    const receipts = document.getElementById('invoice').files[0];

    const formData = {
        "summ": paymentSumm,
        "medical_docs": medDocuments,
        "travel_docs": departureDocuments,
        "invoice": receipts
    };

    // Convert the JavaScript object to JSON
    const jsonData = JSON.stringify(formData);

    // Send data to the server using fetch
    fetch('http://35.192.170.245:8000/api/payment/vzr/request/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        body: jsonData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Optionally, do something with the response data
        })
        .catch(error => {
            console.error('Error:', error);
            // Optionally, handle errors here
        });
});

