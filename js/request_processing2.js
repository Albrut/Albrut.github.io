const request = JSON.parse(localStorage.getItem("request"));
const user = JSON.parse(localStorage.getItem("user"));

console.log(request);
console.log(user);

// Нахождение элементов по их id
const fioElement = document.getElementById('fio');
const innElement = document.getElementById('inn');
const serviceElement = document.getElementById('service');
const summElement = document.getElementById('summ');
const policyNumElement = document.getElementById('policy_num');
 // Нахождение элементов по их id
 const dateStartElement = document.getElementById('date_start');
 const dateEndElement = document.getElementById('date_end');
 const dateRequestElement = document.getElementById('date_request');

 fioElement.innerHTML = fioElement.innerHTML + user.first_name + " " + user.last_name;
 innElement.innerHTML = innElement.innerHTML + " " + user.inn;
 serviceElement.innerHTML = serviceElement.innerHTML + " " + "покупка полиса";
 summElement.innerHTML = summElement.innerHTML + " " + request.summ;
 policyNumElement.innerHTML = policyNumElement.innerHTML + " " + "id 1";
 dateStartElement.innerHTML = dateStartElement.innerHTML + " " + request.dateTime;
 dateEndElement.innerHTML = dateEndElement.innerHTML + " " + request.dateTime;
 dateRequestElement.innerHTML = dateRequestElement.innerHTML + " " + request.dateTime;

 const med_docs = document.getElementById('med_docs');
 const vzr_docs = document.getElementById('vzr_docs');
 const invoice = document.getElementById('invoice');
 med_docs.href = request.medical_docs;
 vzr_docs.href = request.travel_docs;
 invoice.href = request.invoice;