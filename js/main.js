document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signUpForm');
    const loginForm = document.getElementById('loginForm');
    const homeForm = document.getElementById('homeForm');

    function getLocalStorageProducts() {
        return JSON.parse(localStorage.getItem("SignUpData"))
    }

    if (signupForm) {
        const regUserNameInput = document.getElementById("RegUserName");
        const regUserEmailInput = document.getElementById("RegUserEmail");
        const regUserPasswordInput = document.getElementById("RegUserPassword");
        const signupBtnInput = document.getElementById("SignUpBtn");
        const popUpBtn = document.getElementById("signUpOK");
        const signUpPopUp = document.getElementById("signUp");
        let SignUpData = [];

        if (getLocalStorageProducts() != null) {
            SignUpData = getLocalStorageProducts();
        }


        signupBtnInput.addEventListener("click", function () {
            if (validateInput(regUserNameInput) && validateInput(regUserEmailInput) && validateInput(regUserPasswordInput)) {
                const data = {
                    username: regUserNameInput.value,
                    email: regUserEmailInput.value,
                    password: regUserPasswordInput.value,
                }
                SignUpData.push(data);
                setLocalStorageProducts();
                clearForm();
                signUpPopUp.classList.replace("d-none", "d-flex");

            }
        }
        )

        popUpBtn.addEventListener("click", function () {
            signUpPopUp.classList.replace("d-flex", "d-none");
            window.location.href = 'index.html';

        })

        function validateInput(Input) {
            let RegexList = {
                // at least 3 chars
                regUsername: /^[a-z].{2}/i,
                regEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                //  Minimum 4 characters, at least one upper case one lower case , one number and one special character 
                regPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,}$/
            }
            if (Input == regUserNameInput) {
                var Regex = RegexList.regUsername;
            }
            if (Input == regUserEmailInput) {
                var Regex = RegexList.regEmail;
                Input.nextElementSibling.nextElementSibling.classList.replace("d-flex", "d-none");
            }
            if (Input == regUserPasswordInput) {
                var Regex = RegexList.regPassword;
            }
            let isValid = Regex.test(Input.value);

            if (isValid) {
                Input.classList.replace("is-invalid", "is-valid");
                Input.nextElementSibling.classList.replace("d-flex", "d-none");
            }
            else {
                Input.classList.add("is-invalid");
                Input.nextElementSibling.classList.replace("d-none", "d-flex");

            }

            if (Input == regUserEmailInput && (getLocalStorageProducts() != null)) {

                let storedData = getLocalStorageProducts();

                for (let i = 0; i < localStorage.length; i++) {
                    if (regUserEmailInput.value == storedData[i].email) {
                        Input.classList.add("is-invalid");
                        Input.nextElementSibling.nextElementSibling.classList.replace("d-none", "d-flex");
                        isValid = false
                    }
                }
            }
            return isValid
        }

        regUserNameInput.addEventListener("change", function () {
            validateInput(regUserNameInput);
        }
        )
        regUserEmailInput.addEventListener("change", function () {
            validateInput(regUserEmailInput);
        }
        )
        regUserPasswordInput.addEventListener("change", function () {
            validateInput(regUserPasswordInput);
        }
        )

        function setLocalStorageProducts() {
            localStorage.setItem("SignUpData", JSON.stringify(SignUpData));
        }




        function clearForm() {
            regUserNameInput.value = '';
            regUserEmailInput.value = '';
            regUserPasswordInput.value = '';
        }

    }

    else if (loginForm) {

        const logUserEmail = document.getElementById("LogUserEmail");
        const logUserPassword = document.getElementById("LogUserPassword");
        const loginBtnInput = document.getElementById("LoginBtn");

        if (getLocalStorageProducts() != null) {

            var storedDataLocal = getLocalStorageProducts();
        }
        else {
            var storedDataLocal = [{
                username:'emptyUsername',
                email:'emptyEmail',
                password:'emptyPassword',
            }];
        }
        loginBtnInput.addEventListener("click", function () {

            // clear all alerts at first 
            logUserEmail.nextElementSibling.classList.replace("d-flex", "d-none");
            logUserPassword.nextElementSibling.classList.replace("d-flex", "d-none");

            if (logUserEmail.value != "" && logUserPassword.value != "") {

                // Flag to Email Correct or not 
                let isstoredEmail = false;

                // if user enter email and password hide alert
                loginBtnInput.nextElementSibling.classList.replace("d-flex", "d-none");

                for (let i = 0; i < storedDataLocal.length; i++) {

                    if (logUserEmail.value == storedDataLocal[i].email) {

                        // if user enter registered email , hide alert 
                        isstoredEmail = true;
                        logUserEmail.nextElementSibling.classList.replace("d-flex", "d-none");

                        // if user enter correct email and password go to home page
                        if (logUserPassword.value == storedDataLocal[i].password) {
                            logUserPassword.nextElementSibling.classList.replace("d-flex", "d-none");
                            localStorage.setItem("homeUserName", JSON.stringify(storedDataLocal[i].username));
                            window.location.href = 'home.html';
                            break;
                        }

                        // if enters correct email but incorrect password show alert
                        else {
                            logUserPassword.nextElementSibling.classList.replace("d-none", "d-flex");
                        }
                    }
                }

                // if user enter unregistered email
                if (isstoredEmail == false) {
                    logUserEmail.nextElementSibling.classList.replace("d-none", "d-flex");

                }
            }
            else {
                // if user don't enter email and password hide alert
                loginBtnInput.nextElementSibling.classList.replace("d-none", "d-flex");
            }
        }


        )

    }

    else if (homeForm) {
        const LogOutBtn = document.getElementById("LogoutBtn");

        var homeName = document.getElementById("NAME");
        let userName = JSON.parse(localStorage.getItem("homeUserName"));
        homeName.innerHTML = `Welcome ${userName}`

        LogOutBtn.addEventListener("click", function () {
            window.location.href = 'index.html';

        })
    }
}
)