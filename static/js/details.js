import { getProduct } from "./getProduct.js";
import { RenderDetails } from "./renderDetails.js";

const uid = localStorage.getItem("id");
const url = window.location.href;
const pid = url.split('?id=')[1].split('&')[0];
const edit = url.split('?')[1].split('=')[2];
// console.log(edit);

var product;
getProduct("info", pid, renderProduct);

function renderProduct(data) {
    product = data;
    RenderDetails(data);
    $('#submitBtn').click(submit);
}

function submit(event) {
    event.preventDefault();

    $('.alert').addClass('hidden');

    if (!(localStorage.getItem("login-status") == "true")) {
        showWarning(5000);
        return;
    } else {
        disableBtn();
        $.ajax({
            url: "http://54.79.139.73:80/v1/catalog/" + uid,
            type: "GET",
            headers: {
                "token": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            success: function (res) {
                if (res.code == 200) {
                    if (!edit) {
                        addToCart();
                        return;
                    }
                    else {
                        updateCart();
                    }
                }
                else {
                    addToCart();
                    console.log("No cart found, creating new cart");
                }
            },
            error: function (res) {
                console.log(res);
                resetBtn();
            }
        });
    }
}

function getSKU() {
    var attributes = {};

    attributes["name"] = product.name;
    attributes["pid"] = product.id;
    attributes["attributes"] = {};
    const selectors = document.querySelectorAll('.selector');
    for (let i = 0; i < selectors.length; i++) {
        const selector = selectors[i];
        const name = selector.firstChild.textContent.replace(':', '');
        const value = selector.querySelector('label.active input').id;
        attributes["attributes"][name] = [value];
    }

    const sku = {
        "productid": Number(pid),
        "attributes": attributes,
        "userid": Number(localStorage.getItem("id")),
        "status": 0
    };
    return sku;
}

function addToCart() {
    const item = getSKU();
    const data = JSON.stringify(item);
    console.log(data);
    $.ajax({
        url: "http://54.79.139.73:80/v1/catalog",
        type: "POST",
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        data: data,
        success: function (res) {
            if (res.code == 200) {
                showSuccess(2500);
            }
            else {
                console.log(res);
                showError(2500, res.message);
            }
            resetBtn();
        },
        error: function (res) {
            console.log(res);
            showError(2500, res.message);
            resetBtn();
        }
    });
}

function updateCart() {
    const item = getSKU();
    const data = JSON.stringify(item);
    // console.log(data);
    $.ajax({
        url: "http://54.79.139.73:80/v1/catalog",
        type: "PUT",
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        data: data,
        success: function (res) {
            if (res.code == 200) {
                showSuccess(2500);
            }
            else {
                showError(2500, res.message);
            }
            resetBtn();
        },
        error: function (res) {
            console.log(res);
            showError(2500, res.message);
            resetBtn();
        }
    });
}

function disableBtn() {
    $('#submitBtn').prop('disabled', true);
    $('#submitBtn').text('Adding to cart...');
}

function resetBtn() {
    $('#submitBtn').prop('disabled', false);
    $('#submitBtn').text('Add to cart');
}

function showSuccess(time) {
    $('.alert-success').removeClass('hidden');
    $('.alert-success').show();
    $('.alert-success').fadeOut(time);
    setTimeout(function () {
        $('.alert-success').addClass('hidden');
    }, time + 500);
}

function showWarning(time) {
    $('.alert-warning').removeClass('hidden');
    $('.alert-warning').show();
    $('.alert-warning').fadeOut(time);
    setTimeout(function () {
        $('.alert-warning').addClass('hidden');
    }, time + 500);
}

function showError(time, message) {
    $('.alert-danger').removeClass('hidden');
    $('.alert-danger').show();
    $('.alert-danger').text(message);
    $('.alert-danger').fadeOut(time);
    setTimeout(function () {
        $('.alert-danger').addClass('hidden');
    }, time + 500);
}
