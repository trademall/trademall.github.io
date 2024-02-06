// get user list from server, render it into the main content area
import { renderUserList } from './renderUserList.js';
import { getUserList } from './getUserList.js';

const pageSize = 100;
let page = 1;

getUserList(page, pageSize, receiveUsers, receiveError);

function receiveUsers(users) {
    renderUserList(users);
}
    
function receiveError(error) {
    console.log(error);
}

function handlePreviousPage() {
    if (page > 1) {
        page--;
        getUserList(page, pageSize, receiveUsers, receiveError);
    }
}

function handleNextPage() {
    page++;
    getUserList(page, pageSize, receiveUsers, receiveError);
}

function deleteUser(id) {
    $.ajax({
        url: 'http://47.89.209.202:8080/v1/root/user/' + id,
        type: 'DELETE',
        headers: {
            "token": localStorage.getItem('token')
        },
        success: function (result) {
            if (result.code === 200) {
                showSuccessMessage(result.message);
                getUserList(page, pageSize, receiveUsers, receiveError);
            }
            else {
                showErrorMessage(result.message);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function updateUser(data) {
    $.ajax({
        url: 'http://47.89.209.202:8080/v1/root/user',
        type: 'PATCH',
        data: JSON.stringify(data),
        contentType: 'application/json',
        headers: {
            "token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        },
        success: function (result) {
            if (result.code === 200) {
                showSuccessMessage(result.message);
                getUserList(page, pageSize, receiveUsers, receiveError);
            }
            else {
                showErrorMessage(result.message);
            }
            setTimeout(function () {
                $('#userEditModal').modal('hide');
            }, 1000);
        },
        error: function (error) {
            console.log(error);
            showErrorMessage(error.responseJSON.message);
        }
    });
}

function activeUser(id) {
    $.ajax({
        url: 'http://47.89.209.202:8080/v1/admin/user/' + id,
        type: 'GET',
        headers: {
            "token": localStorage.getItem('token')
        },
        success: function (result) {
            if (result.code === 200) {
                showErrorMessage(result.message);
                getUserList(page, pageSize, receiveUsers, receiveError);
            }
            else {
                showErrorMessage(result.message);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function showSuccessMessage(message) {
    $('#success-message').text(message);
    $('#success-message').show();
    setTimeout(function () {
        $('#success-message').hide();
    }, 2000);
}

function showErrorMessage(message) {
    $('#error-message').text(message);
    $('#error-message').show();
    setTimeout(function () {
        $('#error-message').hide();
    }, 2000);
}

export { handlePreviousPage, handleNextPage, deleteUser, updateUser, activeUser, showSuccessMessage, showErrorMessage };