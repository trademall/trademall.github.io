const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
loginBtn.addEventListener('click', login);
logoutBtn.addEventListener('click', logout);

function login(event) {
    event.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();
    // var remember = $('#remember').is(':checked');

    if (username == '') {
        alert('Please input username');
        return;
    }
    if (password == '') {
        alert('Please input password');
        return;
    }

    var data = {
        "username": username,
        "password": password
    };

    $.ajax({
        url: "http://54.79.139.73:80/user/login",
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            if (res.code == 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", username);
                localStorage.setItem("login-status", true);
                console.log(res.data);

                showProfile();

                window.location.replace("/");
            }
            else {
                alert(res.message);
            }
        },
        error: function (res) {
            alert(res.message);
        }
    });
}

function showProfile() {
    const username = localStorage.getItem("username");
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const inputBoxes = document.getElementById('login-input-boxes');
    const profile = document.getElementById('profile');

    inputBoxes.classList.add('hidden');
    profile.innerHTML = `
        <h2>Welcome, ${username}!</h2>
        `;
    profile.classList.remove('hidden');
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
}

function logout() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const inputBoxes = document.getElementById('login-input-boxes');
    const profile = document.getElementById('profile');

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
        showProfile();
    }
}

checkLogin();
