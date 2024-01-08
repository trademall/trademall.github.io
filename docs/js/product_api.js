const server = "http://47.89.209.202:80";

function getProductInfo(id, callback, errorcallback = console.log) {
    $.ajax({
        url: server + "/product/" + id,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                callback(data.data);
            }
            else {
                errorcallback(data.message);
            }
        },
        error: function (data) {
            errorcallback(data.message);
        }
    });
}

function getProductList(id, callback, errorcallback = console.log) {
    $.ajax({
        url: server + "/productlist/" + id,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                callback(data.data);
            }
            else {
                errorcallback(data.message);
            }
        },
        error: function (data) {
            errorcallback(data.message);
        }
    });
}

function createProduct(data, callback, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/operator/product",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        success: function (data) {
            if (data.code == 200) {
                callback(data);
            }
            else {
                errorcallback(data.message);
            }
        },
        error: function (data) {
            errorcallback(data.message);
        }
    });
}

function updateProduct(data, callback, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/operator/product",
        type: "PATCH",
        dataType: "json",
        data: JSON.stringify(data),
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        success: function (data) {
            if (data.code == 200) {
                callback(data);
            }
            else {
                errorcallback(data.message);
            }
        },
        error: function (data) {
            errorcallback(data.message);
        }
    });
}

function deleteProduct(id, callback, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/operator/product/" + id,
        type: "DELETE",
        dataType: "json",
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        success: function (data) {
            if (data.code == 200) {
                callback(data);
            }
            else {
                errorcallback(data);
            }
        },
        error: function (data) {
            errorcallback(data);
        }
    });
}

function getPrice(id, num, callback, errorcallback = console.log) {
    $.ajax({
        url: server + "/product/price",
        type: "POST",
        dataType: "json",
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            id: Number(id),
            num: Number(num),
            userid: Number(localStorage.getItem("id"))
        }),
        success: function (data) {
            if (data.code == 200) {
                callback(data.data);
            }
            else {
                errorcallback(data.message);
            }
        },
        error: function (data) {
            errorcallback(data.message);
        }
    });
}

function getFobPrice(pid, num, successcallback, errorcallback = console.log) {
    $.ajax({
        url: server + "/product/fobprice",
        type: "POST",
        dataType: "json",
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            id: Number(pid),
            num: Number(num),
            userid: Number(localStorage.getItem("id"))
        }),
        success: function (data) {
            if (data.code == 200) {
                successcallback(data.data);
            }
            else {
                errorcallback(data.message);
            }
        },
        error: function (data) {
            errorcallback(data.message);
        }
    });
}

export { getProductInfo, getProductList, createProduct, updateProduct, deleteProduct, getPrice, getFobPrice };
