import { getProduct } from "./getProduct.js";
import { RenderDetails } from "./renderDetails.js";

const url = window.location.href;
const pid = url.split('?')[1].split('=')[1];
// console.log(id);
var name = "";

getProduct("info", pid, renderProduct);

function renderProduct(data) {
    RenderDetails(data);
    name = data.name;
    $('#submitBtn').click(submit);
}

function submit(event) {
    event.preventDefault();
    if (!(localStorage.getItem("login-status") == "true")) {
        $('.alert-warning').removeClass('hidden');
        return;
    } else {
        addToCart();
    }
}

function getSKU() {
    var attributes = {
        "name": [],
    };
    const selectors = document.querySelectorAll('.selector');
    for (let i = 0; i < selectors.length; i++) {
        const selector = selectors[i];
        const name = selector.firstChild.textContent.replace(':', '');
        const value = selector.querySelector('input[type="radio"]:checked').id;
        attributes[name] = [value];
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
    // console.log(data);
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
                $('.alert-success').removeClass('hidden');
                $('.alert-success').fadeOut(2500);
                setTimeout(function () {
                    $('.alert-success').addClass('hidden');
                }, 3000);
            }
            else {
                $('.alert-danger').removeClass('hidden');
                $('.alert-danger').text(res.message);
            }
        },
        error: function (res) {
            console.log(res);
        }
    });
}
