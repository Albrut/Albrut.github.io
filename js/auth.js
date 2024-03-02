var btn = document.querySelector(".btn");
var form = document.getElementById("form");

form.addEventListener("submit", function (event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию

        var input_email = document.getElementById("input_email");
        var input_inn = document.getElementById("input_inn");
        var input_login = document.getElementById("input_login");
        var input_password1 = document.getElementById("input_password1");
        var input_password2 = document.getElementById("input_password2");

        var user_info = {
            "email": input_email.value.toString(),
            "inn": input_inn.value.toString(),
            "login": input_login.value.toString(),
            "password1": input_password1.value.toString(),
            "password2": input_password2.value.toString()
        }

        // Ваш код обработки user_info и localStorage здесь
        localStorage.setItem("user_info", JSON.stringify(user_info));


        if (!user_info.password1 == user_info.password2) {
            alert("пароли не совпадают");
        } else {
            if (user_info.inn.length != 14) {
                alert("инн должен состоять из 14 цифр!")
            } else {
                if (user_info.inn.charAt(0) == 1) {
                    window.location.href = "registration.html"
                } else if (user_info.inn.charAt(0) == 2) {
                    window.location.href = "registration.html"
                } else if (user_info.inn.charAt(0) == 0) {
                    window.location.href = "reg_yur.html"
                } else {
                    alert("неверный инн");
                }
            }
        }
    }
);
