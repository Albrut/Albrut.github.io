// const url = 'http://95.87.93.126/api/payment/vzr/request/';
// const user = JSON.parse(localStorage.getItem("user"));
// console.log(user);

// var request_form = document.querySelector('.request_form');
// request_form.addEventListener('submit', function (event) {
//     event.preventDefault();

//     const formData = {
//         summ: document.getElementById('summ').value,
//         medical_docs: document.getElementById('paper1').files[0],
//         travel_docs: document.getElementById('paper2').files[0],
//         invoice: document.getElementById('paper3').files[0],
//         user: 1
//     };

//     console.log(formData);

//     fetch(url, {
//         method: 'POST',
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem("accessToken"),
//         },
//         body: formData,
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Success:', data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });

// });


const url = 'http://95.87.93.126/api/payment/vzr/request/';
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);

var request_form = document.querySelector('.request_form');
request_form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('summ', document.getElementById('summ').value);
    formData.append('medical_docs', document.getElementById('paper1').files[0]);
    formData.append('travel_docs', document.getElementById('paper2').files[0]);
    formData.append('invoice', document.getElementById('paper3').files[0]);
    formData.append('user', 1);

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
            window.location.href = "profile.html";
        })
        .catch(error => {
            console.error('Error:', error);
        });

});
