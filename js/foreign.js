const url = 'http://35.192.170.245:8000/api/vzr/create/platform/';

const formData = {
    sum_of_payments: document.getElementById('up').value,
    medical_documents: document.getElementById('paper1').value,
    departure_documents: document.getElementById('paper2').value,
    receipts: document.getElementById('paper3').value
};

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
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
