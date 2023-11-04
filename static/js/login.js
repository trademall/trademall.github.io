const loginForm = document.getElementById('form-login');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
loginForm.addEventListener('submit', login);
logoutBtn.addEventListener('click', logout);

function login(event) {
    event.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();
    // var remember = $('#remember').is(':checked');

    var data = {
        "username": username,
        "password": password
    };

    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    $.ajax({
        url: "http://54.79.139.73:80/user/login",
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            if (res.code == 200) {
                localStorage.setItem("id", res.data.id);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", username);
                localStorage.setItem("login-status", true);

                resetLoginBtn();
                showProfile(true);
                setTimeout(function () {
                    window.history.back();
                }, 1000);
            }
            else if (res.message == "user does not exist") {
                const toSignUp = confirm("User does not exist. Do you want to sign up?");
                resetLoginBtn();
                if (toSignUp) {
                    window.location.replace("/signup");
                }
            }
            else if (res.message.startsWith("crypto")) {
                alert("Wrong password, please check again");
                resetLoginBtn();
            }
            else {
                alert(res.message);
                resetLoginBtn();
            }
        },
        error: function (res) {
            alert(res.message);
            resetLoginBtn();
        }
    });
}

function showProfile(showPrompt = false) {
    const username = localStorage.getItem("username");
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const inputBoxes = document.getElementById('login-input-boxes');
    const profile = document.getElementById('profile');

    const redirectPrompt = `<p>Back to last page...</p>`;

    inputBoxes.classList.add('hidden');
    profile.innerHTML = `
        <h2>Welcome, ${username}!</h2>
        `+ (showPrompt ? redirectPrompt : ``);
    profile.classList.remove('hidden');
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
}

function logout() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const inputBoxes = document.getElementById('login-input-boxes');
    const profile = document.getElementById('profile');

    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.setItem("login-status", false);

    inputBoxes.classList.remove('hidden');
    loginBtn.classList.remove('hidden');

    profile.classList.add('hidden');
    logoutBtn.classList.add('hidden');
}

function checkLogin() {
    const loginStatus = localStorage.getItem("login-status");
    if (loginStatus == "true") {
        return true;
    }
    else {
        return false;
    }
}

function resetLoginBtn() {
    loginBtn.disabled = false;
    loginBtn.textContent = "Log in";
}

if (checkLogin()) {
    showProfile();
}

export { checkLogin };
